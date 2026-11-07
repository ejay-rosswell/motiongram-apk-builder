import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const IosMessageBubble = ({
  message,
  isDark = false,
  onReact,
  onDelete
}) => {
  const isOut = message.sender === 'out';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 350 }}
      className={`relative flex w-full mb-2.5 ${isOut ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-[78%] px-3.5 pt-2 pb-2 rounded-[18px] text-[15.5px] leading-[1.38] shadow-sm select-none break-words ${
          isOut
            ? isDark
              ? 'bg-[#2B5278] text-white rounded-br-[4px]'
              : 'bg-[#E1FEC6] text-slate-900 rounded-br-[4px]'
            : isDark
            ? 'bg-[#182533] text-white rounded-bl-[4px]'
            : 'bg-white text-slate-900 rounded-bl-[4px]'
        }`}
      >
        {/* Message Content */}
        <p className="mr-14 whitespace-pre-wrap">{message.text}</p>

        {/* Message Metadata (Time & Ticks) */}
        <div className="absolute right-2.5 bottom-1 flex items-center space-x-1 select-none pointer-events-none">
          <span
            className={`text-[11px] ${
              isOut
                ? isDark
                  ? 'text-sky-200/80'
                  : 'text-emerald-700/80 font-medium'
                : 'text-slate-400 font-normal'
            }`}
          >
            {message.time}
          </span>
          {isOut && (
            <span className={isDark ? 'text-sky-300' : 'text-emerald-600'}>
              {message.status === 'read' ? (
                <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Check className="w-3.5 h-3.5 stroke-[2]" />
              )}
            </span>
          )}
        </div>

        {/* Reaction Pill if present */}
        {message.reaction && (
          <div
            onClick={() => onReact && onReact(message.id)}
            className="absolute -bottom-3 left-3 bg-white dark:bg-[#1E2C3A] shadow-md border border-slate-200 dark:border-slate-700/60 rounded-full px-1.5 py-0.5 text-xs flex items-center space-x-1 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          >
            <span>{message.reaction}</span>
            <span className="text-[10px] text-slate-500 font-semibold">1</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
