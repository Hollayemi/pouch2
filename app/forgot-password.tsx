import { useRouter } from 'expo-router';
import { ForgotPasswordScreen } from '@/screens/ForgotPasswordScreen';

export default function ForgotPasswordRoute() {
  const router = useRouter();
  return (
    <ForgotPasswordScreen
      onBack={() => router.canGoBack() ? router.back() : router.replace({ pathname: '/auth', params: { mode: 'login' } })}
    />
  );
}
