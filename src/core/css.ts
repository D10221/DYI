/**
 *
 * @param styles
 * @returns dispose
 */
const inject = (styles: string) => {
  const element = document.createElement("style");
  element.innerHTML = styles;
  document.head.appendChild(element);
  // dispose
  return () => document.head.removeChild(element);
};
/**
 *
 * @param styles
 * @param className
 */
export default function createStyle(styles: string, className: string) {
  return inject(`.${className} {${styles}}`);
}
