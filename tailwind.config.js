/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: '#007AFF',
          telegram: '#2AABEE',
          bgLight: '#EFEFF4',
          bubbleOut: '#E1FEC6',
          bubbleIn: '#FFFFFF',
          bubbleOutDark: '#2B5278',
          bubbleInDark: '#182533',
          bgDark: '#0E1621',
          headerDark: '#17212B',
          textMuted: '#8E8E93',
          border: '#C6C6C8',
          nftGold: '#F5A623',
          tonBlue: '#0098EA',
          nftPurple: '#8E24AA'
        }
      },
      fontFamily: {
        sf: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'ios-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'ios-card': '0 2px 10px rgba(0,0,0,0.05)',
        'phone-mockup': '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 12px #1C1C1E, 0 0 0 14px #2C2C2E',
      }
    },
  },
  plugins: [],
}
