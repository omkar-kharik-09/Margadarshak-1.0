export type ReservationCategory = 
  | 'General' 
  | 'OBC' 
  | 'SC' 
  | 'ST' 
  | 'EWS' 
  | 'SEBC' 
  | 'NT-A' 
  | 'NT-B' 
  | 'NT-C' 
  | 'NT-D'
  | 'VJ-A'
  | 'SBC';

export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

export type CollegeType = 'Government' | 'Private' | 'Aided' | 'Autonomous' | 'Any';

export type LocationPreference = 'Mumbai' | 'Pune' | 'Nagpur' | 'Nashik' | 'Aurangabad' | 'Any';

export interface UserProfile {
  userId: string;
  
  // Personal Information
  name: string;
  email: string;
  phone?: string;
  
  // Academic Information
  reservationCategory: ReservationCategory;
  gender: Gender;
  domicile: 'Maharashtra' | 'Outside Maharashtra';
  
  // Preferences
  preferredCollegeType: CollegeType[];
  locationPreference: LocationPreference[];
  maxBudget?: number; // Annual fees in INR
  minBudget?: number;
  
  // Additional Factors
  hostelRequired: boolean;
  preferSmallCampus: boolean; // < 20:1 student-faculty ratio
  prioritizeGovernmentCollege: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isProfileComplete: boolean;
}

export interface PersonalizedComparisonFactors {
  category: ReservationCategory;
  gender: Gender;
  domicile: 'Maharashtra' | 'Outside Maharashtra';
  maxBudget?: number;
  hostelRequired: boolean;
  preferredCollegeType: CollegeType[];
  locationPreference: LocationPreference[];
  preferSmallCampus: boolean;
  prioritizeGovernmentCollege: boolean;
}

