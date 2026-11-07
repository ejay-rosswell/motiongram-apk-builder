export const initialChatState = {
  profile: {
    name: "Alex Vance",
    username: "alex",
    phone: "+1 (844) 382-7491",
    bio: "Building next-gen motion graphics & web3",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    isOnline: true,
    lastSeen: "online",
    isVerified: true,
    isPremium: true,
    nftBadge: "Ton Diamond #408",
    nftCollectibles: [
      { id: "ton-1", name: "Durov Cap #1024", rarity: "Epic", icon: "🧢", value: "250 TON" },
      { id: "ton-2", name: "Telegram Star #77", rarity: "Legendary", icon: "⭐", value: "1,500 TON" },
      { id: "ton-3", name: "Golden Plane #007", rarity: "Mythic", icon: "✈️", value: "5,000 TON" }
    ]
  },
  chatPartner: {
    name: "Telegram Tips",
    username: "TelegramTips",
    avatar: "/motiongram-logo.svg",
    isChannel: true,
    subscribers: "9,420,118 subscribers",
    isVerified: true,
    isOnline: false
  },
  messages: [
    {
      id: "m-1",
      sender: "in",
      text: "⚡ Welcome to MotionGram! Here is a cool trick: You can schedule silent messages or customize your Telegram NFT profile.",
      time: "10:41",
      status: "read",
      reaction: "🔥"
    },
    {
      id: "m-2",
      sender: "out",
      text: "Show me how to enable the Fragment collectible username and record motion tips!",
      time: "10:42",
      status: "read",
      reaction: "👏"
    },
    {
      id: "m-3",
      sender: "in",
      text: "Tap the Record button at the top to animate smooth iOS camera zooms, kinetic callout ripples, and auto-export clean 60fps videos! 🎬",
      time: "10:42",
      status: "read",
      reaction: "🚀"
    }
  ]
};
