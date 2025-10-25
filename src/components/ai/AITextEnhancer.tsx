import { useState } from 'react';
import { useAI } from '../../context/AIContext';
import Button from '../ui/button/Button';

interface AITextEnhancerProps {
  text: string;
  context: 'summary' | 'experience' | 'education' | 'skills';
  onEnhanced: (enhancedText: string) => void;
  onClose: () => void;
}

export default function AITextEnhancer({ text, context, onEnhanced, onClose }: AITextEnhancerProps) {
  const { enhanceText, isGenerating, error } = useAI();
  const [enhancedText, setEnhancedText] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const contextLabels = {
    summary: 'Professional Summary',
    experience: 'İş Təcrübəsi',
    education: 'Təhsil',
    skills: 'Bacarıqlar',
  };

  const handleEnhance = async () => {
    try {
      const result = await enhanceText({ text, context });
      setEnhancedText(result);
      setShowComparison(true);
    } catch (err) {
      console.error('Text enhancement failed:', err);
    }
  };

  const handleAccept = () => {
    onEnhanced(enhancedText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              AI Mətn Təkmilləşdiricisi
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {contextLabels[context]} mətnini peşəkar şəkildə təkmilləşdirin
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
          {!showComparison ? (
            /* Initial View */
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Orijinal Mətn
              </label>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{text}</p>
              </div>
            </div>
          ) : (
            /* Comparison View */
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Orijinal
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {text.length} simvol
                  </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg h-64 overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{text}</p>
                </div>
              </div>

              {/* Enhanced */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Təkmilləşdirilmiş
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {enhancedText.length} simvol
                  </span>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg h-64 overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{enhancedText}</p>
                </div>
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
          {!showComparison && (
            <div className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg">
              <p className="text-sm text-brand-700 dark:text-brand-300 flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AI mətnizi daha peşəkar, aydın və təsirli edəcək.
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
            {showComparison ? 'İmtina et' : 'Ləğv et'}
          </Button>
          
          {!showComparison ? (
            <Button
              variant="primary"
              onClick={handleEnhance}
              disabled={isGenerating}
              className="min-w-[140px]"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Təkmilləşdirilir...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Təkmilləşdir
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleAccept}
              className="min-w-[140px]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Qəbul et
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
