
export function isToday(date: Date): boolean {
  const today = new Date();
  return (today.getUTCDate() === date.getUTCDate()) && (today.getUTCMonth() === date.getUTCMonth()) && (today.getUTCFullYear() === date.getUTCFullYear())
}