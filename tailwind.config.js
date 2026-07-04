// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08070a",
          soft: "#0f0d12",
          panel: "#14111a",
        },
        wine: {
          DEFAULT: "#6e1423",
          light: "#9a2b3a",
          dark: "#3d0c14",
        },
        ember: {
          DEFAULT: "#c48a4a",
          light: "#e0b077",
        },
        ash: {
          DEFAULT: "#c9c2c6",
          muted: "#8a8288",
          dim: "#5c565b",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.85 },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        ember: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: 0 },
          "10%": { opacity: 1 },
          "100%": {
            transform: "translateY(-120vh) translateX(var(--drift, 20px))",
            opacity: 0,
          },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        ember: "ember linear infinite",
      },
    },
  },
  plugins: [],
};
