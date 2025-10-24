import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Fake login function - accepts any email/password combination
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fake authentication - accept any non-empty email and password
    if (email.trim() && password.trim()) {
      const fakeUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
      };
      
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  // Fake registration function
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fake registration - accept any non-empty data
    if (email.trim() && password.trim() && name.trim()) {
      const fakeUser: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };
      
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  // Fake Google login
  const googleLogin = async (): Promise<boolean> => {
    setLoading(true);
    
    // Simulate Google OAuth delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fakeUser: User = {
      id: 'google_' + Date.now().toString(),
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4'
    };
    
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing user on mount
  useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    googleLogin,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
