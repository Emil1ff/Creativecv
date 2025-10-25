import { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import Button from '../../components/ui/button/Button';
import { AICVGenerator, AITextEnhancer, AISkillsSuggestion, AICoverLetterGenerator } from '../../components/ai';
import { useCv } from '../../context/CvContext';

export default function AIDemo() {
  const { cvs } = useCv();
  const [activeModal, setActiveModal] = useState<'cv' | 'text' | 'skills' | 'cover' | null>(null);
  
  // Demo data
  const demoCV = cvs.length > 0 ? cvs[0] : {
    personalInfo: { firstName: 'John', lastName: 'Doe', title: 'Developer' },
    skills: ['React', 'TypeScript'],
    workExperience: [],
  };

  const aiFeatures = [
    {
      id: 'cv',
      title: 'AI CV Generator',
      description: 'İş təsviri əsasında avtomatik CV yaradın',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'text',
      title: 'AI Text Enhancer',
      description: 'Mövcud mətnləri peşəkar şəkildə təkmilləşdirin',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'skills',
      title: 'AI Skills Suggestion',
      description: 'Peşəyə uyğun skill təklifləri alın',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 'cover',
      title: 'AI Cover Letter',
      description: 'CV əsasında cover letter yaradın',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <>
      <PageMeta title="AI Demo - Creative CV" description="Test AI features" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Features Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Groq AI ilə CV yaratma prosesini avtomatlaşdırın. Aşağıdakı AI funksiyalarını test edin.
          </p>
        </div>

        {/* API Key Check */}
        <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Groq API Key tələb olunur
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
                AI funksiyalarını istifadə etmək üçün .env faylında <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded">VITE_GROQ_API_KEY</code> əlavə edin.
              </p>
              <a 
                href="https://console.groq.com/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
              >
                Groq API Key al →
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {aiFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-brand-300 dark:hover:border-brand-700 transition-all hover:shadow-xl"
            >
              {/* Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-2xl transition-opacity`}></div>
              
              {/* Content */}
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 text-white`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveModal(feature.id as any)}
                  className="w-full group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 group-hover:border-brand-500 dark:group-hover:border-brand-500 group-hover:text-brand-600 dark:group-hover:text-brand-400"
                >
                  Test Et
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation Link */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Ətraflı məlumat üçün <a href="/AI_FEATURES.md" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">AI_FEATURES.md</a> faylına baxın
            </span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'cv' && (
        <AICVGenerator
          onGenerated={(data) => {
            console.log('Generated CV:', data);
            alert('CV yaradıldı! Console-da görə bilərsiniz.');
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'text' && (
        <AITextEnhancer
          text="I am a developer with experience in web development. I have worked on multiple projects."
          context="summary"
          onEnhanced={(text) => {
            console.log('Enhanced text:', text);
            alert('Mətn təkmilləşdirildi!');
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'skills' && (
        <AISkillsSuggestion
          jobTitle="Frontend Developer"
          existingSkills={demoCV.skills || []}
          onSelected={(skills) => {
            console.log('Selected skills:', skills);
            alert(`${skills.length} skill seçildi!`);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'cover' && (
        <AICoverLetterGenerator
          cvData={demoCV}
          onGenerated={(letter) => {
            console.log('Cover letter:', letter);
            alert('Cover letter yaradıldı!');
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
