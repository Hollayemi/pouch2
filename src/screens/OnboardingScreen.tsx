import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Brand, Page, PrimaryButton } from '../components/ui';
import { onboardingSlides } from '../data';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const slide = onboardingSlides[index];
  const isLast = index === onboardingSlides.length - 1;

  return <Page><ScrollView contentContainerStyle={styles.onboard} showsVerticalScrollIndicator={false}>
    <View style={styles.brandBar}>
      <Pressable disabled={!index} onPress={() => setIndex(index - 1)} style={[styles.iconButton, !index && { opacity: 0 }]}><ArrowLeft size={25} color={colors.ink} /></Pressable>
      <Brand />
      <View style={styles.iconButton} />
    </View>
    <View style={styles.hero}>
      <Image source={slide.image} resizeMode="cover" style={styles.heroImage} />
      <View style={styles.heroOverlay}>
        <View style={styles.heroBadge}><ShieldCheck size={21} color={colors.ink} /></View>
        <View style={{ flex: 1 }}><Text style={styles.heroEyebrow}>{slide.eyebrow}</Text><Text style={styles.heroLabel}>{isLast ? 'PEACE OF MIND' : 'SAFEGUARD'}</Text></View>
      </View>
    </View>
    <Text style={styles.onboardTitle}>{slide.title}</Text>
    <Text style={styles.onboardBody}>{slide.body}</Text>
    <View style={styles.dots}>{onboardingSlides.map((_, dot) => <View key={dot} style={[styles.dot, dot === index && styles.dotActive]} />)}</View>
    <PrimaryButton label={isLast ? 'Get Started' : 'Continue'} icon={ArrowRight} dark={isLast} onPress={() => isLast ? onDone() : setIndex(index + 1)} />
    <Pressable onPress={onDone} style={styles.textButton}><Text style={styles.textButtonLabel}>Sign In Instead</Text></Pressable>
  </ScrollView></Page>;
}
