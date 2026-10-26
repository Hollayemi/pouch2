import { ArrowLeft, Info, LockKeyhole, Mail, RotateCcw } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Page } from '../components/ui';

type ForgotPasswordScreenProps = {
  onBack: () => void;
};

export function ForgotPasswordScreen({ onBack }: ForgotPasswordScreenProps) {
  const [sent, setSent] = useState(false);

  return (
    <Page>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="h-16 flex-row items-center px-5">
          <Pressable accessibilityLabel="Back to login" onPress={onBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
            <ArrowLeft size={27} color="#000000" />
          </Pressable>
        </View>

        <ScrollView contentContainerClassName="flex-grow items-center px-5 pb-8 pt-12" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="relative mb-8 h-20 w-20 items-center justify-center rounded-2xl bg-[#E5EEFF]">
            <RotateCcw size={42} color="#0058BE" strokeWidth={2.5} />
            <View className="absolute h-7 w-7 items-center justify-center rounded-full bg-[#E5EEFF]">
              <LockKeyhole size={19} color="#0058BE" fill="#0058BE" />
            </View>
          </View>

          <View className="mb-10 w-full items-center">
            <Text className="text-center text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Reset Password</Text>
            <Text className="mt-1 px-2 text-center text-sm leading-5 text-[#45464D]">Enter your email address to receive a reset link.</Text>
          </View>

          <View className="w-full gap-2">
            <Text className="ml-1 text-xs font-semibold leading-4 text-[#45464D]">Email Address</Text>
            <View className="h-14 flex-row items-center rounded-lg border border-[#C6C6CD] bg-white px-4">
              <Mail size={21} color="#76777D" />
              <TextInput
                placeholder="name@company.com"
                placeholderTextColor="#76777D"
                autoCapitalize="none"
                keyboardType="email-address"
                className="h-full flex-1 pl-4 text-base text-[#0B1C30]"
              />
            </View>
          </View>

          <Pressable onPress={() => setSent(true)} className="mt-6 h-14 w-full items-center justify-center rounded-lg bg-[#0866CE] shadow active:opacity-80">
            <Text className="text-xl font-semibold text-white">{sent ? 'Resend Link' : 'Send Reset Link'}</Text>
          </Pressable>

          <View className={`mt-8 w-full flex-row items-start gap-4 rounded-xl border border-[#C6C6CD]/30 bg-[#EFF4FF] p-4 ${sent ? 'border-[#0058BE]/30' : ''}`}>
            <Info size={22} color="#7C839B" />
            <Text className="flex-1 text-sm leading-6 text-[#7C839B]">Check your inbox for the link to create a new password.</Text>
          </View>

          <View className="mt-12 flex-row items-center">
            <Text className="text-sm text-[#45464D]">Remember your password? </Text>
            <Pressable onPress={onBack} hitSlop={8}>
              <Text className="text-sm font-semibold text-[#0058BE]">Back to Login</Text>
            </Pressable>
          </View>

          <View className="mt-auto flex-row gap-5 pt-16">
            <View className="h-2 w-2 rounded-full bg-[#C6C6CD]/50" />
            <View className="h-2 w-2 rounded-full bg-[#C6C6CD]/50" />
            <View className="h-2 w-2 rounded-full bg-[#C6C6CD]/50" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
}
