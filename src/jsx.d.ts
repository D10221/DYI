declare module JSX {
  type AnyHTMLElementTagNameMapKey = {
    [key in keyof HTMLElementTagNameMap]: any;
  };
  interface IntrinsicElements extends AnyHTMLElementTagNameMapKey {}
}
