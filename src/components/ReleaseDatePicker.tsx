import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { dateKeyToDate, formatDateKey, toDateKey } from '../utils/date';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function ReleaseDatePicker({ value, frequency, onChange }: { value: string; frequency: string; onChange: (value: string) => void }) {
  const selectedDate = dateKeyToDate(value);
  const [visible, setVisible] = useState(false);
  const [pendingDate, setPendingDate] = useState(value);
  const [displayedMonth, setDisplayedMonth] = useState(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const days = useMemo(() => {
    const firstWeekday = displayedMonth.getDay();
    const daysInMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstWeekday + 1;
      return day >= 1 && day <= daysInMonth ? day : null;
    });
  }, [displayedMonth]);

  const open = () => {
    const current = dateKeyToDate(value);
    setPendingDate(value);
    setDisplayedMonth(new Date(current.getFullYear(), current.getMonth(), 1));
    setVisible(true);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoBack = displayedMonth.getTime() > currentMonth.getTime();

  const changeMonth = (amount: number) => {
    setDisplayedMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  const confirm = () => {
    onChange(pendingDate);
    setVisible(false);
  };

  return (
    <View>
      <Text className="mb-[7px] text-[13px] font-bold leading-[18px] text-ink">First release date</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`First release date, ${formatDateKey(value)}`} onPress={open} className="min-h-[54px] flex-row items-center gap-[11px] rounded-[9px] border border-border bg-white px-[15px]">
        <CalendarDays size={20} color={colors.blue} />
        <Text className="flex-1 text-[15px] font-semibold text-ink">{formatDateKey(value)}</Text>
        <ChevronRight size={19} color={colors.muted} />
      </Pressable>
      <Text className="mt-1.5 text-[11px] leading-4 text-muted">{frequency === 'Weekdays' ? 'Choose a weekday for the first release.' : 'Your first scheduled amount becomes available on this date.'}</Text>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable className="flex-1 items-center justify-center bg-ink/[0.55] p-5" onPress={() => setVisible(false)}>
          <Pressable className="w-full max-w-[390px] rounded-[14px] bg-white p-5 shadow" onPress={(event) => event.stopPropagation()}>
            <View className="min-h-[58px] flex-row items-start justify-between">
              <View>
                <Text className="text-[11px] font-bold leading-[15px] text-muted">FIRST RELEASE</Text>
                <Text className="mt-[3px] text-[17px] font-bold leading-[23px] text-ink">{formatDateKey(pendingDate)}</Text>
              </View>
              <Pressable accessibilityLabel="Close calendar" onPress={() => setVisible(false)} className="h-11 w-11 items-center justify-center">
                <X size={22} color={colors.ink} />
              </Pressable>
            </View>
            <View className="h-[54px] flex-row items-center justify-between">
              <Pressable accessibilityLabel="Previous month" disabled={!canGoBack} onPress={() => changeMonth(-1)} className={`h-10 w-10 items-center justify-center rounded-lg bg-soft ${!canGoBack ? 'opacity-30' : ''}`}>
                <ChevronLeft size={21} color={colors.ink} />
              </Pressable>
              <Text className="text-base font-bold text-ink">{displayedMonth.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}</Text>
              <Pressable accessibilityLabel="Next month" onPress={() => changeMonth(1)} className="h-10 w-10 items-center justify-center rounded-lg bg-soft">
                <ChevronRight size={21} color={colors.ink} />
              </Pressable>
            </View>
            <View className="flex-row flex-wrap">
              {weekDays.map((day) => <View key={day} className="aspect-square w-[14.285%] items-center justify-center"><Text className="text-[10px] font-bold text-muted">{day}</Text></View>)}
              {days.map((day, index) => {
                if (!day) return <View key={`empty-${index}`} className="aspect-square w-[14.285%]" />;
                const date = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), day);
                const dateKey = toDateKey(date);
                const weekend = date.getDay() === 0 || date.getDay() === 6;
                const disabled = date.getTime() < today.getTime() || (frequency === 'Weekdays' && weekend);
                const selected = dateKey === pendingDate;
                return <View key={dateKey} className="aspect-square w-[14.285%] items-center justify-center"><Pressable accessibilityLabel={formatDateKey(dateKey)} accessibilityRole="button" disabled={disabled} onPress={() => setPendingDate(dateKey)} className={`h-9 w-9 items-center justify-center rounded-full ${selected ? 'bg-brand' : ''}`}><Text className={`text-[13px] font-semibold ${disabled ? 'text-[#C4CAD4]' : 'text-ink'} ${selected ? 'font-extrabold text-white' : ''}`}>{day}</Text></Pressable></View>;
              })}
            </View>
            <Pressable onPress={confirm} className="mt-4 min-h-[50px] items-center justify-center rounded-[9px] bg-brand"><Text className="text-[15px] font-bold text-white">Use this date</Text></Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
