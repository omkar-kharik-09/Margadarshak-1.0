import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/types/profile';

export class ProfileService {
  private static COLLECTION = 'userProfiles';

  /**
   * Create a new user profile
   */
  static async createProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
    const profileRef = doc(db, this.COLLECTION, userId);
    
    const newProfile: Partial<UserProfile> = {
      ...profileData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      isProfileComplete: this.isComplete(profileData),
    };

    await setDoc(profileRef, newProfile);
  }

  /**
   * Get user profile
   */
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profileRef = doc(db, this.COLLECTION, userId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        // Convert Firestore timestamps to Date objects
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as UserProfile;
      }

      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const profileRef = doc(db, this.COLLECTION, userId);
    
    const updatedData = {
      ...updates,
      updatedAt: new Date(),
      isProfileComplete: this.isComplete(updates),
    };

    await updateDoc(profileRef, updatedData);
  }

  /**
   * Check if profile has all required fields
   */
  private static isComplete(profile: Partial<UserProfile>): boolean {
    const requiredFields: (keyof UserProfile)[] = [
      'name',
      'email',
      'reservationCategory',
      'gender',
      'domicile',
    ];

    return requiredFields.every(field => profile[field] !== undefined && profile[field] !== null);
  }

  /**
   * Get personalized comparison factors from profile
   */
  static getComparisonFactors(profile: UserProfile) {
    return {
      category: profile.reservationCategory,
      gender: profile.gender,
      domicile: profile.domicile,
      maxBudget: profile.maxBudget,
      hostelRequired: profile.hostelRequired,
      preferredCollegeType: profile.preferredCollegeType,
      locationPreference: profile.locationPreference,
      preferSmallCampus: profile.preferSmallCampus,
      prioritizeGovernmentCollege: profile.prioritizeGovernmentCollege,
    };
  }
}

