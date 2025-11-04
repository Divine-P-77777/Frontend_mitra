import React from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div className="p-3 rounded-xl bg-white/95 shadow-sm flex items-center gap-3 hover:shadow-md transition">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#f3f4f6] text-xl text-gray-700">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
