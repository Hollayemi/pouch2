import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { hasCompletedOnboarding, markOnboardingCompleted } from '@/storage/onboarding';
import { colors } from '@/theme/colors';

export default function OnboardingRoute() {
  const [completed, setCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    if (__DEV__) {
      setCompleted(false);
      return () => {
        active = false;
      };
    }

    hasCompletedOnboarding()
      .then((value) => {
        if (active) setCompleted(value);
      })
      .catch(() => {
        if (active) setCompleted(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const completeOnboarding = async () => {
    try {
      if (!__DEV__) await markOnboardingCompleted();
    } finally {
      setCompleted(true);
    }
  };

  if (completed === null) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-canvas">
        <Text className="text-3xl font-extrabold text-black">Pouch</Text>
        <ActivityIndicator color={colors.blue} />
      </View>
    );
  }

  if (completed) return <Redirect href="/welcome" />;

  return <OnboardingScreen onDone={completeOnboarding} />;
}
