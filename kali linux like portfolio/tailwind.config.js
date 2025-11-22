/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kali: {
          bg: '#0a0a0a', // Very dark grey/black
          header: '#1f1f1f', // Dark grey for headers
          accent: '#2b2b2b', // Slightly lighter grey
          blue: '#2d8cf0', // Kali Blue
          cyan: '#00f3ff', // Kali Cyan (often used in terminal)
          text: '#e6e6e6', // Off-white text
          muted: '#a0a0a0', // Muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
