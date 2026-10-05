import { useRouter } from 'expo-router';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { ReviewScreen } from '@/screens/ReviewScreen';

export default function PocketReviewRoute() {
  const router = useRouter();
  const { draft } = usePocketDraft();
  return (
    <ReviewScreen
      draft={draft}
      onClose={() => router.replace('/(tabs)')}
      onBack={() => router.back()}
      onNext={() => router.push('/pockets/create/success')}
    />
  );
}
