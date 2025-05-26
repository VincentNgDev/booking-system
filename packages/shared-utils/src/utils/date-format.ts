export function formatDateAdvanced(date: Date, format: string): string {
  const pad = (n: number, width = 2) => n.toString().padStart(width, "0");

  const hours12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() < 12 ? "AM" : "PM";

  const map: { [key: string]: string } = {
    yyyy: date.getFullYear().toString(),
    yy: date.getFullYear().toString().slice(-2),
    MM: pad(date.getMonth() + 1),
    M: (date.getMonth() + 1).toString(),
    dd: pad(date.getDate()),
    d: date.getDate().toString(),
    HH: pad(date.getHours()),
    H: date.getHours().toString(),
    hh: pad(hours12),
    h: hours12.toString(),
    mm: pad(date.getMinutes()),
    m: date.getMinutes().toString(),
    ss: pad(date.getSeconds()),
    s: date.getSeconds().toString(),
    SSS: pad(date.getMilliseconds(), 3),
    a: ampm,
  };

  let formatted = format;
  // Sort keys by length descending to replace longer keys first (e.g., 'yyyy' before 'yy')
  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    formatted = formatted.replace(new RegExp(key, "g"), map[key] ?? "");
  }

  return formatted;
}
