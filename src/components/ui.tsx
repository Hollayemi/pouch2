import { ArrowLeft, ShieldCheck, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import type { IconType } from '../types';

export function Page({ children, nav = false }: { children: ReactNode; nav?: boolean }) {
  const { width } = useWindowDimensions();
  const edges = nav ? ['top', 'left', 'right'] as const : ['top', 'bottom', 'left', 'right'] as const;
  return <SafeAreaView className="flex-1 bg-canvas" edges={edges}><View className={`w-full flex-1 self-center bg-canvas ${width > 680 ? 'max-w-[600px] border-x border-border' : ''}`}>{children}</View></SafeAreaView>;
}

export function Brand() { return <Text className="text-[27px] font-extrabold leading-[34px] text-black">Pouch</Text>; }
export function Title({ children }: { children: ReactNode }) { return <Text className="text-[29px] font-extrabold leading-9 text-ink">{children}</Text>; }
export function Subtitle({ children }: { children: ReactNode }) { return <Text className="mt-[5px] text-base leading-6 text-muted">{children}</Text>; }
export function Divider() { return <View className="mx-4 h-px bg-[#E9EDF3]" />; }

export function TopBar({ title, back, close, right: Right }: { title: string; back: () => void; close?: boolean; right?: IconType }) {
  return <View className="h-[62px] flex-row items-center justify-between border-b border-border px-3">
    <Pressable onPress={back} className="h-11 w-11 items-center justify-center">{close ? <X size={25} color={colors.ink} /> : <ArrowLeft size={25} color={colors.ink} />}</Pressable>
    <Text className="text-[19px] font-extrabold text-black">{title}</Text>
    <View className="h-11 w-11 items-center justify-center">{Right && <Right size={23} color={colors.ink} />}</View>
  </View>;
}

export function PrimaryButton({ label, onPress, icon: Icon, disabled, dark }: { label: string; onPress: () => void; icon?: IconType; disabled?: boolean; dark?: boolean }) {
  return <Pressable disabled={disabled} onPress={onPress} className={`min-h-14 flex-row items-center justify-center gap-3 rounded-[10px] px-[22px] shadow ${dark ? 'bg-black' : 'bg-brand'} ${disabled ? 'bg-[#B8BBC3] shadow-none' : 'active:opacity-[0.85]'}`}>
    <Text className="text-[17px] font-bold leading-[22px] text-white">{label}</Text>{Icon && <Icon size={21} color="#FFF" />}
  </Pressable>;
}

export function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return <Pressable onPress={onPress} className="min-h-[54px] items-center justify-center rounded-[10px] border border-[#BFC5CF] bg-white"><Text className="text-base font-bold text-ink">{label}</Text></Pressable>;
}

export function Field({ label, prefix, ...props }: React.ComponentProps<typeof TextInput> & { label: string; prefix?: string }) {
  return <View><Text className="mb-[7px] text-[13px] font-bold leading-[18px] text-ink">{label}</Text><View className="h-[54px] flex-row items-center rounded-[9px] border border-border bg-white px-[15px]">{prefix && <View className="h-full items-center justify-center"><Text className="mr-2 text-lg font-bold leading-5 text-ink">{prefix}</Text></View>}<TextInput placeholderTextColor="#98A2B3" textAlignVertical="center" className="h-full flex-1 p-0 text-base leading-5 text-ink" {...props} /></View></View>;
}

export function Progress({ step, label }: { step: number; label: string }) {
  return <View className="gap-2.5"><View className="flex-row items-center justify-between gap-3"><Text className="text-xs font-bold text-muted">STEP {step} OF 6</Text><Text className="text-xs font-bold text-brand">{label}</Text></View><View className="h-1.5 overflow-hidden rounded-full bg-soft-blue"><View className="h-full rounded-full bg-brand" style={{ width: `${step / 6 * 100}%` }} /></View></View>;
}

export function Pill({ text, color: backgroundColor, textColor = colors.ink }: { text: string; color: string; textColor?: string }) {
  return <View className="self-start rounded-[18px] px-[11px] py-[7px]" style={{ backgroundColor }}><Text className="text-[10px] font-extrabold leading-[14px]" style={{ color: textColor }}>{text}</Text></View>;
}

export function SecureNote({ text }: { text: string }) {
  return <View className="mt-[18px] flex-row items-center justify-center gap-2"><ShieldCheck size={16} color={colors.green} /><Text className="text-center text-[13px] font-semibold text-success">{text}</Text></View>;
}

export function Section({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <View className="mt-1.5 flex-row items-end justify-between px-[3px]"><Text className="text-[21px] font-bold leading-7 text-ink">{title}</Text>{action && <Pressable onPress={onAction}><Text className="text-xs font-bold text-brand">{action}</Text></Pressable>}</View>;
}

export function Stat({ label, value, detail, accent }: { label: string; value: string; detail?: string; accent?: boolean }) {
  return <View className="min-h-28 flex-1 justify-center rounded-xl border border-[#E7EAF0] bg-white p-4 shadow"><Text className="mb-[7px] text-xs text-ink">{label}</Text><Text className={`text-2xl font-bold leading-[30px] ${accent ? 'text-brand' : 'text-ink'}`}>{value}</Text>{detail && <Text className="mt-0.5 text-[11px] text-muted">{detail}</Text>}</View>;
}

export function QuickAction({ label, icon: Icon, primary, onPress }: { label: string; icon: IconType; primary?: boolean; onPress?: () => void }) {
  return <Pressable onPress={onPress} className={`h-[88px] flex-1 items-center justify-center gap-2 rounded-xl ${primary ? 'bg-brand' : 'bg-[#D6E5FC]'}`}><Icon size={23} color={primary ? '#FFF' : colors.blue} /><Text className={`text-xs font-bold ${primary ? 'text-white' : 'text-brand'}`}>{label}</Text></Pressable>;
}

export function Fact({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) {
  return <View className="flex-1"><Text className="text-[11px] font-bold leading-[15px] text-muted">{label}</Text><View className="flex-row items-center gap-[9px]"><Icon size={17} color={colors.blue} /><Text className="text-[13px] font-semibold text-ink">{value}</Text></View></View>;
}
