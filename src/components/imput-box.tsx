/** @jsx createElement */
import createElement, { Component } from "../core/create-element.js";

type InputBoxComponent = Component<{
  label: string;
  message: string | undefined;
  onChange(e: Event): any;
}>;

const InputBox: InputBoxComponent = ({ label, message, onChange }) => {
  return (
    <div className="flex row" style="margin-left: 0.5rem;margin-right: 0.5rem">
      <label style="margin: 0.5rem">{label}</label>
      <input
        value={message}
        onchange={onChange}
      />
    </div>
  );
};

export default InputBox;
