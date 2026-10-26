import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { usePockets } from '@/context/PocketsContext';
import { useUser } from '@/context/UserContext';
import { CreatePocketScreen } from '@/screens/CreatePocketScreen';

export default function CreatePocketRoute() {
  const router = useRouter();
  const { draft, setDraft } = usePocketDraft();
  const { createPocket, walletBalanceKobo } = usePockets();
  const { isKycVerified } = useUser();
  const creating = useRef(false);

  const handleCreate = () => {
    if (creating.current || !isKycVerified) return;
    creating.current = true;

    const fundedDraft = { ...draft, fundingSource: 'wallet' as const };
    const pocket = createPocket(fundedDraft);
    if (!pocket) {
      creating.current = false;
      return;
    }

    setDraft(fundedDraft);
    router.push('/pockets/create/success');
  };

  return (
    <CreatePocketScreen
      draft={draft}
      setDraft={setDraft}
      walletBalanceKobo={walletBalanceKobo}
      kycVerified={isKycVerified}
      onKycRequired={() => router.navigate('/(tabs)/profile')}
      onClose={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}
      onCreate={handleCreate}
    />
  );
}
