import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { userProfile } from '../data/user';
import type { KycStatus } from '../types';

type UserContextValue = {
  kycStatus: KycStatus;
  isKycVerified: boolean;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const value = useMemo<UserContextValue>(() => ({
    kycStatus: userProfile.kycStatus,
    isKycVerified: userProfile.kycStatus === 'verified',
  }), []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
