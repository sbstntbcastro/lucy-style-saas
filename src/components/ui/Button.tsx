// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  as?: any;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  as: Component = "button",
  className = "",
  ...rest
}) => {
  const base = "rounded-xl font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg active:scale-95",
    secondary: "bg-surface text-white border border-white/10 hover:bg-white/5 shadow active:scale-95",
  }[variant];

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-8 py-4 text-lg",
  }[size];

  return (
    <Component
      className={`${base} ${variantStyles} ${sizeStyles} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
