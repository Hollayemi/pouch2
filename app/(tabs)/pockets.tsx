import { useRouter } from 'expo-router';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { usePockets } from '@/context/PocketsContext';
import { PocketsScreen } from '@/screens/PocketsScreen';

export default function PocketsRoute() {
  const router = useRouter();
  const { resetDraft } = usePocketDraft();
  const { pockets } = usePockets();
  const createPocket = () => {
    resetDraft();
    router.push('/pockets/create/category');
  };
  return <PocketsScreen pockets={pockets} onCreate={createPocket} onOpenPocket={(id) => router.push({ pathname: '/pockets/[id]', params: { id } })} />;
}
