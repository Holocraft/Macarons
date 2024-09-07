"use client";

type ButtonProps = {
  onClick?: () => void;
  buttonStyle?: string;
  buttonType?: "button" | "submit" | "reset";
  children: React.ReactNode;
};

export default function Button({
  onClick,
  buttonType = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={props.buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}
