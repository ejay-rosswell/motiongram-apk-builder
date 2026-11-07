import React from 'react';
import { MessageSquare, Users, Settings, Phone } from 'lucide-react';

export const IosTabBar = ({
  activeTab = 'chats',
  onSelectTab,
  isDark = false,
  unreadChats = 3
}) => {
  const tabs = [
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'calls', label: 'Calls', icon: Phone },
    { id: 'chats', label: 'Chats', icon: MessageSquare, badge: unreadChats },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className={`w-full px-4 pt-1.5 pb-5 flex items-center justify-around border-t select-none z-20 ${
        isDark
          ? 'bg-[#17212B]/95 border-[#101921]'
          : 'bg-[#F6F6F6]/95 border-slate-300/60'
      } backdrop-blur-lg`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className="relative flex flex-col items-center justify-center flex-1 py-1 transition-transform active:scale-90"
          >
            <div className="relative">
              <Icon
                className={`w-[25px] h-[25px] transition-colors ${
                  isActive
                    ? 'text-sky-500 fill-sky-500/10 stroke-[2.2]'
                    : isDark
                    ? 'text-slate-400 stroke-[1.8]'
                    : 'text-slate-400 stroke-[1.8]'
                }`}
              />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2.5 bg-sky-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full ring-2 ring-white dark:ring-[#17212B]">
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] mt-0.5 font-medium tracking-tight ${
                isActive
                  ? 'text-sky-500 font-semibold'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-slate-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
