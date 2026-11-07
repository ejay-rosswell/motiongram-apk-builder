import React, { useState } from 'react';
import { Paperclip, Smile, Mic, ArrowUp } from 'lucide-react';

export const IosInputBar = ({
  isDark = false,
  onSendMessage,
  senderType = 'out',
  onToggleSender
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text, senderType);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`w-full px-3 py-2 border-t flex items-end space-x-2 select-none z-20 ${
        isDark
          ? 'bg-[#17212B]/95 border-[#101921] text-white'
          : 'bg-[#F6F6F6]/95 border-slate-300/70 text-slate-900'
      } backdrop-blur-md`}
    >
      {/* Attachment Button */}
      <button className="p-1.5 text-slate-400 hover:text-sky-500 transition-colors">
        <Paperclip className="w-6 h-6 stroke-[1.8]" />
      </button>

      {/* Input Field Container */}
      <div
        className={`flex-1 flex items-center rounded-2xl px-3 py-1.5 border transition-colors ${
          isDark
            ? 'bg-[#0E1621] border-slate-700/60 focus-within:border-sky-500'
            : 'bg-white border-slate-200 focus-within:border-sky-500'
        }`}
      >
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
          className="w-full bg-transparent resize-none outline-none text-[16px] leading-[1.3] placeholder-slate-400 max-h-24"
        />
        <button className="text-slate-400 hover:text-sky-500 transition-colors ml-1">
          <Smile className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

      {/* Mic or Send Button */}
      {text.trim().length > 0 ? (
        <button
          onClick={handleSend}
          className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 active:scale-95 transition-all shadow-sm"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      ) : (
        <button className="p-1.5 text-slate-400 hover:text-sky-500 transition-colors">
          <Mic className="w-6 h-6 stroke-[1.8]" />
        </button>
      )}
    </div>
  );
};
