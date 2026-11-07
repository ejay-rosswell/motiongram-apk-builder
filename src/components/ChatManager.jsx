import React from 'react';
import { Plus, User, MessageCircle, RefreshCw, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const ChatManager = ({
  messages,
  onAddMessage,
  onClearMessages,
  onOpenProfile,
  senderType,
  onToggleSender
}) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md mb-4 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-bold text-white">Interactive Sandbox & Chat Editor</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Edit Profile & NFTs</span>
          </button>
          <button
            onClick={onClearMessages}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-400 rounded-xl text-xs font-medium border border-red-800/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Inbound / Outbound Simulator */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">Current Next Message Sender:</span>
          <button
            onClick={onToggleSender}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
              senderType === 'out'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                : 'bg-sky-600/30 text-sky-300 border border-sky-500/50'
            }`}
          >
            {senderType === 'out' ? (
              <>
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>You (Right / Outgoing)</span>
              </>
            ) : (
              <>
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Tips Channel (Left / Incoming)</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Action Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 mr-1">Quick presets:</span>
          <button
            onClick={() => onAddMessage("🔥 Did you know? You can double tap messages to trigger quick reactions!", "in")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700"
          >
            + Reaction Tip
          </button>
          <button
            onClick={() => onAddMessage("💎 Collected 1 rare TON username on Fragment.com", "out")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700"
          >
            + NFT Claim
          </button>
          <button
            onClick={() => onAddMessage("Hold the Send button to send without sound or schedule delivery 📅", "in")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700"
          >
            + Schedule Tip
          </button>
        </div>
      </div>
    </div>
  );
};
