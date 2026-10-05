export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateKeyToDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function tomorrowDateKey() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toDateKey(tomorrow);
}

export function formatDateKey(value: string) {
  return dateKeyToDate(value).toLocaleDateString('en-NG', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDateKey(value: string) {
  return dateKeyToDate(value).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function normalizeReleaseDate(value: string, frequency: string) {
  const date = dateKeyToDate(value);
  if (frequency === 'Weekdays') {
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }
  }
  return toDateKey(date);
}

export function dateKeyToISO(value: string, hour = 8) {
  const date = dateKeyToDate(value);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}
