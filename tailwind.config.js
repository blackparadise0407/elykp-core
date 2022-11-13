/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
    './src/contexts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('/img/login-bg.jpg')",
        abstractBg: "url('/img/abstract-bg.jpg')",
        blobBg: "url('/img/blob-bg.jpg')",
        abstractBlueBg: "url('/img/abstract-blue.jpg')",
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', 'serif'],
      sfui: ['SF UI Text', 'serif'],
    },
  },
  plugins: [],
};
