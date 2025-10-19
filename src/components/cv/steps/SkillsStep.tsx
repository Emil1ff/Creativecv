import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import InputField from "../../form/input/InputField";
import Button from "../../ui/button/Button";

interface Skill {
  name: string;
  level: number; // 1-5 proficiency level
}

interface Language {
  name: string;
  proficiency: string;
}

interface SkillsData {
  technical: Skill[];
  soft: Skill[];
  languages: Language[];
}

interface SkillsStepProps {
  data: SkillsData;
  onUpdate: (data: SkillsData) => void;
}

const proficiencyLevels = {
  1: "Beginner",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert"
};

const languageProficiencies = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Basic"
];

export default function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState({ name: "", proficiency: "" });

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      const updated = {
        ...data,
        technical: [...data.technical, { name: newTechnicalSkill, level: 3 }]
      };
      onUpdate(updated);
      setNewTechnicalSkill("");
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      const updated = {
        ...data,
        soft: [...data.soft, { name: newSoftSkill, level: 3 }]
      };
      onUpdate(updated);
      setNewSoftSkill("");
    }
  };

  const addLanguage = () => {
    if (newLanguage.name.trim() && newLanguage.proficiency) {
      const updated = {
        ...data,
        languages: [...data.languages, newLanguage]
      };
      onUpdate(updated);
      setNewLanguage({ name: "", proficiency: "" });
    }
  };

  const removeTechnicalSkill = (index: number) => {
    const updated = {
      ...data,
      technical: data.technical.filter((_, i) => i !== index)
    };
    onUpdate(updated);
  };

  const removeSoftSkill = (index: number) => {
    const updated = {
      ...data,
      soft: data.soft.filter((_, i) => i !== index)
    };
    onUpdate(updated);
  };

  const removeLanguage = (index: number) => {
    const updated = {
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    };
    onUpdate(updated);
  };

  const updateSkillLevel = (type: 'technical' | 'soft', index: number, level: number) => {
    const updated = {
      ...data,
      [type]: data[type].map((skill, i) => 
        i === index ? { ...skill, level } : skill
      )
    };
    onUpdate(updated);
  };

  const SkillItem = ({ skill, onRemove, onLevelChange }: { 
    skill: Skill; 
    onRemove: () => void; 
    onLevelChange: (level: number) => void;
  }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex-1">
        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Level:</span>
        <select
          value={skill.level}
          onChange={(e) => onLevelChange(parseInt(e.target.value))}
          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {Object.entries(proficiencyLevels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="text-red-600 border-red-300 hover:bg-red-50 px-2"
      >
        ✕
      </Button>
    </div>
  );

  const LanguageItem = ({ language, onRemove }: { 
    language: Language; 
    onRemove: () => void;
  }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div>
        <span className="font-medium text-gray-900 dark:text-white">{language.name}</span>
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({language.proficiency})</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="text-red-600 border-red-300 hover:bg-red-50 px-2"
      >
        ✕
      </Button>
    </div>
  );

  return (
    <ComponentCard title="Skills & Languages" desc="Showcase your technical and soft skills">
      <div className="space-y-8">
        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technical Skills</h3>
          <div className="space-y-3 mb-4">
            {data.technical.map((skill, index) => (
              <SkillItem
                key={index}
                skill={skill}
                onRemove={() => removeTechnicalSkill(index)}
                onLevelChange={(level) => updateSkillLevel('technical', index, level)}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <InputField
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              placeholder="e.g., JavaScript, Python, React, AWS..."
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={addTechnicalSkill}
              disabled={!newTechnicalSkill.trim()}
            >
              Add Skill
            </Button>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Soft Skills</h3>
          <div className="space-y-3 mb-4">
            {data.soft.map((skill, index) => (
              <SkillItem
                key={index}
                skill={skill}
                onRemove={() => removeSoftSkill(index)}
                onLevelChange={(level) => updateSkillLevel('soft', index, level)}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <InputField
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              placeholder="e.g., Leadership, Communication, Problem Solving..."
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={addSoftSkill}
              disabled={!newSoftSkill.trim()}
            >
              Add Skill
            </Button>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
          <div className="space-y-3 mb-4">
            {data.languages.map((language, index) => (
              <LanguageItem
                key={index}
                language={language}
                onRemove={() => removeLanguage(index)}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <InputField
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="e.g., English, Spanish, French..."
              className="flex-1"
            />
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Proficiency</option>
              {languageProficiencies.map((proficiency) => (
                <option key={proficiency} value={proficiency}>{proficiency}</option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={addLanguage}
              disabled={!newLanguage.name.trim() || !newLanguage.proficiency}
            >
              Add Language
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">💡 Tips for Skills</h4>
          <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
            <li>• Include skills relevant to the job you're applying for</li>
            <li>• Be honest about your proficiency levels</li>
            <li>• Mix technical and soft skills for a balanced profile</li>
            <li>• Include programming languages, tools, and frameworks</li>
            <li>• Add certifications and specialized training</li>
          </ul>
        </div>
      </div>
    </ComponentCard>
  );
}
