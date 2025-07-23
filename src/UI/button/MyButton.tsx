import React from "react";
import classes from "./myButton.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "normal" | "big";
}

const sizeClassMap = {
  small: classes.small,
  normal: classes.normal,
  big: classes.big,
};
const MyButton: React.FC<ButtonProps> = ({
  children,
  size = "small",
  ...props
}) => {
  const buttonClasses = `${classes.button} ${sizeClassMap[size]}`;

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
};

export default MyButton;
