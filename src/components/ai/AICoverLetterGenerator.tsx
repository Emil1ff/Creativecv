import { useState } from 'react';
import { useAI } from '../../context/AIContext';
import Button from '../ui/button/Button';

interface AICoverLetterGeneratorProps {
  cvData: any;
  onGenerated: (coverLetter: string) => void;
  onClose: () => void;
}

export default function AICoverLetterGenerator({ cvData, onClose }: AICoverLetterGeneratorProps) {
  const { generateCoverLetter, isGenerating, error } = useAI();
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim() || !companyName.trim()) return;

    try {
      const result = await generateCoverLetter(cvData, jobDescription, companyName);
      setCoverLetter(result);
      setHasGenerated(true);
    } catch (err) {
      console.error('Cover letter generation failed:', err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${companyName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              AI Cover Letter Generator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              CV əsasında peşəkar cover letter yaradın
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
            /* Input Form */
            <>
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Şirkət Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="məsələn: Google, Microsoft, Tesla"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İş Təsviri <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="İş elanını və ya əsas tələbləri buraya yapışdırın..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Daha uyğun cover letter üçün iş elanını daxil edin
                </p>
              </div>

              {/* CV Info Preview */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CV məlumatları:
                </p>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>👤 {cvData?.personalInfo?.firstName} {cvData?.personalInfo?.lastName}</p>
                  <p>💼 {cvData?.personalInfo?.title || 'No title'}</p>
                  <p>🎯 {cvData?.skills?.length || 0} skill</p>
                  <p>💻 {cvData?.workExperience?.length || 0} iş təcrübəsi</p>
                </div>
              </div>
            </>
          ) : (
            /* Generated Cover Letter */
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Yaradılan Cover Letter
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Kopyala
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Yüklə
                  </button>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg max-h-[500px] overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {coverLetter}
                  </pre>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cover letter uğurla yaradıldı! Zəhmət olmasa nəzərdən keçirin və lazım olduqda düzəliş edin.
                </p>
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
                AI sizin CV məlumatlarınızı və iş elanını analiz edərək şəxsiləşdirilmiş cover letter yaradacaq.
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
          
          {!hasGenerated && (
            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={!jobDescription.trim() || !companyName.trim() || isGenerating}
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
                  Yarat
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
