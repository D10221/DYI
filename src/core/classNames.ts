export default function classNames(...a: string[]): string {
  return a.filter(Boolean).join(" ");
}
