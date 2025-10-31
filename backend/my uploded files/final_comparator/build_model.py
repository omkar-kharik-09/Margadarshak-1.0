import pandas as pd
import pickle

class CollegeComparator:
    def __init__(self, csv_path):
        self.df = pd.read_csv(csv_path)
        # Common college abbreviations mapping
        self.abbreviations = {
            'vjti': 'veermata jijabai technological institute',
            'coep': 'college of engineering pune',
            'spce': 'sardar patel college of engineering',
            'spit': 'sardar patel institute of technology',
            'kjsce': 'kj somaiya college of engineering',
            'kjsieit': 'kj somaiya institute of engineering',
            'pict': 'pune institute of computer technology',
            'rait': 'ramrao adik institute of technology',
            'dbit': 'don bosco institute of technology',
            'sies': 'sies graduate school of technology',
            'tsec': 'thadomal shahani engineering college',
            'fcrit': 'fr conceicao rodrigues institute of technology',
            'dmce': 'dwarkadas j sanghvi college of engineering',
            'djsce': 'dwarkadas j sanghvi college of engineering',
            'apsit': 'a p shah institute of technology',
            'rait': 'ramrao adik institute of technology',
            'universal': 'dr dy patil vidyapeeth',
        }
        self.clean_data()

    def clean_data(self):
        # Drop useless columns starting with 'Unnamed'
        self.df = self.df.loc[:, ~self.df.columns.str.contains('^Unnamed')]
        # Normalize college names for searching
        self.df['name_clean'] = self.df['College Name'].str.lower().str.strip()
        # Fill missing location URLs with Google Maps search link
        self.df['location'] = self.df['location'].fillna('')
        self.df['location'] = self.df.apply(
            lambda row: row['location'] if row['location'] else 
            f"https://www.google.com/maps/search/?api=1&query={row['College Name'].replace(' ', '+')}",
            axis=1
        )

    def find_college(self, query):
        query_lower = query.lower().strip()
        
        # Check if the query is a known abbreviation
        if query_lower in self.abbreviations:
            query_lower = self.abbreviations[query_lower]
        
        # Try exact substring match first
        results = self.df[self.df["name_clean"].str.contains(query_lower, regex=False, na=False)]
        
        if len(results) > 0:
            return results.iloc[0]
        
        # If no exact match, try fuzzy matching with word boundaries
        # Split query into words and try to match all words
        query_words = query_lower.split()
        if len(query_words) > 1:
            mask = self.df["name_clean"].str.contains(query_words[0], regex=False, na=False)
            for word in query_words[1:]:
                mask = mask & self.df["name_clean"].str.contains(word, regex=False, na=False)
            results = self.df[mask]
            if len(results) > 0:
                return results.iloc[0]
        
        return None

    def compare(self, c1, c2):
        col1 = self.find_college(c1)
        col2 = self.find_college(c2)

        if col1 is None or col2 is None:
            return {"error": "One or both colleges not found"}

        def extract(col):
            return {
                "overview": {
                    "College Name": col["College Name"],
                    "Established Year": col.get("Established Year", None),
                    "Ownership Type": col.get("College Type", None),
                    "University": col.get("University", None),
                    "Genders Accepted": col.get("Genders Accepted", None),
                    "Campus Size": col.get("Campus Size", None),
                },
                "location": {
                    "City": col["City"],
                    "State": col.get("State", "Maharashtra"),
                    "Google Maps": col.get("location")  # use 'location' column now
                },
                "academics": {
                    "Total Faculty": col.get("Total Faculty", None),
                    "Total Students": col.get("Total Student Enrollments", None),
                    "Courses": col.get("Courses", None),
                },
                "fees": {
                    "Average Fees": col.get("Average Fees", None)
                },
                "facilities": {
                    "Facilities": col.get("Facilities", None)
                },
                "rating": {
                    "Rating": col.get("Rating", None)
                }
            }

        return {
            "college1": extract(col1),
            "college2": extract(col2)
        }

if __name__ == "__main__":
    model = CollegeComparator("maharashtra_colleges_location.csv")
    with open("college_comparator.pkl", "wb") as f:
        pickle.dump(model, f)

    print("[SUCCESS] Model saved: college_comparator.pkl")
