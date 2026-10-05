import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { initialPockets, pocketFromDraft } from '../data/pockets';
import type { Pocket, PocketDraft } from '../types';

type PocketsContextValue = {
  pockets: Pocket[];
  getPocketById: (id: string) => Pocket | undefined;
  createPocket: (draft: PocketDraft) => Pocket;
};

const PocketsContext = createContext<PocketsContextValue | null>(null);

export function PocketsProvider({ children }: { children: ReactNode }) {
  const [pockets, setPockets] = useState(initialPockets);

  const value = useMemo<PocketsContextValue>(() => ({
    pockets,
    getPocketById: (id) => pockets.find((pocket) => pocket.id === id),
    createPocket: (draft) => {
      const pocket = pocketFromDraft(draft);
      setPockets((current) => [pocket, ...current]);
      return pocket;
    },
  }), [pockets]);

  return <PocketsContext.Provider value={value}>{children}</PocketsContext.Provider>;
}

export function usePockets() {
  const context = useContext(PocketsContext);
  if (!context) {
    throw new Error('usePockets must be used within PocketsProvider');
  }
  return context;
}
