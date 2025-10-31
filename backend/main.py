from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pickle
import sys
from pathlib import Path
import pandas as pd
import numpy as np

# Add the uploaded files directory to path so we can import the model
sys.path.append(str(Path(__file__).parent / "my uploded files" / "final_comparator"))

from build_model import CollegeComparator

app = FastAPI(
    title="Margadarshak College Comparator API",
    description="API for comparing Maharashtra colleges",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the college comparator model
MODEL_PATH = Path(__file__).parent / "my uploded files" / "final_comparator" / "college_comparator.pkl"
comparator_model: CollegeComparator = None

def load_model():
    global comparator_model
    try:
        print(f"[INFO] Loading model from: {MODEL_PATH}")
        if not MODEL_PATH.exists():
            print(f"[ERROR] Model file does not exist at: {MODEL_PATH}")
            print("  Please ensure the file is present or run 'python build_model.py'")
            return
        
        with open(MODEL_PATH, "rb") as f:
            comparator_model = pickle.load(f)
        print(f"✓ Model loaded successfully!")
        print(f"  Total colleges in database: {len(comparator_model.df)}")
    except FileNotFoundError:
        print(f"⚠ Model file not found at {MODEL_PATH}")
        print("  Please run 'python build_model.py' in the final_comparator directory")
    except Exception as e:
        print(f"[ERROR] Failed to load model: {str(e)}")
        import traceback
        traceback.print_exc()

@app.on_event("startup")
async def startup_event():
    load_model()

# Request/Response Models
class PersonalizationFactors(BaseModel):
    category: str
    gender: str
    domicile: str
    maxBudget: Optional[float] = None
    hostelRequired: bool = False
    preferredCollegeType: List[str] = []
    locationPreference: List[str] = []
    preferSmallCampus: bool = False
    prioritizeGovernmentCollege: bool = False

class CompareRequest(BaseModel):
    colleges: List[str]
    personalization: Optional[PersonalizationFactors] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "colleges": ["MIT College", "VJTI"],
                "personalization": {
                    "category": "General",
                    "gender": "Male",
                    "domicile": "Maharashtra",
                    "maxBudget": 500000,
                    "hostelRequired": True
                }
            }
        }

class SearchRequest(BaseModel):
    query: str

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "Margadarshak College Comparator API",
        "version": "1.0.0",
        "status": "online",
        "model_loaded": comparator_model is not None
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": comparator_model is not None
    }

