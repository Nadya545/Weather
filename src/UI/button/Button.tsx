import React from "react";
import classes from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "normal" | "big";
  active?: boolean;
}

const sizeClassMap = {
  small: classes.small,
  normal: classes.normal,
  big: classes.big,
};
const Button: React.FC<ButtonProps> = ({
  children,
  size = "small",
  active = false,
  className = "",
  ...props
}) => {
  const buttonClasses = `${classes.button} ${sizeClassMap[size]} ${
    active ? classes.active : ""
  } ${className}`.trim();

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
