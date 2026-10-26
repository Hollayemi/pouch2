import { ArrowLeft, Clock3, Delete as DeleteIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Page } from '../components/ui';

type OtpScreenProps = {
  onBack: () => void;
  onVerified: () => void;
};

const keypadRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
] as const;

export function OtpScreen({ onBack, onVerified }: OtpScreenProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(55);

  useEffect(() => {
    if (!seconds) return;
    const timer = setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const addDigit = (digit: string) => {
    setDigits((current) => current.length < 6 ? [...current, digit] : current);
  };

  const removeDigit = () => {
    setDigits((current) => current.slice(0, -1));
  };

  const timerText = `00:${seconds.toString().padStart(2, '0')}`;

  return (
    <Page>
      <View className="flex-1 px-5">
        <View className="h-16 flex-row items-center">
          <Pressable accessibilityLabel="Go back" onPress={onBack} className="h-11 w-11 items-center justify-center rounded-full active:bg-[#EFF4FF]">
            <ArrowLeft size={27} color="#000000" />
          </Pressable>
        </View>

        <View className="mt-6 mb-8">
          <Text className="text-[28px] font-bold leading-9 tracking-tight text-[#0B1C30]">Verify Email</Text>
          <Text className="mt-2 text-sm leading-5 text-[#45464D]">
            We sent a 6-digit code to <Text className="font-semibold text-[#0B1C30]">alex.vance@pouch.ng</Text>
          </Text>
        </View>

        <View className="mb-6 flex-row justify-between gap-2">
          {Array.from({ length: 6 }, (_, index) => {
            const active = index === digits.length && digits.length < 6;
            return (
              <View key={index} className={`h-14 max-w-12 flex-1 items-center justify-center rounded-lg border bg-white ${active ? 'border-2 border-[#0866CE]' : 'border-[#C6C6CD]'}`}>
                <Text className="text-2xl font-bold text-[#0B1C30]">{digits[index] ?? ''}</Text>
              </View>
            );
          })}
        </View>

        <View className="mb-12 flex-row items-center justify-center gap-2">
          <Clock3 size={17} color="#0058BE" />
          {seconds ? (
            <Text className="text-xs font-semibold text-[#45464D]">Resend code in <Text className="font-bold text-[#0058BE]">{timerText}</Text></Text>
          ) : (
            <Pressable onPress={() => setSeconds(55)}>
              <Text className="text-xs font-bold text-[#0058BE]">Resend code now</Text>
            </Pressable>
          )}
        </View>

        <Pressable
          disabled={digits.length !== 6}
          onPress={onVerified}
          className={`h-14 items-center justify-center rounded-lg shadow ${digits.length === 6 ? 'bg-[#0866CE] active:opacity-80' : 'bg-[#0866CE]/50'}`}
        >
          <Text className="text-xl font-semibold text-white">Verify</Text>
        </Pressable>

        <View className="flex-1" />

        <View className="mb-6 gap-2">
          {keypadRows.map((row) => (
            <View key={row[0]} className="h-14 flex-row">
              {row.map((digit) => (
                <Pressable key={digit} onPress={() => addDigit(digit)} className="h-14 flex-1 items-center justify-center rounded-lg active:bg-[#E5EEFF]">
                  <Text className="text-2xl text-[#0B1C30]">{digit}</Text>
                </Pressable>
              ))}
            </View>
          ))}
          <View className="h-14 flex-row">
            <View className="flex-1" />
            <Pressable onPress={() => addDigit('0')} className="h-14 flex-1 items-center justify-center rounded-lg active:bg-[#E5EEFF]">
              <Text className="text-2xl text-[#0B1C30]">0</Text>
            </Pressable>
            <Pressable accessibilityLabel="Delete digit" onPress={removeDigit} className="h-14 flex-1 items-center justify-center rounded-lg active:bg-[#E5EEFF]">
              <DeleteIcon size={27} color="#0B1C30" />
            </Pressable>
          </View>
        </View>
      </View>
    </Page>
  );
}
