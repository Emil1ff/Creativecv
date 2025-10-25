import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConversationState } from '../services/aiConversationService';
import { useAuth } from './AuthContext';

export interface SavedConversation {
  id: string;
  userId: string;
  title: string;
  state: ConversationState;
  createdAt: string;
  updatedAt: string;
}

interface ConversationContextType {
  conversations: SavedConversation[];
  currentConversation: SavedConversation | null;
  saveConversation: (state: ConversationState, title?: string) => string;
  loadConversation: (id: string) => SavedConversation | null;
  deleteConversation: (id: string) => void;
  updateConversation: (id: string, state: ConversationState) => void;
  createNewConversation: () => void;
  setCurrentConversation: (id: string | null) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [currentConversation, setCurrentConv] = useState<SavedConversation | null>(null);

  // Load conversations from localStorage
  useEffect(() => {
    if (user) {
      const key = `conversations-${user.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setConversations(JSON.parse(saved));
      }
    } else {
      setConversations([]);
      setCurrentConv(null);
    }
  }, [user]);

  // Save conversations to localStorage
  const saveToStorage = (convs: SavedConversation[]) => {
    if (user) {
      const key = `conversations-${user.id}`;
      localStorage.setItem(key, JSON.stringify(convs));
      setConversations(convs);
    }
  };

  const saveConversation = (state: ConversationState, title?: string): string => {
    if (!user) return '';

    const now = new Date().toISOString();
    
    // Generate title from CV data or use provided title
    const generatedTitle = 
      title ||
      (state.cvData.personalInfo?.firstName 
        ? `${state.cvData.personalInfo.firstName} ${state.cvData.personalInfo.lastName || ''} - CV`
        : `Yeni Söhbət - ${new Date().toLocaleDateString()}`);

    if (currentConversation) {
      // Update existing conversation
      const updated = conversations.map(conv =>
        conv.id === currentConversation.id
          ? { ...conv, state, title: generatedTitle, updatedAt: now }
          : conv
      );
      saveToStorage(updated);
      
      const updatedConv = updated.find(c => c.id === currentConversation.id);
      if (updatedConv) {
        setCurrentConv(updatedConv);
      }
      
      return currentConversation.id;
    } else {
      // Create new conversation
      const newConv: SavedConversation = {
        id: Date.now().toString(),
        userId: user.id,
        title: generatedTitle,
        state,
        createdAt: now,
        updatedAt: now,
      };

      const updated = [newConv, ...conversations];
      saveToStorage(updated);
      setCurrentConv(newConv);
      
      return newConv.id;
    }
  };

  const loadConversation = (id: string): SavedConversation | null => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setCurrentConv(conv);
      return conv;
    }
    return null;
  };

  const deleteConversation = (id: string) => {
    const updated = conversations.filter(c => c.id !== id);
    saveToStorage(updated);
    
    if (currentConversation?.id === id) {
      setCurrentConv(null);
    }
  };

  const updateConversation = (id: string, state: ConversationState) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      const title = state.cvData.personalInfo?.firstName
        ? `${state.cvData.personalInfo.firstName} ${state.cvData.personalInfo.lastName || ''} - CV`
        : conv.title;
      
      const updated = conversations.map(c =>
        c.id === id
          ? { ...c, state, title, updatedAt: new Date().toISOString() }
          : c
      );
      
      saveToStorage(updated);
      
      const updatedConv = updated.find(c => c.id === id);
      if (updatedConv && currentConversation?.id === id) {
        setCurrentConv(updatedConv);
      }
    }
  };

  const createNewConversation = () => {
    setCurrentConv(null);
  };

  const setCurrentConversation = (id: string | null) => {
    if (id === null) {
      setCurrentConv(null);
    } else {
      const conv = conversations.find(c => c.id === id);
      if (conv) {
        setCurrentConv(conv);
      }
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        saveConversation,
        loadConversation,
        deleteConversation,
        updateConversation,
        createNewConversation,
        setCurrentConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
}
