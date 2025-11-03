import { createContext, useContext, useState, ReactNode } from 'react';
import { CvData } from '../components/cv/CvWizard';

interface CvItem {
  id: string;
  title: string;
  template: string;
  data: CvData;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  downloads?: number;
}

interface CvContextType {
  cvs: CvItem[];
  createCv: (cvData: CvData) => string;
  updateCv: (id: string, cvData: CvData) => void;
  deleteCv: (id: string) => void;
  duplicateCv: (id: string) => string;
  getCv: (id: string) => CvItem | undefined;
  loading: boolean;
}

const CvContext = createContext<CvContextType | undefined>(undefined);

export const useCv = () => {
  const context = useContext(CvContext);
  if (context === undefined) {
    throw new Error('useCv must be used within a CvProvider');
  }
  return context;
};

interface CvProviderProps {
  children: ReactNode;
}

export const CvProvider = ({ children }: CvProviderProps) => {
  const [cvs, setCvs] = useState<CvItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load CVs from localStorage on mount
  useState(() => {
    const savedCvs = localStorage.getItem('user-cvs');
    if (savedCvs) {
      setCvs(JSON.parse(savedCvs));
    }
  });

  // Save CVs to localStorage whenever cvs change
  const saveCvs = (newCvs: CvItem[]) => {
    localStorage.setItem('user-cvs', JSON.stringify(newCvs));
    setCvs(newCvs);
  };

  const createCv = (cvData: CvData): string => {
    setLoading(true);
    
    const newCv: CvItem = {
      id: Date.now().toString(),
      title: `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName} - CV`,
      template: cvData.selectedTemplate,
      data: cvData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedCvs = [...cvs, newCv];
    saveCvs(updatedCvs);
    setLoading(false);
    return newCv.id;
  };

  const updateCv = (id: string, cvData: CvData) => {
    setLoading(true);
    
    const updatedCvs = cvs.map(cv => 
      cv.id === id 
        ? { 
            ...cv, 
            data: cvData, 
            title: `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName} - CV`,
            updatedAt: new Date().toISOString() 
          }
        : cv
    );
    
    saveCvs(updatedCvs);
    setLoading(false);
  };

  const deleteCv = (id: string) => {
    setLoading(true);
    const updatedCvs = cvs.filter(cv => cv.id !== id);
    saveCvs(updatedCvs);
    setLoading(false);
  };

  const duplicateCv = (id: string): string => {
    setLoading(true);
    
    const originalCv = cvs.find(cv => cv.id === id);
    if (!originalCv) {
      setLoading(false);
      return '';
    }

    const duplicatedCv: CvItem = {
      ...originalCv,
      id: Date.now().toString(),
      title: `${originalCv.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedCvs = [...cvs, duplicatedCv];
    saveCvs(updatedCvs);
    setLoading(false);
    return duplicatedCv.id;
  };

  const getCv = (id: string): CvItem | undefined => {
    return cvs.find(cv => cv.id === id);
  };

  const value = {
    cvs,
    createCv,
    updateCv,
    deleteCv,
    duplicateCv,
    getCv,
    loading
  };

  return (
    <CvContext.Provider value={value}>
      {children}
    </CvContext.Provider>
  );
};

