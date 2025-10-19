import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import InputField from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sound: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
  editor: {
    autoSave: boolean;
    fontSize: number;
    showLineNumbers: boolean;
  };
}

const initialSettings: AppSettings = {
  theme: 'auto',
  language: 'en',
  notifications: {
    push: true,
    email: true,
    sound: false
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false
  },
  editor: {
    autoSave: true,
    fontSize: 14,
    showLineNumbers: true
  }
};

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (section: keyof AppSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setHasChanges(true);
  };

  return (
    <>
      <PageMeta
        title="Settings - Creative CV Application Settings"
        description="Customize your Creative CV experience with personalized settings for theme, notifications, privacy, and more."
      />
      
      {/* Header */}
      <div className="col-span-12 mb-8 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Application Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your Creative CV experience
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Appearance Settings */}
        <div className="col-span-12 lg:col-span-6">
          <ComponentCard title="🎨 Appearance" className="animate-scale-in">
            <div className="space-y-6">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <select
                  id="theme"
                  value={settings.theme}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-1"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Choose your preferred color scheme
                </p>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-1"
                >
                  <option value="en">English</option>
                  <option value="az">Azərbaycan</option>
                  <option value="tr">Türkçe</option>
                  <option value="ru">Русский</option>
                </select>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Select your preferred language
                </p>
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* Notifications Settings */}
        <div className="col-span-12 lg:col-span-6">
          <div className="animate-scale-in" style={{animationDelay: '0.1s'}}>
            <ComponentCard title="🔔 Notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive browser notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => updateSetting('notifications', 'push', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => updateSetting('notifications', 'email', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.sound}
                    onChange={(e) => updateSetting('notifications', 'sound', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="col-span-12 lg:col-span-6">
          <div className="animate-scale-in" style={{animationDelay: '0.2s'}}>
            <ComponentCard title="🔒 Privacy">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <select
                    id="profileVisibility"
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-1"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Email</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Display email in your profile</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => updateSetting('privacy', 'showEmail', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Phone</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Display phone number in your profile</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.showPhone}
                    onChange={(e) => updateSetting('privacy', 'showPhone', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="col-span-12 lg:col-span-6">
          <div className="animate-scale-in" style={{animationDelay: '0.3s'}}>
            <ComponentCard title="✏️ Editor">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Save</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically save your work</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.editor.autoSave}
                    onChange={(e) => updateSetting('editor', 'autoSave', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <InputField
                    id="fontSize"
                    type="number"
                    value={settings.editor.fontSize}
                    onChange={(e) => updateSetting('editor', 'fontSize', parseInt(e.target.value))}
                    min="12"
                    max="24"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Font size for the CV editor (12-24px)
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Line Numbers</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Display line numbers in editor</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.editor.showLineNumbers}
                    onChange={(e) => updateSetting('editor', 'showLineNumbers', e.target.checked)}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="col-span-12">
          <div className="animate-scale-in" style={{animationDelay: '0.4s'}}>
            <ComponentCard title="⚡ Advanced Settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Data Management</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      📥 Import CV Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      📤 Export All Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🗑️ Clear Cache
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Account Actions</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      🔄 Sync with Cloud
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                      🚪 Sign Out
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                      ❌ Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
}