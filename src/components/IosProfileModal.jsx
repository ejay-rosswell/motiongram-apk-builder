import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Gem, QrCode, Phone, AtSign, ChevronRight, Plus, Trash2 } from 'lucide-react';

export const IosProfileModal = ({
  profile,
  onUpdateProfile,
  onClose,
  isDark = false
}) => {
  const [formData, setFormData] = useState({ ...profile });
  const [newCollectibleName, setNewCollectibleName] = useState('');
  const [newCollectibleVal, setNewCollectibleVal] = useState('100 TON');

  const handleSave = () => {
    onUpdateProfile(formData);
    onClose();
  };

  const handleAddCollectible = () => {
    if (!newCollectibleName.trim()) return;
    const item = {
      id: `nft-${Date.now()}`,
      name: newCollectibleName.trim(),
      rarity: 'Rare',
      icon: '💎',
      value: newCollectibleVal
    };
    setFormData({
      ...formData,
      nftCollectibles: [...formData.nftCollectibles, item]
    });
    setNewCollectibleName('');
  };

  const handleRemoveCollectible = (id) => {
    setFormData({
      ...formData,
      nftCollectibles: formData.nftCollectibles.filter((c) => c.id !== id)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[28px] shadow-2xl p-6 border ${
          isDark
            ? 'bg-[#17212B] border-slate-700/60 text-white'
            : 'bg-[#F2F2F7] border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-300/40 dark:border-slate-700/60">
          <button
            onClick={onClose}
            className="text-sky-500 font-medium hover:underline text-sm"
          >
            Cancel
          </button>
          <span className="font-bold text-base">Edit iOS Profile & NFTs</span>
          <button
            onClick={handleSave}
            className="text-sky-500 font-bold hover:underline text-sm"
          >
            Done
          </button>
        </div>

        {/* Avatar & Photo Picker */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative group">
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-sky-500/30 shadow-md"
            />
            {formData.isPremium && (
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full p-1 shadow-md">
                <Sparkles className="w-4 h-4 fill-white" />
              </div>
            )}
          </div>
          <input
            type="text"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            placeholder="Avatar Image URL"
            className="mt-3 text-xs w-full text-center px-3 py-1.5 rounded-lg border bg-white/40 dark:bg-black/30 border-slate-300 dark:border-slate-700 outline-none"
          />
        </div>

        {/* Profile Info Fields */}
        <div className="space-y-3 mb-6">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 ml-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-[#0E1621] border-slate-300 dark:border-slate-700 outline-none text-sm font-medium mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 ml-1">Username / Fragment Collectible</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">@</span>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-8 pr-3 py-2 rounded-xl border bg-white dark:bg-[#0E1621] border-slate-300 dark:border-slate-700 outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 ml-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-[#0E1621] border-slate-300 dark:border-slate-700 outline-none text-sm font-medium mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 ml-1">Bio / About</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-[#0E1621] border-slate-300 dark:border-slate-700 outline-none text-sm font-medium mt-1 resize-none"
            />
          </div>

          {/* Badges Toggles */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium">Telegram Verified Badge</span>
            <input
              type="checkbox"
              checked={formData.isVerified}
              onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
              className="w-5 h-5 accent-sky-500 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Telegram Premium Star</span>
            <input
              type="checkbox"
              checked={formData.isPremium}
              onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
              className="w-5 h-5 accent-sky-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Telegram Collectibles / TON NFTs */}
        <div className="border-t pt-4 border-slate-300/40 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              <Gem className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                TON Collectibles & NFTs
              </span>
            </div>
            <span className="text-xs text-slate-400">{formData.nftCollectibles.length} items</span>
          </div>

          <div className="space-y-2 mb-3">
            {formData.nftCollectibles.map((nft) => (
              <div
                key={nft.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#0E1621] border border-slate-200 dark:border-slate-700/50 shadow-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-xl">{nft.icon}</span>
                  <div>
                    <div className="text-xs font-bold leading-tight">{nft.name}</div>
                    <div className="text-[10px] text-sky-500 font-semibold">{nft.value}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveCollectible(nft.id)}
                  className="text-red-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add custom NFT */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="e.g. Rare Username @motion"
              value={newCollectibleName}
              onChange={(e) => setNewCollectibleName(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border bg-white dark:bg-[#0E1621] border-slate-300 dark:border-slate-700 outline-none text-xs"
            />
            <button
              onClick={handleAddCollectible}
              className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-xs font-bold hover:bg-sky-600 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
