import { ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Brand, Field, Page, PrimaryButton, SecureNote, Subtitle, Title } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';

export function AuthScreen({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [hidden, setHidden] = useState(true);
  return <Page><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.fill}>
    <ScrollView contentContainerStyle={styles.auth} keyboardShouldPersistTaps="handled">
      <View style={styles.authMark}><ShieldCheck size={32} color="#FFF" /></View><Brand />
      <View style={styles.authHeading}><Title>{mode === 'signin' ? 'Welcome back' : 'Start protecting your money'}</Title><Subtitle>{mode === 'signin' ? 'Sign in to check your Pockets and upcoming releases.' : 'Create your account in less than a minute.'}</Subtitle></View>
      <View style={styles.segmented}>{(['signin', 'signup'] as const).map(item => <Pressable key={item} onPress={() => setMode(item)} style={[styles.segment, mode === item && styles.segmentActive]}><Text style={[styles.segmentText, mode === item && styles.segmentTextActive]}>{item === 'signin' ? 'Sign In' : 'Create Account'}</Text></Pressable>)}</View>
      <View style={styles.form}>
        {mode === 'signup' && <Field label="Full name" placeholder="Tunde Adebayo" />}
        <Field label="Phone number" placeholder="0801 234 5678" keyboardType="phone-pad" />
        <View><Text style={styles.fieldLabel}>Password</Text><View style={styles.inputShell}><TextInput placeholder="Enter your password" placeholderTextColor="#98A2B3" secureTextEntry={hidden} style={styles.input} /><Pressable onPress={() => setHidden(!hidden)}>{hidden ? <Eye size={20} color={colors.muted} /> : <EyeOff size={20} color={colors.muted} />}</Pressable></View></View>
      </View>
      <PrimaryButton label={mode === 'signin' ? 'Sign In' : 'Create Account'} icon={ArrowRight} onPress={onDone} />
      <SecureNote text="Your details are encrypted and protected" />
    </ScrollView>
  </KeyboardAvoidingView></Page>;
}
