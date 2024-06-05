// Button.tsx
import React from "react";

interface Props {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, text, className }) => {
  return <button className={className} onClick={onClick}>{text}</button>;
};

export default Button;
