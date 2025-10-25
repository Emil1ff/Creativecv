import { createContext, useContext, useState, ReactNode } from 'react';
import * as groqService from '../services/groqService';

interface AIContextType {
  isGenerating: boolean;
  error: string | null;
  generateCV: (data: groqService.CVData) => Promise<any>;
  enhanceText: (options: groqService.EnhanceTextOptions) => Promise<string>;
  suggestSkills: (jobTitle: string, existingSkills?: string[]) => Promise<string[]>;
  generateCoverLetter: (cvData: any, jobDescription: string, companyName: string) => Promise<string>;
  clearError: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCV = async (data: groqService.CVData) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await groqService.generateCVContent(data);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate CV';
      setError(message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const enhanceText = async (options: groqService.EnhanceTextOptions) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await groqService.enhanceText(options);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to enhance text';
      setError(message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestSkills = async (jobTitle: string, existingSkills: string[] = []) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await groqService.suggestSkills(jobTitle, existingSkills);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to suggest skills';
      setError(message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCoverLetter = async (cvData: any, jobDescription: string, companyName: string) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await groqService.generateCoverLetter(cvData, jobDescription, companyName);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate cover letter';
      setError(message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AIContext.Provider
      value={{
        isGenerating,
        error,
        generateCV,
        enhanceText,
        suggestSkills,
        generateCoverLetter,
        clearError,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
