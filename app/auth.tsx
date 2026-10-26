import { useLocalSearchParams, useRouter } from 'expo-router';
import { AuthScreen } from '@/screens/AuthScreen';

export default function AuthRoute() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const enterApp = () => {
    router.dismissAll();
    router.replace('/(tabs)');
  };

  return (
    <AuthScreen
      initialMode={mode === 'signup' ? 'signup' : 'login'}
      onBack={() => router.canGoBack() ? router.back() : router.replace('/welcome')}
      onDone={enterApp}
      onForgotPassword={() => router.push('/forgot-password')}
      onSignUp={() => router.push({ pathname: '/otp', params: { purpose: 'signup' } })}
    />
  );
}
