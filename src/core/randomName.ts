/**
 * ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
 */
let AZ = "";
for (let i = 65; i <= 65 + 25; i++) AZ += String.fromCharCode(i);
let az = "";
for (let i = 97; i <= 97 + 25; i++) az += String.fromCharCode(i);
let _09_ = "";
for (let i = 0; i <= 9; i++) _09_ += `${i}`;
export const __internal = {
  chars: AZ + az + _09_,
};
/** */
function randomChar(chars: string) {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}
export default function randomName(size = 10) {
  function gen(seed: string): string {
    if (seed.length >= size) return seed;
    const next = randomChar(__internal.chars);
    return gen(seed + next);
  }
  return gen(randomChar(AZ + az));
}
