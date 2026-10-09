const DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBn = (v: string | number) =>
  String(v).replace(/\d/g, (d) => DIGITS[Number(d)]);

export function fmtNum(n: number) {
  const frac = Number.isInteger(n) ? 0 : 2;
  return toBn(
    n.toLocaleString("en-US", {
      minimumFractionDigits: frac,
      maximumFractionDigits: 2,
    })
  );
}

export const fmtTaka = (n: number) => `${fmtNum(n)} টাকা`;

export const fmtPct = (pct: number) => `${toBn(Math.abs(pct).toFixed(1))}%`;

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};

export const unitShort = (u: string) => UNIT_BN[u.toLowerCase()] ?? u;
export const unitLabel = (u: string) => `প্রতি ${unitShort(u)}`;

export const banglaDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());