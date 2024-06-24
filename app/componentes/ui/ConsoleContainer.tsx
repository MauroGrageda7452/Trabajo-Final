import React from "react";

interface ConsoleContainerProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const ConsoleContainer: React.FC<ConsoleContainerProps> = ({ children, className }) => {
    return <div className={`relative ${className}`}/*style={getImageStyle('/elements/boton.jpg')}*/>
              <img src='/elements/consola-container.png' className="absolute h-full w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="center" />
              <img src='/elements/consola-container -izq.png' className="absolute h-full left-0 top-1/2 transform -translate-y-1/2" alt="left" />
              <img src='/elements/consola-container -der.png' className="absolute h-full right-0 top-1/2 transform -translate-y-1/2" alt="right" />
              <span className="relative">{children}</span>
          </div>;
  };

  export default ConsoleContainer;
