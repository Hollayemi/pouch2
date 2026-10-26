import { Check, ChevronRight, Clock3, X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { formatTimeKey } from '../utils/date';

const hours = Array.from({ length: 12 }, (_, index) => index + 1);
const minutes = ['00', '15', '30', '45'];

function toParts(value: string) {
  const [hourValue, minute = '00'] = value.split(':');
  const hour24 = Number(hourValue);
  return {
    hour: hour24 % 12 || 12,
    minute,
    period: hour24 >= 12 ? 'PM' : 'AM',
  } as const;
}

function toTimeKey(hour: number, minute: string, period: 'AM' | 'PM') {
  const hour24 = period === 'AM' ? hour % 12 : (hour % 12) + 12;
  return `${String(hour24).padStart(2, '0')}:${minute}`;
}

export function ReleaseTimePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const current = toParts(value);
  const [visible, setVisible] = useState(false);
  const [hour, setHour] = useState(current.hour);
  const [minute, setMinute] = useState(current.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(current.period);

  const open = () => {
    const parts = toParts(value);
    setHour(parts.hour);
    setMinute(parts.minute);
    setPeriod(parts.period);
    setVisible(true);
  };

  const confirm = () => {
    onChange(toTimeKey(hour, minute, period));
    setVisible(false);
  };

  return (
    <View>
      <Text className="mb-[7px] text-[13px] font-bold leading-[18px] text-ink">Release time</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Release time, ${formatTimeKey(value)}`} onPress={open} className="h-[54px] flex-row items-center gap-[11px] rounded-[9px] border border-border bg-white px-[15px]">
        <Clock3 size={20} color={colors.blue} />
        <Text className="flex-1 text-[15px] font-semibold text-ink">{formatTimeKey(value)}</Text>
        <ChevronRight size={19} color={colors.muted} />
      </Pressable>
      <Text className="mt-1.5 text-[11px] leading-4 text-muted">Money will be sent to your personal account at this time.</Text>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View className="flex-1 items-center justify-center bg-ink/[0.55] p-5">
          <Pressable accessibilityLabel="Close time picker" onPress={() => setVisible(false)} className="absolute inset-0" />
          <View className="w-full max-w-[390px] rounded-[16px] bg-white p-5 shadow">
            <View className="mb-5 flex-row items-center justify-between">
              <View>
                <Text className="text-[11px] font-bold text-muted">RELEASE TIME</Text>
                <Text className="mt-1 text-xl font-extrabold text-ink">{formatTimeKey(toTimeKey(hour, minute, period))}</Text>
              </View>
              <Pressable accessibilityLabel="Close" onPress={() => setVisible(false)} className="h-10 w-10 items-center justify-center rounded-full bg-soft"><X size={21} color={colors.ink} /></Pressable>
            </View>

            <Text className="mb-2 text-xs font-bold text-muted">HOUR</Text>
            <View className="mb-4 flex-row flex-wrap gap-2">
              {hours.map((option) => (
                <Pressable key={option} onPress={() => setHour(option)} className={`h-10 w-[22%] flex-grow items-center justify-center rounded-lg border ${hour === option ? 'border-brand bg-soft-blue' : 'border-border'}`}>
                  <Text className={`text-sm font-bold ${hour === option ? 'text-brand' : 'text-ink'}`}>{option}</Text>
                </Pressable>
              ))}
            </View>

            <Text className="mb-2 text-xs font-bold text-muted">MINUTE</Text>
            <View className="mb-4 flex-row gap-2">
              {minutes.map((option) => (
                <Pressable key={option} onPress={() => setMinute(option)} className={`h-11 flex-1 items-center justify-center rounded-lg border ${minute === option ? 'border-brand bg-soft-blue' : 'border-border'}`}>
                  <Text className={`text-sm font-bold ${minute === option ? 'text-brand' : 'text-ink'}`}>:{option}</Text>
                </Pressable>
              ))}
            </View>

            <View className="mb-5 flex-row gap-2">
              {(['AM', 'PM'] as const).map((option) => (
                <Pressable key={option} onPress={() => setPeriod(option)} className={`h-11 flex-1 items-center justify-center rounded-lg border ${period === option ? 'border-brand bg-brand' : 'border-border'}`}>
                  <Text className={`text-sm font-bold ${period === option ? 'text-white' : 'text-ink'}`}>{option}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={confirm} className="h-[52px] flex-row items-center justify-center gap-2 rounded-[9px] bg-brand">
              <Check size={18} color="#FFFFFF" />
              <Text className="text-[15px] font-bold text-white">Use this time</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
