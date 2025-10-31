from build_model import CollegeComparator  # import the class
import pickle

with open("college_comparator.pkl", "rb") as f:
    model = pickle.load(f)

result = model.compare("College of Engineering", "Veermata Jijabai Technological Institute")

print(result)
