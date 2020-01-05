/** @jsx createElement */
import createElement, { Component } from "../core/create-element.js";

const Nav: Component<{ links: { href: string; label: string }[] }> = ({
  links,
}) => {
  return (
    <div style="flex: 1;display: flex; flex-direction: row; justify-content: space-between;padding: 0.5rem">
      {links.map(({ href, label }) => (
        <a style="padding: 0.25rem" href={href}>
          {label}
        </a>
      ))}
      <div style="flex: 1 0" />
    </div>
  );
};

export default Nav;
