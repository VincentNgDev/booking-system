// format-extension.ts
export {}; // important to mark it as a module

declare global {
  interface Date {
    format(formatString?: string | undefined): string;
  }
}

Date.prototype.format = function (formatString: string | undefined): string {
  if (!formatString) {
    formatString = "yyyy-MM-dd HH:mm:ss";
  }

  const pad = (n: number, width = 2) => n.toString().padStart(width, "0");

  const hours12 = this.getHours() % 12 || 12;
  const ampm = this.getHours() < 12 ? "AM" : "PM";

  const map: { [key: string]: string } = {
    yyyy: this.getFullYear().toString(),
    yy: this.getFullYear().toString().slice(-2),
    MM: pad(this.getMonth() + 1),
    M: (this.getMonth() + 1).toString(),
    dd: pad(this.getDate()),
    d: this.getDate().toString(),
    HH: pad(this.getHours()),
    H: this.getHours().toString(),
    hh: pad(hours12),
    h: hours12.toString(),
    mm: pad(this.getMinutes()),
    m: this.getMinutes().toString(),
    ss: pad(this.getSeconds()),
    s: this.getSeconds().toString(),
    SSS: pad(this.getMilliseconds(), 3),
    a: ampm,
  };

  let formatted = formatString;

  // ⚡️ Smart correction: If using `a` but no `h` (12h format), convert `HH` -> `hh`, and `H` -> `h`
  if (formatted.includes("a") && !formatted.match(/h{1,2}/)) {
    formatted = formatted.replace(/HH/g, "hh").replace(/H/g, "h");
  }

  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    formatted = formatted.replace(new RegExp(key, "g"), map[key] ?? "");
  }

  return formatted;
};
