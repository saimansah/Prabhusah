"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-inner",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer z-10",
              isActive
                ? "text-slate-950 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-gradient-to-r from-saffron-400 to-amber-500 rounded-xl shadow-glow-saffron -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                  isActive
                    ? "bg-slate-950/20 text-slate-950"
                    : "bg-slate-800 text-slate-400"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
