import { useRouter } from 'expo-router';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { CategoryScreen } from '@/screens/CategoryScreen';

export default function PocketCategoryRoute() {
  const router = useRouter();
  const { draft, setDraft } = usePocketDraft();
  return (
    <CategoryScreen
      draft={draft}
      setDraft={setDraft}
      onClose={() => router.replace('/(tabs)')}
      onNext={() => router.push('/pockets/create/details')}
    />
  );
}
