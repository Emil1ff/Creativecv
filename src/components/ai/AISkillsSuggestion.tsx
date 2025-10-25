import { useState } from 'react';
import { useAI } from '../../context/AIContext';
import Button from '../ui/button/Button';

interface AISkillsSuggestionProps {
  jobTitle: string;
  existingSkills: string[];
  onSelected: (skills: string[]) => void;
  onClose: () => void;
}

export default function AISkillsSuggestion({ jobTitle, existingSkills, onSelected, onClose }: AISkillsSuggestionProps) {
  const { suggestSkills, isGenerating, error } = useAI();
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    try {
      const skills = await suggestSkills(jobTitle, existingSkills);
      setSuggestedSkills(skills);
      setHasGenerated(true);
    } catch (err) {
      console.error('Skills suggestion failed:', err);
    }
  };

  const toggleSkill = (skill: string) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skill)) {
      newSelected.delete(skill);
    } else {
      newSelected.add(skill);
    }
    setSelectedSkills(newSelected);
  };

  const handleAdd = () => {
    onSelected(Array.from(selectedSkills));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Skill Təklifləri
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span className="font-semibold">{jobTitle}</span> pozisiyası üçün uyğun skill-lər
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!hasGenerated ? (
            /* Initial View */
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full mb-6">
                <svg className="w-10 h-10 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Skill Təklifləri Alın
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                AI sizin pozisiyanıza uyğun ən məşhur və tələb olunan skill-ləri təklif edəcək.
              </p>
              {existingSkills.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Mövcud skill-lər ({existingSkills.length}):
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                    {existingSkills.slice(0, 6).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {existingSkills.length > 6 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm rounded-full">
                        +{existingSkills.length - 6} daha
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Skills Grid */
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedSkills.size > 0 ? `${selectedSkills.size} skill seçildi` : 'Əlavə etmək üçün skill-ləri seçin'}
                </p>
                {selectedSkills.size > 0 && (
                  <button
                    onClick={() => setSelectedSkills(new Set())}
                    className="text-sm text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Seçimi təmizlə
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
                {suggestedSkills.map((skill, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleSkill(skill)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedSkills.has(skill)
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-sm font-medium ${
                        selectedSkills.has(skill)
                          ? 'text-brand-700 dark:text-brand-300'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {skill}
                      </span>
                      {selectedSkills.has(skill) && (
                        <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Info Box */}
          {!hasGenerated && (
            <div className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg">
              <p className="text-sm text-brand-700 dark:text-brand-300 flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AI təkliflər həm texniki, həm də soft skill-ləri əhatə edəcək.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isGenerating}
          >
            {hasGenerated ? 'Bağla' : 'Ləğv et'}
          </Button>
          
          {!hasGenerated ? (
            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="min-w-[140px]"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Yaradılır...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Təklif Al
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={selectedSkills.size === 0}
              className="min-w-[140px]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Əlavə et ({selectedSkills.size})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
