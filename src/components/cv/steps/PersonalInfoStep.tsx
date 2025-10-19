import ComponentCard from "../../common/ComponentCard";
import InputField from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  title: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onUpdate: (data: PersonalInfoData) => void;
}

export default function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  const updateField = (field: keyof PersonalInfoData, value: string) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <ComponentCard title="Personal Information" desc="Tell us about yourself">
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <InputField
                id="firstName"
                value={data.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <InputField
                id="lastName"
                value={data.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <Label htmlFor="title">Professional Title *</Label>
              <InputField
                id="title"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g., Software Engineer, Marketing Manager"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <InputField
                id="location"
                value={data.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="e.g., New York, NY or Remote"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <InputField
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <InputField
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <InputField
                id="website"
                type="url"
                value={data.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <InputField
                id="linkedin"
                value={data.linkedin}
                onChange={(e) => updateField('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            
            <div>
              <Label htmlFor="github">GitHub</Label>
              <InputField
                id="github"
                value={data.github}
                onChange={(e) => updateField('github', e.target.value)}
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h3>
          <div>
            <Label htmlFor="summary">Summary *</Label>
            <TextArea
              value={data.summary}
              onChange={(value) => updateField('summary', value)}
              placeholder="Write a brief professional summary highlighting your key achievements and career objectives..."
              rows={5}
              hint="Keep it concise but impactful. This is often the first thing employers read."
            />
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips for Personal Information</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Use a professional email address</li>
            <li>• Include your city and state/country for location</li>
            <li>• Make sure all social media profiles are professional</li>
            <li>• Keep your summary to 2-3 sentences maximum</li>
            <li>• Focus on your unique value proposition</li>
          </ul>
        </div>
      </div>
    </ComponentCard>
  );
}
