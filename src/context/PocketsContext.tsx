import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { initialPockets, pocketFromDraft } from '../data/pockets';
import { walletAccount } from '../data/wallet';
import type { Pocket, PocketDraft } from '../types';
import { getDraftSchedule } from '../utils/schedule';

type PocketsContextValue = {
  pockets: Pocket[];
  walletBalanceKobo: number;
  getPocketById: (id: string) => Pocket | undefined;
  createPocket: (draft: PocketDraft) => Pocket | null;
};

const PocketsContext = createContext<PocketsContextValue | null>(null);

export function PocketsProvider({ children }: { children: ReactNode }) {
  const [pockets, setPockets] = useState(initialPockets);
  const [walletBalanceKobo, setWalletBalanceKobo] = useState<number>(walletAccount.balanceKobo);

  const value = useMemo<PocketsContextValue>(() => ({
    pockets,
    walletBalanceKobo,
    getPocketById: (id) => pockets.find((pocket) => pocket.id === id),
    createPocket: (draft) => {
      const targetAmountKobo = getDraftSchedule(draft).targetAmountKobo;
      if (targetAmountKobo <= 0 || targetAmountKobo > walletBalanceKobo) return null;

      const pocket = pocketFromDraft({ ...draft, fundingSource: 'wallet' });
      setPockets((current) => [pocket, ...current]);
      setWalletBalanceKobo((current) => current - targetAmountKobo);
      return pocket;
    },
  }), [pockets, walletBalanceKobo]);

  return <PocketsContext.Provider value={value}>{children}</PocketsContext.Provider>;
}

export function usePockets() {
  const context = useContext(PocketsContext);
  if (!context) {
    throw new Error('usePockets must be used within PocketsProvider');
  }
  return context;
}
