import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import InputField from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface WorkExperienceStepProps {
  data: WorkExperience[];
  onUpdate: (data: WorkExperience[]) => void;
}

export default function WorkExperienceStep({ data, onUpdate }: WorkExperienceStepProps) {
  const [newAchievement, setNewAchievement] = useState<{ [key: string]: string }>({});

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    };
    onUpdate([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    const achievement = newAchievement[expId];
    if (achievement.trim()) {
      const updated = data.map(exp => 
        exp.id === expId 
          ? { ...exp, achievements: [...exp.achievements, achievement] }
          : exp
      );
      onUpdate(updated);
      setNewAchievement({ ...newAchievement, [expId]: "" });
    }
  };

  const removeAchievement = (expId: string, achievementIndex: number) => {
    const updated = data.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: exp.achievements.filter((_, index) => index !== achievementIndex) }
        : exp
    );
    onUpdate(updated);
  };

  return (
    <ComponentCard title="Work Experience" desc="Add your professional work experience">
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No work experience added yet.</p>
            <p className="text-sm mt-2">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          data.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Experience #{index + 1}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`company-${exp.id}`}>Company Name *</Label>
                  <InputField
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="e.g., Google, Microsoft, Your Company"
                  />
                </div>

                <div>
                  <Label htmlFor={`position-${exp.id}`}>Job Title *</Label>
                  <InputField
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <Label htmlFor={`location-${exp.id}`}>Location</Label>
                  <InputField
                    id={`location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor={`startDate-${exp.id}`}>Start Date *</Label>
                    <InputField
                      id={`startDate-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  {!exp.current && (
                    <div className="flex-1">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                      <InputField
                        id={`endDate-${exp.id}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => {
                      updateExperience(exp.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(exp.id, 'endDate', '');
                      }
                    }}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor={`description-${exp.id}`}>Job Description</Label>
                <TextArea
                  value={exp.description}
                  onChange={(value) => updateExperience(exp.id, 'description', value)}
                  placeholder="Describe your main responsibilities and daily tasks..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Key Achievements</Label>
                <div className="space-y-2 mb-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center gap-2">
                      <span className="text-brand-500">•</span>
                      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                        {achievement}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(exp.id, achIndex)}
                        className="text-red-600 border-red-300 hover:bg-red-50 px-2"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <InputField
                    value={newAchievement[exp.id] || ""}
                    onChange={(e) => setNewAchievement({ ...newAchievement, [exp.id]: e.target.value })}
                    placeholder="Add a key achievement..."
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(exp.id)}
                    disabled={!newAchievement[exp.id]?.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        <Button
          variant="outline"
          onClick={addExperience}
          className="w-full"
        >
          + Add Work Experience
        </Button>

        {/* Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">💡 Tips for Work Experience</h4>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• List experiences in reverse chronological order (most recent first)</li>
            <li>• Use action verbs to start achievement statements</li>
            <li>• Quantify your achievements with numbers and percentages</li>
            <li>• Focus on results and impact, not just responsibilities</li>
            <li>• Tailor descriptions to the job you're applying for</li>
          </ul>
        </div>
      </div>
    </ComponentCard>
  );
}
