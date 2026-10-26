import { useRouter } from 'expo-router';
import { WelcomeScreen } from '@/screens/WelcomeScreen';

export default function WelcomeRoute() {
  const router = useRouter();

  return (
    <WelcomeScreen
      onLogin={() => router.push({ pathname: '/auth', params: { mode: 'login' } })}
      onSignUp={() => router.push({ pathname: '/auth', params: { mode: 'signup' } })}
    />
  );
}
