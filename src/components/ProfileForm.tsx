'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/services/profileService';
import { UserProfile, ReservationCategory, Gender, CollegeType, LocationPreference } from '@/types/profile';
import { User, Save, CheckCircle } from 'lucide-react';

export function ProfileForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.displayName || '',
    email: user?.email || '',
    reservationCategory: 'General',
    gender: 'Prefer not to say',
    domicile: 'Maharashtra',
    preferredCollegeType: ['Any'],
    locationPreference: ['Any'],
    hostelRequired: false,
    preferSmallCampus: false,
    prioritizeGovernmentCollege: false,
  });

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const profile = await ProfileService.getProfile(user.uid);
    
    if (profile) {
      setFormData(profile);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage(null);

    try {
      const existingProfile = await ProfileService.getProfile(user.uid);
      
      if (existingProfile) {
        await ProfileService.updateProfile(user.uid, formData);
      } else {
        await ProfileService.createProfile(user.uid, formData);
      }

      // Show success toast notification
      setShowToast(true);
      
      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to save profile. Please try again.' });
      setSaving(false);
    }
  };

  const handleCheckboxChange = (field: keyof UserProfile, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleMultiSelectChange = (field: 'preferredCollegeType' | 'locationPreference', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      
      if (value === 'Any') {
        return { ...prev, [field]: ['Any'] };
      }
      
      const newValues = currentValues.includes(value as any)
        ? currentValues.filter(v => v !== value)
        : [...currentValues.filter(v => v !== 'Any'), value];
      
      return { ...prev, [field]: newValues.length > 0 ? newValues : ['Any'] };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  const reservationCategories: ReservationCategory[] = [
    'General', 'OBC', 'SC', 'ST', 'EWS', 'SEBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'VJ-A', 'SBC'
  ];

  const genders: Gender[] = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const collegeTypes: CollegeType[] = ['Government', 'Private', 'Aided', 'Autonomous', 'Any'];

  const locations: LocationPreference[] = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Any'];

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div 
          className="fixed top-4 right-4 z-50"
          style={{
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-green-200 p-4 min-w-[320px] flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#1a1a1a]">Profile Saved Successfully!</p>
              <p className="text-sm text-[#606060]">Redirecting to home page...</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#e0e0e0]">
          <div className="p-3 bg-[#e6f2ff] rounded-full">
            <User className="text-[#2563eb]" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Your Profile</h2>
            <p className="text-sm text-[#606060]">
              Help us personalize your college recommendations
            </p>
          </div>
        </div>

        {/* Error Message */}
        {message && message.type === 'error' && (
          <div className="p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
            <div className="flex items-center gap-2">
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Personal Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>
      </div>

      {/* Quota & Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Reservation & Eligibility</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Reservation Category <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.reservationCategory}
              onChange={(e) => setFormData(prev => ({ ...prev, reservationCategory: e.target.value as ReservationCategory }))}
              className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            >
              {reservationCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
              className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            >
              {genders.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Domicile <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.domicile}
              onChange={(e) => setFormData(prev => ({ ...prev, domicile: e.target.value as 'Maharashtra' | 'Outside Maharashtra' }))}
              className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Outside Maharashtra">Outside Maharashtra</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">College Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Preferred College Type (Select multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {collegeTypes.map(type => (
                <label
                  key={type}
                  className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    formData.preferredCollegeType?.includes(type)
                      ? 'bg-[#2563eb] text-white border-[#2563eb]'
                      : 'bg-[#f0f0f0] border-[#d0d0d0] text-[#333333] hover:bg-[#e0e0e0]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.preferredCollegeType?.includes(type)}
                    onChange={() => handleMultiSelectChange('preferredCollegeType', type)}
                    className="sr-only"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Location Preference (Select multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {locations.map(loc => (
                <label
                  key={loc}
                  className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    formData.locationPreference?.includes(loc)
                      ? 'bg-[#2563eb] text-white border-[#2563eb]'
                      : 'bg-[#f0f0f0] border-[#d0d0d0] text-[#333333] hover:bg-[#e0e0e0]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.locationPreference?.includes(loc)}
                    onChange={() => handleMultiSelectChange('locationPreference', loc)}
                    className="sr-only"
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Minimum Budget (Annual Fees in ₹)
              </label>
              <input
                type="number"
                min="0"
                step="10000"
                value={formData.minBudget || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, minBudget: e.target.value ? Number(e.target.value) : undefined }))}
                className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="e.g., 100000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Maximum Budget (Annual Fees in ₹)
              </label>
              <input
                type="number"
                min="0"
                step="10000"
                value={formData.maxBudget || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, maxBudget: e.target.value ? Number(e.target.value) : undefined }))}
                className="w-full px-4 py-2.5 bg-white border border-[#d0d0d0] rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="e.g., 500000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Additional Preferences</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg cursor-pointer hover:bg-[#f0f0f0] transition-colors border border-[#e0e0e0]">
            <input
              type="checkbox"
              checked={formData.hostelRequired || false}
              onChange={(e) => handleCheckboxChange('hostelRequired', e.target.checked)}
              className="w-5 h-5 rounded border-[#d0d0d0] text-[#2563eb] focus:ring-2 focus:ring-[#2563eb]"
            />
            <div>
              <span className="font-medium text-[#1a1a1a]">Hostel Required</span>
              <p className="text-sm text-[#606060]">Prioritize colleges with hostel facilities</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg cursor-pointer hover:bg-[#f0f0f0] transition-colors border border-[#e0e0e0]">
            <input
              type="checkbox"
              checked={formData.preferSmallCampus || false}
              onChange={(e) => handleCheckboxChange('preferSmallCampus', e.target.checked)}
              className="w-5 h-5 rounded border-[#d0d0d0] text-[#2563eb] focus:ring-2 focus:ring-[#2563eb]"
            />
            <div>
              <span className="font-medium text-[#1a1a1a]">Prefer Better Faculty-Student Ratio</span>
              <p className="text-sm text-[#606060]">Prioritize colleges with &lt; 20:1 ratio for personalized attention</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg cursor-pointer hover:bg-[#f0f0f0] transition-colors border border-[#e0e0e0]">
            <input
              type="checkbox"
              checked={formData.prioritizeGovernmentCollege || false}
              onChange={(e) => handleCheckboxChange('prioritizeGovernmentCollege', e.target.checked)}
              className="w-5 h-5 rounded border-[#d0d0d0] text-[#2563eb] focus:ring-2 focus:ring-[#2563eb]"
            />
            <div>
              <span className="font-medium text-[#1a1a1a]">Prioritize Government Colleges</span>
              <p className="text-sm text-[#606060]">Prefer government/public institutions</p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-[#e0e0e0]">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1e40af] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
    </>
  );
}

