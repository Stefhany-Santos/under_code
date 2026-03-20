'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'guest' | 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<Exclude<UserRole, 'guest'>, User> = {
  customer: {
    id: 'cust-001',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    avatar: undefined,
    role: 'customer',
  },
  admin: {
    id: 'admin-001',
    name: 'Admin Under Code',
    email: 'admin@undercode.com',
    avatar: undefined,
    role: 'admin',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');

  const login = (role: UserRole) => {
    if (role === 'guest') {
      setUser(null);
      setUserRole('guest');
    } else {
      setUser(mockUsers[role]);
      setUserRole(role);
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole('guest');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAuthenticated: userRole !== 'guest',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
