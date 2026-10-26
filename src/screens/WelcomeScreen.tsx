import { Shield } from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Page } from '../components/ui';

type WelcomeScreenProps = {
  onLogin: () => void;
  onSignUp: () => void;
};

export function WelcomeScreen({ onLogin, onSignUp }: WelcomeScreenProps) {
  return (
    <Page>
      <ScrollView contentContainerClassName="flex-grow items-center justify-between px-5 pb-8 pt-12" showsVerticalScrollIndicator={false}>
        <View className="items-center gap-2">
          <View className="mb-4 h-12 w-12 items-center justify-center rounded-xl bg-black shadow">
            <Shield size={28} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold tracking-tight text-black">Pouch</Text>
        </View>

        <View className="relative aspect-square w-full max-w-[360px] items-center justify-center">
          <View className="absolute h-64 w-64 rounded-full border-2 border-[#C6C6CD]/20" />
          <View className="absolute h-48 w-48 rounded-full border border-[#C6C6CD]/20" />
          <Image source={require('../../assets/welcome-art.jpg')} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
        </View>

        <View className="w-full items-center px-4">
          <Text className="text-center text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Welcome to Pouch</Text>
          <Text className="mt-4 text-center text-base leading-6 text-[#45464D]">Join thousands protecting their future today.</Text>
        </View>

        <View className="w-full gap-4">
          <Pressable onPress={onSignUp} className="h-14 items-center justify-center rounded-lg bg-[#0866CE] shadow active:opacity-80">
            <Text className="text-xs font-semibold text-white">Create an Account</Text>
          </Pressable>
          <Pressable onPress={onLogin} className="h-14 items-center justify-center rounded-lg border border-[#C6C6CD] bg-white active:bg-[#EFF4FF]">
            <Text className="text-xs font-semibold text-[#0B1C30]">Log In</Text>
          </Pressable>
        </View>

        <Text className="max-w-[330px] text-center text-[11px] leading-[18px] text-[#76777D]">
          By continuing, you agree to our <Text className="font-semibold text-[#0058BE] underline">Terms</Text> and{' '}
          <Text className="font-semibold text-[#0058BE] underline">Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </Page>
  );
}
