import type { ButtonHTMLAttributes } from "react";

import "./button.scss";

type ButtonVariant = "folder" | "evidence" | "archive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  children,
  className = "",
  type = "button",
  variant = "folder",
  ...props
}: ButtonProps) {
  const classes = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
