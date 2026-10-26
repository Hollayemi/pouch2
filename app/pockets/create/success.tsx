import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { SuccessScreen } from '@/screens/SuccessScreen';

export default function PocketSuccessRoute() {
  const router = useRouter();
  const { draft, resetDraft } = usePocketDraft();
  const finished = useRef(false);
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    resetDraft();
    router.dismissAll();
    router.replace('/pockets');
  };
  return <SuccessScreen draft={draft} onDone={finish} />;
}
