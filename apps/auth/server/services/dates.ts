
function twoDigits(num: number | string) {
  num = num.toString();
  return num.length === 1 ? `0${num}` : num;
}

export function getAbsoluteDate(date: string | Date): string {
  date = new Date(date);

  return `${date.getFullYear()}-${twoDigits(date.getMonth())}-${twoDigits(date.getDay())}`;
}
