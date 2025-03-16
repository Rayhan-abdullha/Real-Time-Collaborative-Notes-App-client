'use client';
import React, { createContext, useReducer, useContext } from 'react';
import Cookies from 'js-cookie';
type AuthState = {
  email: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  email: null,
  isAuthenticated: false,
};

type AuthAction =
  | { type: 'SET_AUTH', payload: { email: string } }
  | { type: 'LOGOUT' };

const AuthContext = createContext<{ state: AuthState, dispatch: React.Dispatch<AuthAction> } | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
      case 'SET_AUTH':
      return {
        ...state,
        email: action.payload.email,
        isAuthenticated: true,
      };
      case 'LOGOUT':
          const token = Cookies.get('accessToken');
          if (token) {
              Cookies.remove('accessToken');
          }
          return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
