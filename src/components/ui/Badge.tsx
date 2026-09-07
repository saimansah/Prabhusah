import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "saffron" | "crimson" | "emerald" | "slate" | "outline";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "saffron",
  size = "md",
  className,
  icon,
}) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-medium rounded-full tracking-wide transition-colors select-none";

  const variantStyles = {
    saffron:
      "bg-amber-500/10 text-amber-400 border border-amber-500/30 backdrop-blur-sm",
    crimson:
      "bg-rose-500/10 text-rose-400 border border-rose-500/30 backdrop-blur-sm",
    emerald:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm",
    slate:
      "bg-slate-800/80 text-slate-300 border border-slate-700/80 backdrop-blur-sm",
    outline:
      "bg-transparent text-slate-300 border border-slate-700",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5",
    md: "text-xs px-3 py-1",
  };

  return (
    <span className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
