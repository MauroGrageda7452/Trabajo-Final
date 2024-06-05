import React from "react";
import Button from "./ui/Button";

interface ButtonGridProps {
  buttons: { text: string; onClick: () => void }[];
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons }) => {
  return (
    <div>
      {buttons.map((button, index) => (
        <Button key={index} onClick={button.onClick} text={button.text} />
      ))}
    </div>
  );
};

export default ButtonGrid;
