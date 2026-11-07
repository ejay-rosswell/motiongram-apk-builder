import React from 'react';
import { Video, Sparkles, RefreshCw, ZoomIn, Eye, Play, StopCircle, Download } from 'lucide-react';

export const MotionControls = ({
  isRecording,
  onStartRecord,
  onStopRecord,
  isPlayingPreset,
  onTriggerPreset,
  cameraZoom,
  onChangeZoom,
  recordedVideoUrl,
  onDownloadVideo,
  isDark,
  onToggleTheme
}) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md mb-4 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <div className={`w-3.5 h-3.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
            <div className={`absolute w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500' : 'bg-emerald-500'}`} />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center space-x-1.5 text-white">
              <span>Telegram Tips Motion Studio</span>
              <span className="text-[10px] bg-sky-500/20 text-sky-400 font-semibold px-2 py-0.5 rounded-full border border-sky-500/30">
                60 FPS
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {isRecording ? "🔴 Recording live motion video..." : "Ready to animate & record 1:1 iOS scenes"}
            </div>
          </div>
        </div>

        {/* Center: Presets & Zoom triggers */}
        <div className="flex items-center space-x-2">
          {/* Zoom Level Switcher */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700/60 text-xs">
            <span className="px-2 text-slate-400 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" />
              Zoom:
            </span>
            {[1.0, 1.15, 1.3].map((z) => (
              <button
                key={z}
                onClick={() => onChangeZoom(z)}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  cameraZoom === z
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {z}x
              </button>
            ))}
          </div>

          {/* Quick Telegram Tips Demo Action */}
          <button
            onClick={onTriggerPreset}
            disabled={isPlayingPreset}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isPlayingPreset ? 'Playing Tip Motion...' : 'Play Tips Motion FX'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            {isDark ? '☀️ iOS Light' : '🌙 iOS Dark'}
          </button>
        </div>

        {/* Right: Master Record Button */}
        <div className="flex items-center space-x-2">
          {!isRecording ? (
            <button
              onClick={onStartRecord}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-red-900/40 hover:shadow-red-700/50 active:scale-95 transition-all"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>RECORD MOTION VIDEO</span>
            </button>
          ) : (
            <button
              onClick={onStopRecord}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-slate-950 rounded-xl text-xs font-extrabold shadow-lg hover:bg-slate-100 active:scale-95 transition-all"
            >
              <StopCircle className="w-4 h-4 text-red-600" />
              <span>STOP & RENDER</span>
            </button>
          )}

          {recordedVideoUrl && (
            <a
              href={recordedVideoUrl}
              download="telegram-motion-tip.webm"
              onClick={onDownloadVideo}
              className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all animate-bounce"
            >
              <Download className="w-4 h-4" />
              <span>Download Video</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
