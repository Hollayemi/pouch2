import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { PocketDraftProvider } from '@/context/PocketDraftContext';
import { PocketsProvider } from '@/context/PocketsContext';
import { UserProvider } from '@/context/UserContext';
import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <UserProvider>
        <PocketsProvider>
          <PocketDraftProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ gestureEnabled: false }} />
              <Stack.Screen name="welcome" options={{ gestureEnabled: false }} />
              <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
            </Stack>
          </PocketDraftProvider>
        </PocketsProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
