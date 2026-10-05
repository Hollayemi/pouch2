import { useRouter } from 'expo-router';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { usePockets } from '@/context/PocketsContext';
import { HomeScreen } from '@/screens/HomeScreen';

export default function HomeRoute() {
  const router = useRouter();
  const { resetDraft } = usePocketDraft();
  const { pockets } = usePockets();
  const createPocket = () => {
    resetDraft();
    router.push('/pockets/create/category');
  };
  return <HomeScreen pockets={pockets} onNewPocket={createPocket} onOpenPocket={(id) => router.push({ pathname: '/pockets/[id]', params: { id } })} onActivity={() => router.push('/activity')} />;
}
