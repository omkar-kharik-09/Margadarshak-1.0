"""
Example comparisons showcasing different colleges in Maharashtra
"""
import pickle
from build_model import CollegeComparator

def quick_compare(model, college1, college2):
    """Quick comparison showing key metrics"""
    result = model.compare(college1, college2)
    
    if "error" in result:
        print(f"\n[ERROR] {result['error']}")
        return
    
    c1 = result['college1']
    c2 = result['college2']
    
    print(f"\n{'='*70}")
    print(f"Comparing: {c1['overview']['College Name']} vs {c2['overview']['College Name']}")
    print(f"{'='*70}")
    print(f"Location:     {c1['location']['City']:20} vs {c2['location']['City']}")
    print(f"Type:         {c1['overview']['Ownership Type']:20} vs {c2['overview']['Ownership Type']}")
    print(f"Established:  {str(c1['overview']['Established Year']):20} vs {c2['overview']['Established Year']}")
    print(f"Students:     {str(c1['academics']['Total Students']):20} vs {c2['academics']['Total Students']}")
    print(f"Faculty:      {str(c1['academics']['Total Faculty']):20} vs {c2['academics']['Total Faculty']}")
    print(f"Avg Fees:     Rs.{c1['fees']['Average Fees']:,.0f}   vs Rs.{c2['fees']['Average Fees']:,.0f}")
    
    if c1['fees']['Average Fees'] < c2['fees']['Average Fees']:
        savings = c2['fees']['Average Fees'] - c1['fees']['Average Fees']
        print(f"\n>> {c1['overview']['College Name']} is Rs.{savings:,.0f} cheaper!")
    else:
        savings = c1['fees']['Average Fees'] - c2['fees']['Average Fees']
        print(f"\n>> {c2['overview']['College Name']} is Rs.{savings:,.0f} cheaper!")

def main():
    print("\n" + "="*70)
    print("MAHARASHTRA COLLEGE COMPARATOR - EXAMPLE COMPARISONS")
    print("="*70)
    
    # Load the model
    with open("college_comparator.pkl", "rb") as f:
        model = pickle.load(f)
    
    print("\nExample 1: Private vs Government College")
    quick_compare(model, "MIT College of Engineering", "Veermata Jijabai")
    
    print("\n\nExample 2: Engineering Colleges Comparison")
    quick_compare(model, "Vishwakarma Institute", "Sinhgad College")
    
    print("\n\nExample 3: Prestigious Institutes")
    quick_compare(model, "Institute of Chemical Technology", "Visvesvaraya National")
    
    print("\n\nExample 4: Pune Universities")
    quick_compare(model, "Symbiosis", "Savitribai Phule Pune University")
    
    print("\n" + "="*70)
    print("Note: You can search using partial college names!")
    print("Example: 'MIT' will find 'MIT College of Engineering'")
    print("="*70 + "\n")

if __name__ == "__main__":
    main()

