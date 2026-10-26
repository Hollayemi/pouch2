import { ArrowLeft, Check, Eye, EyeOff, Fingerprint } from 'lucide-react-native';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { Page } from '../components/ui';
import { colors } from '../theme/colors';

type AuthScreenProps = {
  initialMode?: 'login' | 'signup';
  onBack: () => void;
  onDone: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
};

function AuthField({ compact = false, label, ...props }: TextInputProps & { compact?: boolean; label: string }) {
  return (
    <View className="gap-2">
      <Text className="ml-1 text-xs font-semibold leading-4 text-[#45464D]">{label}</Text>
      <TextInput
        placeholderTextColor="#76777D"
        className={`${compact ? 'h-12' : 'h-14'} rounded-lg border border-[#C6C6CD] bg-white px-4 text-sm text-[#0B1C30] focus:border-[#0058BE]`}
        {...props}
      />
    </View>
  );
}

function LoginScreen({ onBack, onDone, onForgotPassword, showSignUp }: Pick<AuthScreenProps, 'onBack' | 'onDone' | 'onForgotPassword'> & { showSignUp: () => void }) {
  const [hidden, setHidden] = useState(true);

  return (
    <Page>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="h-16 flex-row items-center px-5">
          <Pressable accessibilityLabel="Go back" onPress={onBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
            <ArrowLeft size={27} color="#000000" />
          </Pressable>
          <View className="flex-1" />
          <Text className="text-2xl font-bold tracking-tight text-black">Pouch</Text>
        </View>

        <ScrollView
          contentContainerClassName="flex-grow px-5 pb-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Welcome Back</Text>
            <Text className="mt-1 text-base leading-6 text-[#45464D]">Log in to access your safes.</Text>
          </View>

          <View className="mt-8 gap-6">
            <AuthField label="Email or Phone Number" placeholder="your@email.com" autoCapitalize="none" keyboardType="email-address" />

            <View className="gap-2">
              <View className="ml-1 flex-row items-center justify-between">
                <Text className="text-xs font-semibold leading-4 text-[#45464D]">Password</Text>
                <Pressable onPress={onForgotPassword} hitSlop={14}>
                  <Text className="text-xs font-semibold text-[#0058BE]">Forgot Password?</Text>
                </Pressable>
              </View>
              <View className="h-14 flex-row items-center rounded-lg border border-[#C6C6CD] bg-white pl-4 pr-2 focus:border-[#0058BE]">
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#76777D"
                  secureTextEntry={hidden}
                  className="h-full flex-1 text-sm text-[#0B1C30]"
                />
                <Pressable
                  accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
                  onPress={() => setHidden((current) => !current)}
                  className="h-10 w-10 items-center justify-center"
                >
                  {hidden ? <Eye size={22} color={colors.muted} /> : <EyeOff size={22} color={colors.muted} />}
                </Pressable>
              </View>
            </View>

            <Pressable onPress={onDone} className="h-14 items-center justify-center rounded-lg bg-black shadow active:opacity-80">
              <Text className="text-xl font-semibold text-white">Log In</Text>
            </Pressable>

            <Pressable accessibilityLabel="Login with biometric" className="items-center pt-4 active:opacity-70">
              <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-[#DCE9FF]">
                <Fingerprint size={34} color="#0058BE" />
              </View>
              <Text className="text-xs font-semibold text-[#45464D]">Biometric Login</Text>
            </Pressable>
          </View>

          <View className="mt-10 aspect-video w-full overflow-hidden rounded-xl bg-[#131B2E] shadow">
            <Image
              source={require('../../assets/login-vault.jpg')}
              resizeMode="cover"
              style={{ height: '100%', width: '100%' }}
            />
            <View className="absolute inset-0 bg-black/30" />
            <View className="absolute bottom-4 left-4">
              <Text className="text-xs font-semibold text-white/80">Secured with</Text>
              <Text className="mt-1 text-xl font-semibold leading-7 text-white">Military-grade Encryption</Text>
            </View>
          </View>

          <View className="mt-auto items-center pb-2 pt-12">
            <View className="flex-row items-center">
              <Text className="text-sm text-[#45464D]">New to Pouch? </Text>
              <Pressable onPress={showSignUp} hitSlop={8}>
                <Text className="text-sm font-bold text-[#0058BE]">Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
}

function SignUpScreen({ onBack, onDone, showLogin }: { onBack: () => void; onDone: () => void; showLogin: () => void }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <Page>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="h-16 flex-row items-center px-5">
          <Pressable accessibilityLabel="Go back" onPress={onBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
            <ArrowLeft size={27} color="#000000" />
          </Pressable>
          <Text className="ml-4 text-xl font-semibold text-black">Create Account</Text>
        </View>

        <ScrollView
          contentContainerClassName="flex-grow px-5 pb-6 pt-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <Text className="text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Create Account</Text>
            <Text className="mt-2 text-base leading-6 text-[#45464D]">Start your journey to financial discipline.</Text>
          </View>

          <View className="gap-6">
            <AuthField compact label="Full Name" placeholder="John Doe" autoCapitalize="words" />
            <AuthField compact label="Email Address" placeholder="name@example.com" autoCapitalize="none" keyboardType="email-address" />

            <View className="gap-2">
              <Text className="ml-1 text-xs font-semibold leading-4 text-[#45464D]">Phone Number</Text>
              <View className="h-12 flex-row gap-2">
                <View className="h-full items-center justify-center rounded-lg border border-[#C6C6CD] bg-[#EFF4FF] px-4">
                  <Text className="text-base text-[#0B1C30]">+234</Text>
                </View>
                <TextInput
                  placeholder="801 234 5678"
                  placeholderTextColor="#76777D"
                  keyboardType="phone-pad"
                  className="h-full flex-1 rounded-lg border border-[#C6C6CD] bg-white px-4 text-sm text-[#0B1C30] focus:border-[#0058BE]"
                />
              </View>
            </View>

            <Pressable onPress={() => setAccepted((current) => !current)} className="flex-row items-start gap-4 pt-2">
              <View className={`mt-0.5 h-5 w-5 items-center justify-center rounded border ${accepted ? 'border-[#0058BE] bg-[#0058BE]' : 'border-[#C6C6CD] bg-white'}`}>
                {accepted && <Check size={15} color="#FFFFFF" strokeWidth={3} />}
              </View>
              <Text className="flex-1 text-sm leading-5 text-[#45464D]">
                I agree to the <Text className="font-medium text-[#0058BE]">Terms of Service</Text> and{' '}
                <Text className="font-medium text-[#0058BE]">Privacy Policy</Text>.
              </Text>
            </Pressable>

            <Pressable onPress={onDone} className="mt-2 h-14 items-center justify-center rounded-lg bg-[#0866CE] shadow active:opacity-80">
              <Text className="text-xl font-semibold text-white">Continue</Text>
            </Pressable>
          </View>

          <View className="mt-auto items-center pb-4 pt-12">
            <View className="flex-row items-center">
              <Text className="text-sm text-[#45464D]">Already have an account? </Text>
              <Pressable onPress={showLogin} hitSlop={8}>
                <Text className="text-sm font-semibold text-[#0058BE]">Log In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
}

export function AuthScreen({ initialMode = 'login', onBack, onDone, onForgotPassword, onSignUp }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  if (mode === 'signup') {
    return <SignUpScreen onBack={onBack} onDone={onSignUp} showLogin={() => setMode('login')} />;
  }

  return <LoginScreen onBack={onBack} onDone={onDone} onForgotPassword={onForgotPassword} showSignUp={() => setMode('signup')} />;
}
