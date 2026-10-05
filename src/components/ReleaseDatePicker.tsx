import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
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
      <Text style={styles.fieldLabel}>First release date</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`First release date, ${formatDateKey(value)}`} onPress={open} style={styles.dateFieldButton}>
        <CalendarDays size={20} color={colors.blue} />
        <Text style={styles.dateFieldValue}>{formatDateKey(value)}</Text>
        <ChevronRight size={19} color={colors.muted} />
      </Pressable>
      <Text style={styles.fieldHint}>{frequency === 'Weekdays' ? 'Choose a weekday for the first release.' : 'Your first scheduled amount becomes available on this date.'}</Text>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.calendarBackdrop} onPress={() => setVisible(false)}>
          <Pressable style={styles.calendarPanel} onPress={(event) => event.stopPropagation()}>
            <View style={styles.calendarTopBar}>
              <View>
                <Text style={styles.overline}>FIRST RELEASE</Text>
                <Text style={styles.calendarSelection}>{formatDateKey(pendingDate)}</Text>
              </View>
              <Pressable accessibilityLabel="Close calendar" onPress={() => setVisible(false)} style={styles.iconButton}>
                <X size={22} color={colors.ink} />
              </Pressable>
            </View>
            <View style={styles.calendarMonthBar}>
              <Pressable accessibilityLabel="Previous month" disabled={!canGoBack} onPress={() => changeMonth(-1)} style={[styles.calendarNavButton, !canGoBack && styles.calendarNavDisabled]}>
                <ChevronLeft size={21} color={colors.ink} />
              </Pressable>
              <Text style={styles.calendarMonth}>{displayedMonth.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}</Text>
              <Pressable accessibilityLabel="Next month" onPress={() => changeMonth(1)} style={styles.calendarNavButton}>
                <ChevronRight size={21} color={colors.ink} />
              </Pressable>
            </View>
            <View style={styles.calendarGrid}>
              {weekDays.map((day) => <View key={day} style={styles.calendarCell}><Text style={styles.calendarWeekday}>{day}</Text></View>)}
              {days.map((day, index) => {
                if (!day) return <View key={`empty-${index}`} style={styles.calendarCell} />;
                const date = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), day);
                const dateKey = toDateKey(date);
                const weekend = date.getDay() === 0 || date.getDay() === 6;
                const disabled = date.getTime() < today.getTime() || (frequency === 'Weekdays' && weekend);
                const selected = dateKey === pendingDate;
                return <View key={dateKey} style={styles.calendarCell}><Pressable accessibilityLabel={formatDateKey(dateKey)} accessibilityRole="button" disabled={disabled} onPress={() => setPendingDate(dateKey)} style={[styles.calendarDay, selected && styles.calendarDaySelected]}><Text style={[styles.calendarDayText, disabled && styles.calendarDayDisabledText, selected && styles.calendarDaySelectedText]}>{day}</Text></Pressable></View>;
              })}
            </View>
            <Pressable onPress={confirm} style={styles.calendarConfirm}><Text style={styles.calendarConfirmText}>Use this date</Text></Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