@app.post("/api/reload-model")
async def reload_model():
    """Reload the college comparator model"""
    try:
        load_model()
        return {
            "success": True,
            "message": "Model reloaded successfully",
            "model_loaded": comparator_model is not None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to reload model: {str(e)}")

@app.post("/api/colleges/compare")
async def compare_colleges(request: CompareRequest):
    """Compare two or more colleges"""
    print(f"[DEBUG] Received comparison request: {request.colleges}")
    
    if comparator_model is None:
        print("[ERROR] Model not loaded!")
        raise HTTPException(status_code=503, detail="Model not loaded. Please restart the backend.")
    
    if len(request.colleges) < 2:
        raise HTTPException(status_code=400, detail="At least 2 colleges required for comparison")
    
    # For now, compare the first two colleges
    college1 = request.colleges[0]
    college2 = request.colleges[1]
    
    print(f"[DEBUG] Comparing: '{college1}' vs '{college2}'")
    
    try:
        result = comparator_model.compare(college1, college2)
        print(f"[DEBUG] Comparison result: {result.get('error', 'Success')}")
        
        if "error" in result:
            print(f"[ERROR] {result['error']}")
            raise HTTPException(status_code=404, detail=result["error"])
        
        print(f"[DEBUG] Formatting college1...")
        college1_formatted = format_college_result(result["college1"], 1, request.personalization)
        print(f"[DEBUG] Formatting college2...")
        college2_formatted = format_college_result(result["college2"], 2, request.personalization)
        
        print(f"[DEBUG] Generating recommendation...")
        recommendation = generate_recommendation(result["college1"], result["college2"], request.personalization)
        
        # Format the response
        response_data = {
            "success": True,
            "comparison": [
                college1_formatted,
                college2_formatted
            ],
            "recommendation": recommendation,
            "personalization_applied": request.personalization is not None,
            "user_category": request.personalization.category if request.personalization else None,
            "metadata": {
                "total_colleges": 2,
                "features_compared": ["fees", "students", "faculty", "location", "facilities"],
                "personalized": request.personalization is not None
            }
        }
        print(f"[DEBUG] Sending response successfully")
        return response_data
    except HTTPException:
        raise
    except Exception as e:
        print(f"[ERROR] Exception during comparison: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

@app.get("/api/colleges/autocomplete")
async def autocomplete_colleges(query: str = "", limit: int = 10):
    """Get college suggestions for autocomplete"""
    if comparator_model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    if not query or len(query) < 2:
        return {"success": True, "suggestions": []}
    
    try:
        query_lower = query.lower().strip()
        
        # Search in college names
        mask = comparator_model.df["name_clean"].str.contains(query_lower, regex=False, na=False)
        results = comparator_model.df[mask].head(limit)
        
        suggestions = []
        for _, college in results.iterrows():
            suggestions.append({
                "name": str(college["College Name"]),
                "city": str(college["City"]),
                "type": str(college.get("College Type", "N/A")),
                "fees": float(college.get("Average Fees", 0)) if pd.notna(college.get("Average Fees")) else None
            })
        
        return {
            "success": True,
            "suggestions": suggestions,
            "count": len(suggestions)
        }
    except Exception as e:
        print(f"[ERROR] Autocomplete failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Autocomplete failed: {str(e)}")

@app.post("/api/colleges/search")
async def search_college(request: SearchRequest):
    """Search for a college by name"""
    if comparator_model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        college = comparator_model.find_college(request.query)
        
        if college is None:
            raise HTTPException(status_code=404, detail=f"College '{request.query}' not found")
        
        return {
            "success": True,
            "college": {
                "name": college["College Name"],
                "city": college["City"],
                "type": college.get("College Type", "N/A"),
                "university": college.get("University", "N/A"),
                "fees": college.get("Average Fees", 0),
                "students": college.get("Total Student Enrollments", 0),
                "faculty": college.get("Total Faculty", 0),
                "rating": college.get("Rating", "N/A")
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.get("/api/colleges/list")
async def list_colleges(limit: int = 50, offset: int = 0):
    """Get list of all colleges"""
    if comparator_model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        colleges_df = comparator_model.df[offset:offset+limit]
        colleges_list = []
        
        for _, college in colleges_df.iterrows():
            colleges_list.append({
                "name": college["College Name"],
                "city": college["City"],
                "type": college.get("College Type", "N/A"),
                "fees": float(college.get("Average Fees", 0)) if college.get("Average Fees") else 0
            })
        
        return {
            "success": True,
            "colleges": colleges_list,
            "total": len(comparator_model.df),
            "limit": limit,
            "offset": offset
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list colleges: {str(e)}")

# Helper functions
def safe_value(value):
    """Convert pandas/numpy types to JSON-serializable Python types"""
    if pd.isna(value):
        return None
    elif isinstance(value, (np.integer, np.floating)):
        return float(value) if isinstance(value, np.floating) else int(value)
    elif isinstance(value, (np.ndarray, pd.Series)):
        return value.tolist()
    return value

def format_college_result(college_data: Dict, rank: int, personalization: Optional[PersonalizationFactors] = None) -> Dict[str, Any]:
    """Format college data for API response"""
    # Calculate a score based on available metrics with personalization
    score = calculate_score(college_data, personalization)
    
    # Extract strengths and weaknesses
    strengths, weaknesses = analyze_college(college_data, personalization)
    
    # Calculate student-faculty ratio
    total_students = safe_value(college_data["academics"]["Total Students"])
    total_faculty = safe_value(college_data["academics"]["Total Faculty"])
    
    student_faculty_ratio = None
    if total_students and total_faculty and not pd.isna(total_students) and not pd.isna(total_faculty) and total_faculty > 0:
        student_faculty_ratio = round(total_students / total_faculty, 2)
    
    # Generate quota-specific insights
    quota_insights = None
    if personalization:
        quota_insights = generate_quota_insights(college_data, personalization)
    
    result = {
        "college_name": str(college_data["overview"]["College Name"]),
        "score": float(score),
        "ranking": int(rank),
        "strengths": strengths,
        "weaknesses": weaknesses,
        "data": {
            "city": str(college_data["location"]["City"]),
            "state": str(college_data["location"]["State"]),
            "type": str(college_data["overview"]["Ownership Type"]),
            "established": safe_value(college_data["overview"]["Established Year"]),
            "university": str(college_data["overview"]["University"]),
            "campus_size": safe_value(college_data["overview"]["Campus Size"]),
            "total_students": total_students,
            "total_faculty": total_faculty,
            "student_faculty_ratio": student_faculty_ratio,
            "fees": safe_value(college_data["fees"]["Average Fees"]),
            "rating": safe_value(college_data["rating"]["Rating"]),
            "facilities": str(college_data["facilities"]["Facilities"]),
            "courses": str(college_data["academics"]["Courses"]),
            "google_maps": str(college_data["location"]["Google Maps"])
        }
    }
    
    # Add quota insights if available
    if quota_insights:
        result["quota_insights"] = quota_insights
    
    return result

def generate_quota_insights(college_data: Dict, personalization: PersonalizationFactors) -> Dict[str, Any]:
    """Generate quota and category-specific insights"""
    insights = {
        "category": personalization.category,
        "applicable_quotas": [],
        "fee_benefits": [],
        "admission_notes": []
    }
    
    ownership_type = str(college_data["overview"]["Ownership Type"])
    is_government = "Public" in ownership_type or "Government" in ownership_type
    fees = safe_value(college_data["fees"]["Average Fees"])
    
    # Category-specific quota information
    if personalization.category in ['SC', 'ST']:
        insights["applicable_quotas"].append(f"{personalization.category} Reservation (15%/7.5% seats)")
        if is_government:
            insights["fee_benefits"].append("Fee concession/waiver available for SC/ST students")
            insights["admission_notes"].append("Lower cutoff marks applicable")
        insights["admission_notes"].append("Post-matric scholarship available")
    
    elif personalization.category == 'OBC':
        insights["applicable_quotas"].append("OBC Reservation (27% seats)")
        if is_government and fees and fees < 800000:
            insights["fee_benefits"].append("May qualify for fee concession")
        insights["admission_notes"].append("Creamy layer certificate required")
    
    elif personalization.category == 'EWS':
        insights["applicable_quotas"].append("EWS Reservation (10% seats)")
        if is_government:
            insights["fee_benefits"].append("Fee structure same as general category")
        insights["admission_notes"].append("Income certificate (< ₹8 lakh) required")
    
    elif personalization.category in ['NT-A', 'NT-B', 'NT-C', 'NT-D', 'VJ-A', 'SBC', 'SEBC']:
        insights["applicable_quotas"].append(f"{personalization.category} Reservation (Maharashtra State)")
        if is_government:
            insights["fee_benefits"].append("State-level fee concessions may apply")
        insights["admission_notes"].append("Domicile certificate required")
    
    # Domicile-specific information
    if personalization.domicile == 'Maharashtra':
        insights["admission_notes"].append("Home state quota applicable (85% seats)")
    else:
        insights["admission_notes"].append("All India quota applicable (15% seats)")
        insights["admission_notes"].append("Higher cutoff may be required")
    
    # Gender-specific information
    facilities = str(college_data["facilities"]["Facilities"])
    if personalization.gender == 'Female':
        if "Girls Hostel" in facilities or "girls hostel" in facilities.lower():
            insights["admission_notes"].append("Girls hostel available")
        if is_government:
            insights["fee_benefits"].append("May qualify for girls' scholarships")
    
    # Financial aid information
    if fees and fees > 200000:
        insights["admission_notes"].append("Education loan facilities available")
    
    return insights

def calculate_score(college_data: Dict, personalization: Optional[PersonalizationFactors] = None) -> float:
    """Calculate overall score for a college (0-10) with optional personalization"""
    score = 5.0  # Base score
    
    # Adjust based on fees (lower is better)
    fees = safe_value(college_data["fees"]["Average Fees"])
    
    if personalization and personalization.maxBudget:
        # Personalized fee scoring based on user's budget
        if fees and not pd.isna(fees):
            if fees <= personalization.maxBudget * 0.7:  # Well within budget
                score += 2.0
            elif fees <= personalization.maxBudget:  # Within budget
                score += 1.0
            elif fees <= personalization.maxBudget * 1.2:  # Slightly over budget
                score += 0.5
            else:  # Over budget
                score -= 1.5
    else:
        # Default fee scoring
        if fees and not pd.isna(fees) and fees < 300000:
            score += 1.5
        elif fees and not pd.isna(fees) and fees < 500000:
            score += 1.0
        elif fees and not pd.isna(fees) and fees > 1000000:
            score -= 1.0
    
    # Adjust based on type with personalization
    ownership_type = str(college_data["overview"]["Ownership Type"])
    is_government = "Public" in ownership_type or "Government" in ownership_type
    
    if is_government:
        if personalization and personalization.prioritizeGovernmentCollege:
            score += 1.5  # Higher boost if user prefers government
        else:
            score += 0.5  # Standard boost
    
    # Location preference
    if personalization and personalization.locationPreference and 'Any' not in personalization.locationPreference:
        city = str(college_data["location"]["City"])
        if any(loc.lower() in city.lower() for loc in personalization.locationPreference):
            score += 1.0  # Bonus for preferred location
    
    # Hostel requirement
    if personalization and personalization.hostelRequired:
        facilities = str(college_data["facilities"]["Facilities"])
        if "Hostel" in facilities or "hostel" in facilities.lower():
            score += 0.8
        else:
            score -= 1.0  # Penalty if hostel required but not available
    
    # Student-faculty ratio preference
    if personalization and personalization.preferSmallCampus:
        students = safe_value(college_data["academics"]["Total Students"])
        faculty = safe_value(college_data["academics"]["Total Faculty"])
        
        if students and faculty and not pd.isna(students) and not pd.isna(faculty) and faculty > 0:
            ratio = students / faculty
            if ratio < 15:
                score += 1.5
            elif ratio < 20:
                score += 1.0
            elif ratio > 30:
                score -= 0.5
    
    # Adjust based on rating
    rating = safe_value(college_data["rating"]["Rating"])
    if rating and not pd.isna(rating) and isinstance(rating, (int, float)):
        score += (rating - 3.0)  # Assuming 3.0 is average
    
    # Adjust based on facilities
    facilities = str(college_data["facilities"]["Facilities"])
    if facilities and facilities != "nan" and len(facilities) > 100:
        score += 0.5
    
    # Ensure score is between 0 and 10
    return max(0.0, min(10.0, score))

def analyze_college(college_data: Dict, personalization: Optional[PersonalizationFactors] = None) -> tuple:
    """Analyze college and return strengths and weaknesses with personalization"""
    strengths = []
    weaknesses = []
    
    # Check fees with personalization
    fees = safe_value(college_data["fees"]["Average Fees"])
    
    if personalization and personalization.maxBudget and fees and not pd.isna(fees):
        if fees <= personalization.maxBudget * 0.7:
            strengths.append(f"Well within your budget (₹{fees/100000:.1f}L)")
        elif fees <= personalization.maxBudget:
            strengths.append(f"Within your budget (₹{fees/100000:.1f}L)")
        elif fees > personalization.maxBudget * 1.2:
            weaknesses.append(f"Above your budget (₹{fees/100000:.1f}L)")
    else:
        if fees and not pd.isna(fees) and fees < 300000:
            strengths.append("Affordable fees")
        elif fees and not pd.isna(fees) and fees > 800000:
            weaknesses.append("High fees")
    
    # Check type
    ownership_type = str(college_data["overview"]["Ownership Type"])
    if "Public" in ownership_type or "Government" in ownership_type:
        strengths.append("Government college")
    
    # Check students
    students = safe_value(college_data["academics"]["Total Students"])
    if students and not pd.isna(students) and students > 3000:
        strengths.append("Large student community")
    elif students and not pd.isna(students) and students < 1000:
        weaknesses.append("Small student body")
    
    # Check faculty
    faculty = safe_value(college_data["academics"]["Total Faculty"])
    students = safe_value(college_data["academics"]["Total Students"])
    if faculty and students and not pd.isna(faculty) and not pd.isna(students):
        ratio = students / faculty
        if ratio < 20:
            strengths.append("Good student-faculty ratio")
        elif ratio > 30:
            weaknesses.append("High student-faculty ratio")
    
    # Check facilities with personalization
    facilities = str(college_data["facilities"]["Facilities"])
    if facilities and facilities != "nan":
        has_hostel = "Hostel" in facilities or "hostel" in facilities.lower()
        
        if personalization and personalization.hostelRequired:
            if has_hostel:
                strengths.append("Hostel available (as required)")
            else:
                weaknesses.append("No hostel facility")
        elif has_hostel:
            strengths.append("Hostel available")
            
        if "Gym" in facilities and "Sports" in facilities:
            strengths.append("Good sports facilities")
    
    # Location match
    if personalization and personalization.locationPreference and 'Any' not in personalization.locationPreference:
        city = str(college_data["location"]["City"])
        if any(loc.lower() in city.lower() for loc in personalization.locationPreference):
            strengths.append(f"In your preferred location ({city})")
    
    return strengths[:4], weaknesses[:3]  # Limit strengths to top 4, weaknesses to 3

def generate_recommendation(college1: Dict, college2: Dict, personalization: Optional[PersonalizationFactors] = None) -> str:
    """Generate a recommendation based on comparison with personalization"""
    score1 = calculate_score(college1, personalization)
    score2 = calculate_score(college2, personalization)
    
    fees1 = safe_value(college1["fees"]["Average Fees"])
    fees2 = safe_value(college2["fees"]["Average Fees"])
    
    name1 = str(college1["overview"]["College Name"])
    name2 = str(college2["overview"]["College Name"])
    
    if score1 > score2:
        recommendation = f"{name1} appears to be the better choice overall with a score of {score1:.1f}/10"
    elif score2 > score1:
        recommendation = f"{name2} appears to be the better choice overall with a score of {score2:.1f}/10"
    else:
        recommendation = "Both colleges are comparable. Consider other factors like location and specific courses."
    
    # Add fee comparison
    if fees1 and fees2 and not pd.isna(fees1) and not pd.isna(fees2):
        if fees1 < fees2:
            savings = fees2 - fees1
            recommendation += f" {name1} is ₹{savings:,.0f} cheaper per year."
        elif fees2 < fees1:
            savings = fees1 - fees2
            recommendation += f" {name2} is ₹{savings:,.0f} cheaper per year."
    
    return recommendation

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

