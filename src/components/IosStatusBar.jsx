import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const IosStatusBar = ({ time = "9:41", isDark = false }) => {
  return (
    <div className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors ${
      isDark ? 'text-white' : 'text-slate-900'
    }`}>
      {/* Time */}
      <div className="tracking-tight text-[15px] font-bold pl-1">{time}</div>

      {/* Dynamic Island pill notch representation */}
      <div className="w-28 h-[25px] bg-black rounded-full flex items-center justify-between px-3 shadow-inner">
        <div className="w-2.5 h-2.5 rounded-full bg-[#151515] ring-1 ring-neutral-800" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#0a1e36] ring-1 ring-[#1b4369] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#2AABEE] animate-pulse" />
        </div>
      </div>

      {/* Battery & Signal */}
      <div className="flex items-center space-x-2 text-[13px] pr-1">
        <Signal className="w-4 h-4 fill-current stroke-none" />
        <Wifi className="w-4 h-4 stroke-[2.5]" />
        <div className="relative flex items-center">
          <div className={`w-5 h-2.5 border rounded-sm p-[1px] flex items-center ${isDark ? 'border-white' : 'border-black'}`}>
            <div className={`h-full w-3/4 rounded-2xs ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>
          <div className={`w-[1px] h-1 rounded-r-xs ml-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />
        </div>
      </div>
    </div>
  );
};
