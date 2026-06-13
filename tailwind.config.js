/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        rw: {
          red: "#C0122A",
          "red-dark": "#8B0D1E",
          "red-light": "#E8223F",
          black: "#0D0D0D",
          dark: "#1A1A1A",
          surface: "#242424",
          card: "#1E1E1E",
          text: "#F0EEE8",
          muted: "#999999",
          silver: "#B0ADA6",
          gold: "#C8960A",
          border: "rgba(192,18,42,0.35)",
        },
      },
      fontFamily: {
        display: ['"Sd Robotics"', "Orbitron", "sans-serif"],
        body: ['"Chakra Petch"', '"Rajdhani"', "sans-serif"],
      },
      boxShadow: {
        "rw-glow": "0 0 24px rgba(192,18,42,0.45)",
        "rw-glow-lg": "0 0 60px rgba(192,18,42,0.55)",
      },
      keyframes: {
        "rw-pulse": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(192,18,42,0.35)" },
          "50%": { boxShadow: "0 0 32px rgba(232,34,63,0.7)" },
        },
        "rw-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "rw-pulse": "rw-pulse 2.4s ease-in-out infinite",
        "rw-float": "rw-float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
