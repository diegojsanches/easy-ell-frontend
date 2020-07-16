import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

export interface UserData {
  id: string;
  name: string;
  email: string;
  manager: boolean;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: UserData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@EasySell:token');
    const user = localStorage.getItem('@EasySell:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@EasySell:token', token);
    localStorage.setItem('@EasySell:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@EasySell:token');
    localStorage.removeItem('@EasySell:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
