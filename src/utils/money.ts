export function formatNaira(amountKobo: number) {
  const amountNaira = Math.round(amountKobo / 100);
  return `₦${amountNaira.toLocaleString('en-NG')}`;
}

export function nairaInputToKobo(value: string) {
  const amountNaira = Number.parseInt(value.replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(amountNaira) ? amountNaira * 100 : 0;
}
