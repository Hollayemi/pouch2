import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { usePockets } from '@/context/PocketsContext';
import { SuccessScreen } from '@/screens/SuccessScreen';

export default function PocketSuccessRoute() {
  const router = useRouter();
  const { draft, resetDraft } = usePocketDraft();
  const { createPocket } = usePockets();
  const created = useRef(false);
  const finish = () => {
    if (created.current) return;
    created.current = true;
    createPocket(draft);
    resetDraft();
    router.replace('/pockets');
  };
  return <SuccessScreen draft={draft} onDone={finish} />;
}
