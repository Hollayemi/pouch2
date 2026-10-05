import { ArrowLeft, ShieldCheck, X } from "lucide-react-native";
import type { ReactNode } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles";
import type { IconType } from "../types";

export function Page({
  children,
  nav = false,
}: {
  children: ReactNode;
  nav?: boolean;
}) {
  const { width } = useWindowDimensions();
  const edges = nav
    ? (["top", "left", "right"] as const)
    : (["top", "bottom", "left", "right"] as const);
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={[styles.page, width > 680 && styles.pageWide]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export function Brand() {
  return <Text style={styles.brand}>SafeGuard</Text>;
}
export function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}
export function Subtitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sub}>{children}</Text>;
}
export function Divider() {
  return <View style={styles.divider} />;
}

export function TopBar({
  title,
  back,
  close,
  right: Right,
}: {
  title: string;
  back: () => void;
  close?: boolean;
  right?: IconType;
}) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={back} style={styles.iconButton}>
        {close ? (
          <X size={25} color={colors.ink} />
        ) : (
          <ArrowLeft size={25} color={colors.ink} />
        )}
      </Pressable>
      <Text style={styles.topBarTitle}>{title}</Text>
      <View style={styles.iconButton}>
        {Right && <Right size={23} color={colors.ink} />}
      </View>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  icon: Icon,
  disabled,
  dark,
}: {
  label: string;
  onPress: () => void;
  icon?: IconType;
  disabled?: boolean;
  dark?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        dark && { backgroundColor: "#000" },
        disabled && styles.disabled,
        pressed && !disabled && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.primaryText}>{label}</Text>
      {Icon && <Icon size={21} color="#FFF" />}
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.secondary}>
      <Text style={styles.secondaryText}>{label}</Text>
    </Pressable>
  );
}

export function Field({
  label,
  prefix,
  ...props
}: React.ComponentProps<typeof TextInput> & {
  label: string;
  prefix?: string;
}) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputShell}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          placeholderTextColor="#98A2B3"
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
}

export function Progress({ step, label }: { step: number; label: string }) {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.rowBetween}>
        <Text style={styles.progressStep}>STEP {step} OF 6</Text>
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[styles.progressFill, { width: `${(step / 6) * 100}%` }]}
        />
      </View>
    </View>
  );
}

export function Pill({
  text,
  color: backgroundColor,
  textColor = colors.ink,
}: {
  text: string;
  color: string;
  textColor?: string;
}) {
  return (
    <View style={[styles.pill, { backgroundColor }]}>
      <Text style={[styles.pillText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

export function SecureNote({ text }: { text: string }) {
  return (
    <View style={styles.secure}>
      <ShieldCheck size={16} color={colors.green} />
      <Text style={styles.secureText}>{text}</Text>
    </View>
  );
}

export function Section({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

export function Stat({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, accent && { color: colors.blue }]}>
        {value}
      </Text>
      {detail && <Text style={styles.statDetail}>{detail}</Text>}
    </View>
  );
}

export function QuickAction({
  label,
  icon: Icon,
  primary,
  onPress,
}: {
  label: string;
  icon: IconType;
  primary?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.quick, primary && { backgroundColor: colors.blue }]}
    >
      <Icon size={23} color={primary ? "#FFF" : colors.blue} />
      <Text style={[styles.quickText, primary && { color: "#FFF" }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.overline}>{label}</Text>
      <View style={styles.inline}>
        <Icon size={17} color={colors.blue} />
        <Text style={styles.factValue}>{value}</Text>
      </View>
    </View>
  );
}
