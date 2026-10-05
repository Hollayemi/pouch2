import { useRouter } from 'expo-router';
import { AuthScreen } from '@/screens/AuthScreen';

export default function AuthRoute() {
  const router = useRouter();
  return <AuthScreen onDone={() => router.replace('/(tabs)')} />;
}
