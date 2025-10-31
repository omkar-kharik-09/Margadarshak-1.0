"""
Quick test script to verify backend is working
"""
import requests
import json

print("Testing Margadarshak Backend...")
print("-" * 50)

# Test 1: Health Check
print("\n1. Testing Health Endpoint...")
try:
    response = requests.get("http://localhost:8000/health", timeout=5)
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    if response.json().get("model_loaded"):
        print("   ✓ Model is loaded!")
    else:
        print("   ✗ Model is NOT loaded!")
except requests.exceptions.RequestException as e:
    print(f"   ✗ Error: {e}")
    print("   Make sure backend is running: python main.py")
    exit(1)

# Test 2: Compare Colleges
print("\n2. Testing College Comparison...")
try:
    payload = {
        "colleges": ["MIT", "VJTI"]
    }
    response = requests.post(
        "http://localhost:8000/api/colleges/compare",
        json=payload,
        timeout=10
    )
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✓ Comparison successful!")
        print(f"   Colleges compared: {len(data['comparison'])}")
        for college in data['comparison']:
            print(f"     - {college['college_name']}: Score {college['score']}/10")
        print(f"   Recommendation: {data['recommendation']}")
    else:
        print(f"   ✗ Error: {response.json()}")
except requests.exceptions.RequestException as e:
    print(f"   ✗ Error: {e}")

# Test 3: Search College
print("\n3. Testing College Search...")
try:
    payload = {
        "query": "MIT"
    }
    response = requests.post(
        "http://localhost:8000/api/colleges/search",
        json=payload,
        timeout=5
    )
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✓ Found: {data['college']['name']}")
        print(f"     Location: {data['college']['city']}")
        print(f"     Type: {data['college']['type']}")
        print(f"     Fees: ₹{data['college']['fees']:,.0f}")
    else:
        print(f"   ✗ Error: {response.json()}")
except requests.exceptions.RequestException as e:
    print(f"   ✗ Error: {e}")

print("\n" + "-" * 50)
print("Testing complete!")
print("\nIf all tests passed, your backend is working correctly.")
print("If tests failed, check:")
print("  1. Backend is running: python main.py")
print("  2. Model file exists: backend/my uploded files/final_comparator/college_comparator.pkl")
print("  3. All dependencies installed: pip install -r requirements.txt")


