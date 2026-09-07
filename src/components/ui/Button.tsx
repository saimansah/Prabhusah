import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-saffron-500 to-amber-600 text-slate-950 font-semibold shadow-glow-saffron hover:from-saffron-400 hover:to-amber-500 hover:shadow-lg border border-saffron-300/30",
    secondary:
      "bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 backdrop-blur-md shadow-sm dark:text-slate-100 dark:bg-slate-800/80",
    outline:
      "border border-slate-600/80 text-slate-200 hover:bg-slate-800/60 hover:border-saffron-500/60 backdrop-blur-md",
    danger:
      "bg-gradient-to-r from-crimson-600 to-rose-700 text-white shadow-glow-crimson hover:from-crimson-500 hover:to-rose-600 border border-crimson-400/30",
    ghost:
      "text-slate-300 hover:text-white hover:bg-slate-800/50",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
