import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BusFront,
  ChevronRight,
  PiggyBank,
  ShieldCheck,
  Utensils,
  Zap,
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewInstance,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Page } from '../components/ui';
import { colors } from '../theme/colors';

const SLIDE_COUNT = 4;

type SlideProps = {
  activeIndex: number;
  goBack: () => void;
  goNext: () => void;
  skip: () => void;
};

function ProgressDot({ active }: { active: boolean }) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, {
      duration: 480,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#D1D3D9', '#111111']),
    borderRadius: 999,
    height: 8,
    opacity: interpolate(progress.value, [0, 1], [0.72, 1]),
    width: interpolate(progress.value, [0, 1], [8, 21]),
  }));

  return <Animated.View style={animatedStyle} />;
}

function ProgressDots({ active }: { active: number }) {
  return (
    <View className="flex-row items-center justify-center gap-2.5">
      {Array.from({ length: SLIDE_COUNT }, (_, dot) => (
        <ProgressDot key={dot} active={dot === active} />
      ))}
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  blue = false,
  chevron = false,
}: {
  label: string;
  onPress: () => void;
  blue?: boolean;
  chevron?: boolean;
}) {
  const Icon = chevron ? ChevronRight : ArrowRight;
  return (
    <Pressable
      onPress={onPress}
      className={`h-14 flex-row items-center justify-center gap-3 rounded-xl shadow ${blue ? 'bg-[#0866CE]' : 'bg-black'} active:opacity-80`}
    >
      <Text className="text-xl font-semibold text-white">{label}</Text>
      <Icon size={25} color="#FFFFFF" strokeWidth={2.4} />
    </Pressable>
  );
}

function ProtectionSlide({ activeIndex, goNext, skip }: SlideProps) {
  return (
    <ScrollView contentContainerClassName="flex-grow px-5 pb-8 pt-3" showsVerticalScrollIndicator={false}>
      <View className="h-12 flex-row items-center justify-end">
        <Pressable onPress={skip} className="min-h-11 min-w-16 items-center justify-center px-4">
          <Text className="text-xs font-semibold text-[#45464D]">Skip</Text>
        </Pressable>
      </View>

      <View className="mt-4 aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-[#0B1330] shadow">
        <Image source={require('../../assets/onboarding-protection.png')} resizeMode="contain" className="h-full w-full" style={{ height: '100%', width: '100%' }} />
        <View className="absolute right-6 top-6 h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20">
          <ShieldCheck size={23} color="#FFFFFF" fill="rgba(255,255,255,0.18)" />
        </View>
      </View>

      <View className="items-center pt-8">
        <View className="rounded-full bg-[#DCE9FF] px-4 py-1">
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#0058BE]">Onboarding</Text>
        </View>
        <Text className="mt-3 text-center text-[28px] font-bold leading-9 tracking-tight text-black">Protect your essentials</Text>
        <Text className="mt-3 max-w-[310px] text-center text-base leading-6 text-[#45464D]">
          Never spend your rent or feeding money by mistake again. Lock away funds for what matters most.
        </Text>
      </View>

      <View className="mt-auto pt-10">
        <ProgressDots active={activeIndex} />
        <View className="mt-8">
          <ActionButton label="Next" onPress={goNext} />
        </View>
      </View>
    </ScrollView>
  );
}

