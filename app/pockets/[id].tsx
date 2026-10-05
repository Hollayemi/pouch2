import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { usePockets } from '@/context/PocketsContext';
import { PocketScreen } from '@/screens/PocketScreen';

export default function PocketDetailsRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPocketById } = usePockets();
  const pocket = getPocketById(id);

  if (!pocket) {
    return <Redirect href="/pockets" />;
  }

  return <PocketScreen pocket={pocket} onBack={() => router.back()} />;
}
