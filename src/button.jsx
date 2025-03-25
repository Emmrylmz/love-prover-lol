// Button.jsx
import React from "react";

export const Button = ({ name, onPress }) => {
  const handleOnPress = () => {
    onPress(name);
  };
  
  const buttonClass = name === "HAYIR" 
    ? "h-12 sm:h-14 md:h-16 w-28 sm:w-32 md:w-40 rounded-lg bg-red-400 hover:bg-red-500 active:bg-red-600 transition-colors cursor-pointer" 
    : "h-12 sm:h-14 md:h-16 w-28 sm:w-32 md:w-40 rounded-lg bg-green-400 hover:bg-green-500 active:bg-green-600 transition-colors cursor-pointer";
  
  return (
    <div
      className={buttonClass}
      onClick={handleOnPress}
      onTouchEnd={handleOnPress}
    >
      <div className="h-full flex items-center justify-center font-bold text-xl sm:text-2xl md:text-3xl">
        {name}
      </div>
    </div>
  );
};

export default Button;