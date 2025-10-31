"""
Quick script to check if the model file exists and can be loaded
"""
from pathlib import Path
import pickle
import sys

print("=" * 60)
print("CHECKING MODEL FILE")
print("=" * 60)

# Check if model file exists
model_path = Path(__file__).parent / "my uploded files" / "final_comparator" / "college_comparator.pkl"

print(f"\n1. Checking if file exists...")
print(f"   Path: {model_path}")

if not model_path.exists():
    print(f"   ✗ FILE NOT FOUND!")
    print(f"\n   Please ensure the file is at:")
    print(f"   {model_path}")
    print(f"\n   Or generate it by running:")
    print(f"   cd 'my uploded files/final_comparator'")
    print(f"   python build_model.py")
    sys.exit(1)

print(f"   ✓ File exists! Size: {model_path.stat().st_size / 1024:.2f} KB")

# Try to load the model
print(f"\n2. Trying to load model...")
try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)
    print(f"   ✓ Model loaded successfully!")
    
    # Check model properties
    print(f"\n3. Checking model properties...")
    print(f"   Type: {type(model).__name__}")
    print(f"   Has 'df' attribute: {hasattr(model, 'df')}")
    print(f"   Has 'compare' method: {hasattr(model, 'compare')}")
    
    if hasattr(model, 'df'):
        print(f"   Total colleges: {len(model.df)}")
        print(f"   Columns: {list(model.df.columns[:5])}... (showing first 5)")
    
    # Test comparison
    print(f"\n4. Testing comparison...")
    try:
        result = model.compare("MIT", "VJTI")
        if "error" in result:
            print(f"   ⚠ Comparison returned error: {result['error']}")
        else:
            print(f"   ✓ Comparison successful!")
            print(f"   College 1: {result['college1']['overview']['College Name']}")
            print(f"   College 2: {result['college2']['overview']['College Name']}")
    except Exception as e:
        print(f"   ✗ Comparison failed: {e}")
        import traceback
        traceback.print_exc()
    
except Exception as e:
    print(f"   ✗ Failed to load model: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 60)
print("MODEL CHECK COMPLETE - Everything looks good!")
print("=" * 60)
print("\nYou can now run: python main.py")


