import React from 'react';
import { ChevronLeft, Phone, MoreVertical, CheckCheck, Check, Sparkles } from 'lucide-react';

export const IosChatHeader = ({
  partner,
  isDark = false,
  onProfileClick,
  unreadCount = 2
}) => {
  return (
    <div
      className={`w-full px-3 py-2 flex items-center justify-between border-b transition-colors z-20 ${
        isDark
          ? 'bg-[#17212B]/90 border-[#101921] text-white'
          : 'bg-[#F6F6F6]/90 border-slate-300/60 text-slate-900'
      } backdrop-blur-md`}
    >
      {/* Back button with iOS Telegram style */}
      <div className="flex items-center space-x-1 cursor-pointer group select-none text-sky-500 hover:text-sky-600 transition-colors">
        <ChevronLeft className="w-6 h-6 stroke-[2.5] -mr-1" />
        <span className="text-[17px] font-normal tracking-tight">Chats</span>
        {unreadCount > 0 && (
          <span className="bg-sky-500 text-white text-[12px] font-bold px-1.5 py-0.2 rounded-full ml-1">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Center user/channel info */}
      <div
        onClick={onProfileClick}
        className="flex flex-col items-center justify-center cursor-pointer max-w-[200px] truncate"
      >
        <div className="flex items-center space-x-1">
          <span className="text-[16px] font-semibold tracking-tight truncate max-w-[150px]">
            {partner.name}
          </span>
          {partner.isVerified && (
            <span className="w-4 h-4 bg-sky-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
          )}
        </div>
        <span className="text-[12px] text-slate-500 dark:text-slate-400 font-normal">
          {partner.isChannel ? partner.subscribers : partner.lastSeen}
        </span>
      </div>

      {/* Right avatar or action */}
      <div
        onClick={onProfileClick}
        className="relative cursor-pointer hover:opacity-90 transition-opacity"
      >
        <img
          src={partner.avatar}
          alt={partner.name}
          className="w-9 h-9 rounded-full object-cover ring-1 ring-black/10 shadow-sm"
        />
        {partner.isOnline && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>
    </div>
  );
};
