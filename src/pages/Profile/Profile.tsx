import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import InputField from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  avatar: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    emailUpdates: boolean;
    language: string;
  };
}

const initialProfile: UserProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Experienced software engineer with a passion for creating innovative solutions. Love working with React, Node.js, and cloud technologies.",
  website: "https://johndoe.dev",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  avatar: "",
  preferences: {
    theme: 'auto',
    notifications: true,
    emailUpdates: true,
    language: 'en'
  }
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePreferences = (field: keyof UserProfile['preferences'], value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Save profile logic here
    console.log('Saving profile:', profile);
    setIsEditing(false);
    // Show success message
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: '👤' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <>
      <PageMeta
        title="Profile - Creative CV User Profile"
        description="Manage your profile information, preferences, and account settings on Creative CV platform."
      />
      
      {/* Header */}
      <div className="col-span-12 mb-8 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information and preferences
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Profile Overview */}
        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Profile Overview" className="text-center animate-scale-in">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold animate-pulse-slow">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{profile.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{profile.location}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">CVs Created:</span>
                <span className="font-semibold text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Active:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Today</span>
              </div>
            </div>
          </ComponentCard>

          {/* Quick Actions */}
          <div className="mt-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <ComponentCard title="Quick Actions">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/create'}>
                📄 Create New CV
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/my-cvs'}>
                📁 View My CVs
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/templates'}>
                🎨 Browse Templates
              </Button>
            </div>
            </ComponentCard>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          {/* Tabs */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <ComponentCard title="Profile Management">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <InputField
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => updateProfile('firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <InputField
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => updateProfile('lastName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <InputField
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <InputField
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <InputField
                        id="location"
                        value={profile.location}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bio & Links</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <TextArea
                        value={profile.bio}
                        onChange={(value) => updateProfile('bio', value)}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <InputField
                          id="website"
                          value={profile.website}
                          onChange={(e) => updateProfile('website', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <InputField
                          id="linkedin"
                          value={profile.linkedin}
                          onChange={(e) => updateProfile('linkedin', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <InputField
                          id="github"
                          value={profile.github}
                          onChange={(e) => updateProfile('github', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <select
                        id="theme"
                        value={profile.preferences.theme}
                        onChange={(e) => updatePreferences('theme', e.target.value)}
                        className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={profile.preferences.language}
                        onChange={(e) => updatePreferences('language', e.target.value)}
                        className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="en">English</option>
                        <option value="az">Azərbaycan</option>
                        <option value="tr">Türkçe</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications about CV updates</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.notifications}
                        onChange={(e) => updatePreferences('notifications', e.target.checked)}
                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Updates</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications about new features</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.emailUpdates}
                        onChange={(e) => updatePreferences('emailUpdates', e.target.checked)}
                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <InputField
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <InputField
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <InputField
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button variant="primary">
                      Update Password
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Download Account Data</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Download a copy of your account data</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
}
