import { useLocalSearchParams, useRouter } from 'expo-router';
import { OtpScreen } from '@/screens/OtpScreen';

export default function OtpRoute() {
  const router = useRouter();
  const { purpose } = useLocalSearchParams<{ purpose?: string }>();
  const backTarget = purpose === 'signup' ? { pathname: '/auth' as const, params: { mode: 'signup' } } : { pathname: '/forgot-password' as const };
  const finishVerification = () => {
    router.dismissAll();
    router.replace({ pathname: '/auth', params: { mode: 'login' } });
  };

  return (
    <OtpScreen
      onBack={() => router.canGoBack() ? router.back() : router.replace(backTarget)}
      onVerified={finishVerification}
    />
  );
}
