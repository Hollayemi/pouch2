import { useRouter } from 'expo-router';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { DetailsScreen } from '@/screens/DetailsScreen';

export default function PocketDetailsRoute() {
  const router = useRouter();
  const { draft, setDraft } = usePocketDraft();
  return <DetailsScreen draft={draft} setDraft={setDraft} onBack={() => router.back()} onNext={() => router.push('/pockets/create/review')} />;
}
