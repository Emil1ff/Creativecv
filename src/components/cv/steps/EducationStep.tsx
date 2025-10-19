import ComponentCard from "../../common/ComponentCard";
import InputField from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

interface EducationStepProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export default function EducationStep({ data, onUpdate }: EducationStepProps) {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    };
    onUpdate([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updated);
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
  };

  return (
    <ComponentCard title="Education & Certifications" desc="Add your academic background and certifications">
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No education entries added yet.</p>
            <p className="text-sm mt-2">Click "Add Education" to get started.</p>
          </div>
        ) : (
          data.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Education #{index + 1}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`degree-${edu.id}`}>Degree/Program *</Label>
                  <InputField
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="e.g., Bachelor of Computer Science, Master of Business Administration"
                  />
                </div>

                <div>
                  <Label htmlFor={`school-${edu.id}`}>School/University *</Label>
                  <InputField
                    id={`school-${edu.id}`}
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    placeholder="e.g., Stanford University, MIT"
                  />
                </div>

                <div>
                  <Label htmlFor={`location-${edu.id}`}>Location</Label>
                  <InputField
                    id={`location-${edu.id}`}
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="e.g., Stanford, CA"
                  />
                </div>

                <div>
                  <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                  <InputField
                    id={`gpa-${edu.id}`}
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="e.g., 3.8/4.0 or Magna Cum Laude"
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${edu.id}`}>Start Date *</Label>
                  <InputField
                    id={`startDate-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${edu.id}`}>End Date *</Label>
                  <InputField
                    id={`endDate-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${edu.id}`}>Additional Details</Label>
                <TextArea
                  value={edu.description}
                  onChange={(value) => updateEducation(edu.id, 'description', value)}
                  placeholder="Include relevant coursework, honors, projects, or achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))
        )}

        <Button
          variant="outline"
          onClick={addEducation}
          className="w-full"
        >
          + Add Education Entry
        </Button>

        {/* Certifications Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Certifications</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Add your professional certifications and licenses. This helps demonstrate your expertise and commitment to continuous learning.
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  placeholder="Certification Name (e.g., AWS Certified Solutions Architect)"
                />
                <InputField
                  placeholder="Issuing Organization (e.g., Amazon Web Services)"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  type="month"
                  placeholder="Issue Date"
                />
                <InputField
                  type="month"
                  placeholder="Expiry Date (if applicable)"
                />
              </div>
              <Button variant="outline" size="sm">
                Add Certification
              </Button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">💡 Tips for Education</h4>
          <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
            <li>• List education in reverse chronological order</li>
            <li>• Include GPA only if it's 3.5 or higher</li>
            <li>• Add relevant coursework for recent graduates</li>
            <li>• Include honors, awards, and academic achievements</li>
            <li>• Mention thesis or capstone projects if relevant</li>
            <li>• Include professional certifications and licenses</li>
          </ul>
        </div>
      </div>
    </ComponentCard>
  );
}