function AllocationSlide({ activeIndex, goBack, goNext, skip }: SlideProps) {
  const { width } = useWindowDimensions();
  const heroWidth = Math.max(0, Math.min(width, 430) - 40);
  const heroHeight = Math.min(heroWidth * 1.25, 400);

  return (
    <ScrollView contentContainerClassName="flex-grow px-5 pb-4 pt-2" showsVerticalScrollIndicator={false}>
      <View className="h-16 flex-row items-center justify-between">
        <Pressable accessibilityLabel="Previous slide" onPress={goBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
          <ArrowLeft size={27} color={colors.ink} />
        </Pressable>
        <View className="h-11 w-11" />
        <Pressable onPress={skip} className="min-h-11 min-w-14 items-center justify-center px-2">
          <Text className="text-xs font-semibold text-[#0058BE]">Skip</Text>
        </Pressable>
      </View>

      <View className="relative mt-2 w-full items-center justify-center" style={{ height: heroHeight }}>
        <Image
          source={require('../../assets/onboarding-allocation-stitch.jpg')}
          resizeMode="contain"
          style={{ height: heroHeight, width: heroWidth }}
        />
        <View className="absolute right-1 top-10 flex-row items-center gap-2 rounded-full border border-[#C6C6CD]/30 bg-white/90 px-4 py-2 shadow">
          <Utensils size={18} color="#0058BE" />
          <Text className="text-xs font-semibold text-[#0B1C30]">Feeding</Text>
        </View>
        <View className="absolute bottom-16 left-1 flex-row items-center gap-2 rounded-full border border-[#C6C6CD]/30 bg-white/90 px-4 py-2 shadow">
          <BusFront size={18} color="#0058BE" />
          <Text className="text-xs font-semibold text-[#0B1C30]">Transport</Text>
        </View>
      </View>

      <View className="items-center pt-5">
        <Text className="text-center text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Allocate with ease</Text>
        <Text className="mt-4 max-w-[335px] text-center text-base leading-6 text-[#45464D]">
          Organize your income into custom safes for feeding, transport, and utilities. Visualizing your needs made simple.
        </Text>
      </View>

      <View className="mt-auto pt-8">
        <View className="mb-5 flex-row gap-2">
          <View className="h-20 flex-1 items-center justify-center rounded-xl border border-[#C6C6CD]/20 bg-[#EFF4FF] opacity-50">
            <Zap size={25} color="#45464D" />
            <Text className="mt-1 text-[11px] font-medium text-[#45464D]">Utilities</Text>
          </View>
          <View className="h-20 flex-1 items-center justify-center rounded-xl border-2 border-[#0058BE] bg-[#D8E2FF]">
            <ShieldCheck size={25} color="#0058BE" fill="#0058BE" />
            <Text className="mt-1 text-[11px] font-bold text-[#0058BE]">Secure</Text>
          </View>
          <View className="h-20 flex-1 items-center justify-center rounded-xl border border-[#C6C6CD]/20 bg-[#EFF4FF] opacity-50">
            <PiggyBank size={25} color="#45464D" />
            <Text className="mt-1 text-[11px] font-medium text-[#45464D]">Savings</Text>
          </View>
        </View>
        <View className="mb-8">
          <ProgressDots active={activeIndex} />
        </View>
        <ActionButton label="Next" onPress={goNext} />
      </View>
    </ScrollView>
  );
}

function DisciplineSlide({ activeIndex, goBack, goNext, skip }: SlideProps) {
  return (
    <View className="flex-1">
      <View className="h-16 flex-row items-center justify-between px-5">
        <Pressable accessibilityLabel="Previous slide" onPress={goBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
          <ArrowLeft size={27} color={colors.ink} />
        </Pressable>
        <Pressable onPress={skip} className="min-h-11 min-w-16 items-center justify-center rounded-lg px-4 active:bg-[#EFF4FF]">
          <Text className="text-xs font-semibold text-[#45464D]">Skip</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="flex-grow px-5 pb-4" showsVerticalScrollIndicator={false}>
        <View className="mt-3 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#131B2E] shadow">
          <Image source={require('../../assets/onboarding-discipline.png')} resizeMode="cover" className="h-full w-full" style={{ height: '100%', width: '100%' }} />
          <View className="absolute bottom-0 left-0 right-0 h-32 justify-end p-6">
            <View className="self-start flex-row items-center gap-2 rounded-full border border-white/20 bg-[#131B2E]/70 px-4 py-2">
              <ShieldCheck size={18} color="#FFFFFF" />
              <Text className="text-[11px] font-medium text-white">Secured Growth</Text>
            </View>
          </View>
        </View>

        <View className="items-center pt-8">
          <Text className="text-center text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Build discipline</Text>
          <Text className="mt-4 max-w-[345px] text-center text-base leading-6 text-[#45464D]">
            Stay on track with smart spending insights and achievement badges. Financial maturity starts here.
          </Text>
        </View>

        <View className="mt-auto pt-10">
          <ProgressDots active={activeIndex} />
          <View className="mt-8">
            <ActionButton label="Next" onPress={goNext} blue chevron />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function PeaceSlide({ activeIndex, goBack, skip }: SlideProps) {
  return (
    <ScrollView contentContainerClassName="flex-grow px-5 pb-6" showsVerticalScrollIndicator={false}>
      <View className="h-16 flex-row items-center justify-between">
        <Pressable accessibilityLabel="Previous slide" onPress={goBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
          <ArrowLeft size={27} color={colors.ink} />
        </Pressable>
        <Text className="text-2xl font-bold tracking-tight text-black">Pouch</Text>
        <View className="h-11 w-11" />
      </View>

      <View className="mt-3 aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-[#131B2E] shadow">
        <Image source={require('../../assets/onboarding-peace.png')} resizeMode="cover" className="h-full w-full" style={{ height: '100%', width: '100%' }} />
        <View className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-[#0B1C30]/95 p-6">
          <View className="mb-3 flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#6FFBBE]">
              <BadgeCheck size={24} color="#002113" />
            </View>
            <View>
              <Text className="text-xs font-semibold text-white/80">FINANCIAL SECURITY</Text>
              <Text className="text-xl font-semibold text-white">PEACE OF MIND</Text>
            </View>
          </View>
          <View className="h-1 overflow-hidden rounded-full bg-white/10">
            <View className="h-full w-[85%] bg-[#6FFBBE]" />
          </View>
        </View>
      </View>

      <View className="items-center pt-8">
        <Text className="max-w-[345px] text-center text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">
          Sleep better knowing your bills are already covered.
        </Text>
        <Text className="mt-4 max-w-[330px] text-center text-base leading-6 text-[#45464D]">
          Pouch is your partner in financial peace. Experience a life without payment anxiety.
        </Text>
      </View>

      <View className="mt-auto pt-8">
        <ProgressDots active={activeIndex} />
        <View className="mt-8">
          <ActionButton label="Get Started" onPress={skip} />
          <Pressable onPress={skip} className="mt-2 h-12 items-center justify-center rounded-xl active:bg-[#EFF4FF]">
            <Text className="text-xs font-semibold text-black">Sign In Instead</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const pagerRef = useRef<ScrollViewInstance>(null);
  const [index, setIndex] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  const goToSlide = (nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(nextIndex, SLIDE_COUNT - 1));
    pagerRef.current?.scrollTo({ x: boundedIndex * pageWidth, animated: true });
  };

  const syncIndexToScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!pageWidth) return;
    setIndex(Math.max(0, Math.min(Math.round(event.nativeEvent.contentOffset.x / pageWidth), SLIDE_COUNT - 1)));
  };

  const slides = [
    <ProtectionSlide key="protection" activeIndex={index} goBack={() => goToSlide(0)} goNext={() => goToSlide(1)} skip={onDone} />,
    <AllocationSlide key="allocation" activeIndex={index} goBack={() => goToSlide(0)} goNext={() => goToSlide(2)} skip={onDone} />,
    <DisciplineSlide key="discipline" activeIndex={index} goBack={() => goToSlide(1)} goNext={() => goToSlide(3)} skip={onDone} />,
    <PeaceSlide key="peace" activeIndex={index} goBack={() => goToSlide(2)} goNext={onDone} skip={onDone} />,
  ];

  return (
    <Page>
      <View
        className="w-full max-w-[430px] flex-1 self-center overflow-hidden bg-[#F8F9FF]"
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width;
          setPageWidth(width);
          pagerRef.current?.scrollTo({ x: index * width, animated: false });
        }}
      >
        <ScrollView
          ref={pagerRef}
          horizontal
          pagingEnabled
          directionalLockEnabled
          decelerationRate="fast"
          disableIntervalMomentum
          snapToInterval={pageWidth || undefined}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={syncIndexToScroll}
          className="flex-1"
        >
          {slides.map((slide) => (
            <View key={slide.key} style={{ width: pageWidth }} className="flex-1">
              {slide}
            </View>
          ))}
        </ScrollView>
      </View>
    </Page>
  );
}
