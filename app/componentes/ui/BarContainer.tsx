import React from "react";

interface BarContainerProps {
  children: React.ReactNode;
  className?: string;
}
/*<div className={`bg-black p-1 ${className}`}>{children}</div>;*/
const BarContainer: React.FC<BarContainerProps> = ({ children, className }) => {
  return <div className={`relative ${className}`}/*style={getImageStyle('/elements/boton.jpg')}*/>
            <img src='/elements/top-bar.jpg' className="absolute h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="center" />
            <img src='/elements/boton-esq-izq.jpg' className="absolute h-full left-0 top-1/2 transform -translate-y-1/2" alt="left" />
            <img src='/elements/boton-esq-der.jpg' className="absolute h-full right-0 top-1/2 transform -translate-y-1/2" alt="right" />
            <span className="relative">{children}</span>
        </div>;
};

export default BarContainer;