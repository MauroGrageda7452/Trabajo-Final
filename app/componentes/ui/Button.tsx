// Button.tsx
import React from "react";

interface Props {
  onClick?: () => void;
  text: string;
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, text, className }) => {
  return <button className={`relative ${className}`} onClick={onClick} /*style={getImageStyle('/elements/boton.jpg')}*/>
            <img src='/elements/boton-centro.jpg' className="absolute h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="center" />
            <img src='/elements/boton-esq-izq.jpg' className="absolute h-full left-0 top-1/2 transform -translate-y-1/2" alt="left" />
            <img src='/elements/boton-esq-der.jpg' className="absolute h-full right-0 top-1/2 transform -translate-y-1/2" alt="right" />
            <span className="relative">{text}</span>
          </button>;
};

export default Button;
