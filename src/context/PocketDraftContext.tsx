import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialDraft } from '../data';
import type { PocketDraft } from '../types';

type PocketDraftContextValue = {
  draft: PocketDraft;
  setDraft: (draft: PocketDraft) => void;
  resetDraft: () => void;
};

const PocketDraftContext = createContext<PocketDraftContextValue | null>(null);

export function PocketDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<PocketDraft>(initialDraft);
  const resetDraft = () => setDraft(initialDraft);

  return (
    <PocketDraftContext.Provider value={{ draft, setDraft, resetDraft }}>
      {children}
    </PocketDraftContext.Provider>
  );
}

export function usePocketDraft() {
  const context = useContext(PocketDraftContext);
  if (!context) {
    throw new Error('usePocketDraft must be used within PocketDraftProvider');
  }
  return context;
}
