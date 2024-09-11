"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  buttonType?: "button" | "submit" | "reset";
  buttonStyle?: string;
}

export default function FormButton({
  buttonType,
  buttonStyle,
  children,
  onClick,
  ...props
}: FormButtonProps) {
  const pending = useFormStatus();
  return (
    <button
      type={buttonType}
      className={buttonStyle}
      disabled={pending.pending}
      onClick={onClick}
    >
      {pending.pending && buttonType === "submit" ? "Loading..." : children}
    </button>
  );
}
