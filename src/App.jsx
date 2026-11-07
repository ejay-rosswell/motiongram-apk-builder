import React, { useState, useRef, useEffect } from 'react';
import { IosStatusBar } from './components/IosStatusBar';
import { IosChatHeader } from './components/IosChatHeader';
import { IosMessageBubble } from './components/IosMessageBubble';
import { IosInputBar } from './components/IosInputBar';
import { IosTabBar } from './components/IosTabBar';
import { IosProfileModal } from './components/IosProfileModal';
import { MotionControls } from './components/MotionControls';
import { ChatManager } from './components/ChatManager';
import { initialChatState } from './data/initialData';
import { motion, AnimatePresence } from 'framer-motion';
import RecordRTC from 'recordrtc';
import confetti from 'canvas-confetti';
import { Sparkles, Shield, Gem, Smartphone, Play, Video } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState(initialChatState.profile);
  const [partner, setPartner] = useState(initialChatState.chatPartner);
  const [messages, setMessages] = useState(initialChatState.messages);
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [senderType, setSenderType] = useState('out');

  // Motion Graphics & Recording States
  const [cameraZoom, setCameraZoom] = useState(1.0);
  const [isPlayingPreset, setIsPlayingPreset] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [touchIndicator, setTouchIndicator] = useState(null); // { x, y, visible }
  const [tipOverlayText, setTipOverlayText] = useState(null);

  const phoneFrameRef = useRef(null);
  const recorderRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Auto-scroll messages in preview
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPlayingPreset]);

  // Handle Send Message
  const handleSendMessage = (text, type = senderType) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: type,
      text: text,
      time: timeStr,
      status: 'read',
      reaction: null
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Trigger Reaction
  const handleReaction = (msgId) => {
    const emojis = ['🔥', '❤️', '👏', '🎉', '⚡', '🚀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, reaction: randomEmoji } : m))
    );
  };

  // Trigger Cinematic Telegram Tips Preset Animation
  const triggerTelegramTipsPreset = async () => {
    if (isPlayingPreset) return;
    setIsPlayingPreset(true);
    setTipOverlayText("TIP 1: Schedule Silent Messages");

    // Camera zooms dynamically into chat
    setCameraZoom(1.15);
    await new Promise((r) => setTimeout(r, 1200));

    // Simulate animated tap pointer
    setTouchIndicator({ x: '70%', y: '85%', visible: true });
    await new Promise((r) => setTimeout(r, 600));
    setTouchIndicator(null);

    // Inbound animation message
    handleSendMessage("🤫 Send silently without alerting the recipient's notifications", "in");
    await new Promise((r) => setTimeout(r, 1200));

    // Camera zooms into reply
    setCameraZoom(1.22);
    setTipOverlayText("TIP 2: TON NFT Badges & Fragment");
    await new Promise((r) => setTimeout(r, 800));

    // Simulating outbound response
    handleSendMessage("⭐️ Premium Collectible badge activated on Telegram Fragment!", "out");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    await new Promise((r) => setTimeout(r, 1800));
    setCameraZoom(1.0);
    setTipOverlayText(null);
    setIsPlayingPreset(false);
  };

  // Video Screen Recording (WebRTC & Canvas Screen Capture)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
          frameRate: 60,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      mediaStreamRef.current = stream;

      const recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
        frameRate: 60
      });
      recorder.startRecording();
      recorderRef.current = recorder;
      setIsRecording(true);
      setRecordedVideoUrl(null);

      // Listen for user stopping stream via browser native UI
      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
    } catch (err) {
      console.warn("Screen record request cancelled or not supported:", err);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      setIsRecording(false);

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col items-center p-4 lg:p-8">
      {/* Top Application Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between py-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center space-x-3">
          <img
            src="/motiongram-logo.svg"
            alt="MotionGram Logo"
            className="w-10 h-10 drop-shadow-[0_0_15px_rgba(42,171,238,0.5)]"
          />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent flex items-center gap-2">
              MotionGram
              <span className="text-[11px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-md">
                iOS 1:1 Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Telegram Tips Style Motion Graphics Video Generator & 1:1 iOS Sandbox
            </p>
          </div>
        </div>

        {/* Telegram API Credential Pill */}
        <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">API ID:</span>
          <span className="font-mono text-white font-semibold">31757989</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Hash:</span>
          <span className="font-mono text-emerald-400 font-semibold truncate max-w-[90px]">c75cf21b...</span>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-center gap-8">
        
        {/* Left Column: Motion Controls & Chat Director */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Master Motion Video Director Bar */}
          <MotionControls
            isRecording={isRecording}
            onStartRecord={startRecording}
            onStopRecord={stopRecording}
            isPlayingPreset={isPlayingPreset}
            onTriggerPreset={triggerTelegramTipsPreset}
            cameraZoom={cameraZoom}
            onChangeZoom={(z) => setCameraZoom(z)}
            recordedVideoUrl={recordedVideoUrl}
            onDownloadVideo={() => {}}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
          />

          {/* Chat & Profile Sandbox Controls */}
          <ChatManager
            messages={messages}
            onAddMessage={handleSendMessage}
            onClearMessages={() => setMessages([])}
            onOpenProfile={() => setIsProfileOpen(true)}
            senderType={senderType}
            onToggleSender={() => setSenderType(senderType === 'out' ? 'in' : 'out')}
          />

          {/* User Profile & NFT Showcase Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Gem className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">Active Profile & TON Collectibles</span>
              </div>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="text-xs text-sky-400 hover:underline font-semibold"
              >
                Configure
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-500/50"
              />
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-sm text-white truncate">{profile.name}</span>
                  {profile.isVerified && (
                    <span className="w-3.5 h-3.5 bg-sky-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  )}
                  {profile.isPremium && (
                    <span className="text-amber-400 text-xs">⭐</span>
                  )}
                </div>
                <div className="text-xs text-slate-400">@{profile.username} • {profile.phone}</div>
              </div>
            </div>

            {/* Collectibles pills */}
            <div className="grid grid-cols-3 gap-2">
              {profile.nftCollectibles.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-2 flex flex-col items-center text-center shadow-xs"
                >
                  <span className="text-lg mb-1">{c.icon}</span>
                  <span className="text-[11px] font-bold text-slate-200 truncate w-full">{c.name}</span>
                  <span className="text-[9px] font-semibold text-sky-400">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 1:1 Pixel-Perfect iOS Telegram Phone Mockup */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center sticky top-6">
          <div className="text-center mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-sky-400" />
              1:1 iOS Telegram Live Canvas
            </span>
          </div>

          {/* iPhone Mockup Frame with Smooth Spring Scaling for Cinematic Zooms */}
          <motion.div
            ref={phoneFrameRef}
            animate={{ scale: cameraZoom }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className={`relative w-[375px] h-[760px] rounded-[50px] shadow-phone-mockup border-[8px] border-[#1f242d] overflow-hidden flex flex-col select-none ${
              isDark ? 'bg-[#0E1621]' : 'bg-[#EFEFF4]'
            }`}
          >
            {/* Telegram iOS Chat Pattern Wallpaper */}
            <div
              className={`absolute inset-0 z-0 pointer-events-none ${
                isDark ? 'telegram-dark-pattern' : 'telegram-pattern'
              }`}
            />

            {/* iOS Dynamic Island Status Bar */}
            <IosStatusBar time="9:41" isDark={isDark} />

            {/* iOS Translucent Header */}
            <IosChatHeader
              partner={partner}
              isDark={isDark}
              onProfileClick={() => setIsProfileOpen(true)}
              unreadCount={2}
            />

            {/* Cinematic Motion Tip Callout Banner (Telegram Tips official style) */}
            <AnimatePresence>
              {tipOverlayText && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="absolute top-20 left-4 right-4 z-40 bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 border border-sky-400/40"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  <span className="text-xs font-extrabold tracking-wide uppercase">
                    {tipOverlayText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Touch Ripple Pointer for Telegram Tips simulation */}
            <AnimatePresence>
              {touchIndicator?.visible && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ left: touchIndicator.x, top: touchIndicator.y }}
                  className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-500/40 border-2 border-sky-400 shadow-[0_0_15px_rgba(42,171,238,0.8)]"
                />
              )}
            </AnimatePresence>

            {/* Chat Messages List (iOS Spring Bubble Physics) */}
            <div className="flex-1 overflow-y-auto px-3.5 py-3 relative z-10 space-y-1 scroll-smooth">
              {/* Date Header Pill */}
              <div className="flex justify-center my-2">
                <span
                  className={`text-[12px] font-medium px-2.5 py-0.5 rounded-full shadow-xs ${
                    isDark
                      ? 'bg-[#182533]/80 text-slate-300'
                      : 'bg-black/20 text-white backdrop-blur-xs'
                  }`}
                >
                  Today
                </span>
              </div>

              {messages.map((msg) => (
                <IosMessageBubble
                  key={msg.id}
                  message={msg}
                  isDark={isDark}
                  onReact={handleReaction}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* iOS Input Bar */}
            <IosInputBar
              isDark={isDark}
              onSendMessage={handleSendMessage}
              senderType={senderType}
              onToggleSender={() => setSenderType(senderType === 'out' ? 'in' : 'out')}
            />

            {/* iOS Bottom Navigation Tab Bar */}
            <IosTabBar
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab)}
              isDark={isDark}
              unreadChats={3}
            />

            {/* iPhone Home Indicator Bar */}
            <div className="w-full flex justify-center pb-1.5 pt-0.5 bg-transparent z-30">
              <div
                className={`w-36 h-1 rounded-full ${
                  isDark ? 'bg-white/40' : 'bg-black/30'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Edit Profile & NFT Modal */}
      {isProfileOpen && (
        <IosProfileModal
          profile={profile}
          onUpdateProfile={(updated) => setProfile(updated)}
          onClose={() => setIsProfileOpen(false)}
          isDark={isDark}
        />
      )}
    </div>
  );
}
