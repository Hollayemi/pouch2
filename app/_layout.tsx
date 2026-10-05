import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { PocketDraftProvider } from '@/context/PocketDraftContext';
import { PocketsProvider } from '@/context/PocketsContext';
import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PocketsProvider>
        <PocketDraftProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </PocketDraftProvider>
      </PocketsProvider>
    </SafeAreaProvider>
  );
}
