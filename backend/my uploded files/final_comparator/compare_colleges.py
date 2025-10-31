import pickle
import json

def print_college_info(college_data, college_num):
    """Pretty print college information"""
    print(f"\n{'='*60}")
    print(f"COLLEGE {college_num}: {college_data['overview']['College Name']}")
    print(f"{'='*60}")
    
    print(f"\n📋 OVERVIEW:")
    print(f"  ├─ Established: {college_data['overview']['Established Year']}")
    print(f"  ├─ Type: {college_data['overview']['Ownership Type']}")
    print(f"  ├─ University: {college_data['overview']['University']}")
    print(f"  ├─ Genders: {college_data['overview']['Genders Accepted']}")
    print(f"  └─ Campus Size: {college_data['overview']['Campus Size']}")
    
    print(f"\n📍 LOCATION:")
    print(f"  ├─ City: {college_data['location']['City']}")
    print(f"  ├─ State: {college_data['location']['State']}")
    print(f"  └─ Google Maps: {college_data['location']['Google Maps']}")
    
    print(f"\n🎓 ACADEMICS:")
    print(f"  ├─ Total Faculty: {college_data['academics']['Total Faculty']}")
    print(f"  ├─ Total Students: {college_data['academics']['Total Students']}")
    print(f"  └─ Courses: {len(str(college_data['academics']['Courses']).split(','))} courses offered")
    
    print(f"\n💰 FEES:")
    print(f"  └─ Average Fees: ₹{college_data['fees']['Average Fees']}")
    
    print(f"\n⭐ RATING:")
    print(f"  └─ Rating: {college_data['rating']['Rating']}")
    
    print(f"\n🏢 FACILITIES:")
    facilities = college_data['facilities']['Facilities']
    if facilities:
        facilities_list = [f.strip() for f in str(facilities).split(',')]
        print(f"  Available: {', '.join(facilities_list)}")

def compare_colleges(college1_name, college2_name):
    """Load model and compare two colleges"""
    with open("college_comparator.pkl", "rb") as f:
        model = pickle.load(f)
    
    result = model.compare(college1_name, college2_name)
    
    if "error" in result:
        print(f"❌ Error: {result['error']}")
        return
    
    print("\n" + "="*60)
    print("COLLEGE COMPARISON REPORT")
    print("="*60)
    
    print_college_info(result['college1'], 1)
    print_college_info(result['college2'], 2)
    
    print(f"\n{'='*60}")
    print("QUICK COMPARISON")
    print(f"{'='*60}")
    
    # Quick comparison
    c1 = result['college1']
    c2 = result['college2']
    
    print(f"\n📊 Key Differences:")
    print(f"  • Established: {c1['overview']['College Name']} ({c1['overview']['Established Year']}) vs {c2['overview']['College Name']} ({c2['overview']['Established Year']})")
    print(f"  • Type: {c1['overview']['Ownership Type']} vs {c2['overview']['Ownership Type']}")
    print(f"  • Students: {c1['academics']['Total Students']} vs {c2['academics']['Total Students']}")
    print(f"  • Faculty: {c1['academics']['Total Faculty']} vs {c2['academics']['Total Faculty']}")
    print(f"  • Avg Fees: ₹{c1['fees']['Average Fees']} vs ₹{c2['fees']['Average Fees']}")
    
    # Determine cheaper option
    if c1['fees']['Average Fees'] < c2['fees']['Average Fees']:
        savings = c2['fees']['Average Fees'] - c1['fees']['Average Fees']
        print(f"\n💡 {c1['overview']['College Name']} is ₹{savings:,.2f} cheaper!")
    else:
        savings = c1['fees']['Average Fees'] - c2['fees']['Average Fees']
        print(f"\n💡 {c2['overview']['College Name']} is ₹{savings:,.2f} cheaper!")
    
    print("\n")

if __name__ == "__main__":
    # Example comparison
    print("\n🎯 Welcome to Maharashtra College Comparator!\n")
    
    # Get user input
    college1 = input("Enter first college name (or part of it): ").strip()
    college2 = input("Enter second college name (or part of it): ").strip()
    
    if college1 and college2:
        compare_colleges(college1, college2)
    else:
        print("\n📝 Running default comparison...")
        compare_colleges("College of Engineering", "Veermata Jijabai Technological Institute")


