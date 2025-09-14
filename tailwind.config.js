/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        arrowMove: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "50%": { transform: "translateX(6px)", opacity: "0.7" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },

        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.01)" },
        },

        "glow-button": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)" },
          "50%": {
            boxShadow:
              "0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)",
          },
        },

        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },

        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },

        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },

        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideIn: {
          "0%": { transform: "translateX(120%)", opacity: 0 },
          "60%": { transform: "translateX(-5%)", opacity: 1 },
          "100%": { transform: "translateX(0)" },
        },

        dropDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },

        staggerIn: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },

      animation: {
        arrowMove: "arrowMove 1.2s ease-in-out infinite",

        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "glow-button": "glow-button 2s ease-in-out infinite",

        "fade-in": "fade-in 1s ease-out forwards",
        scaleIn: "scaleIn 0.3s ease-out",
        pop: "pop 0.4s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        slideIn: "slideIn 0.6s ease-out forwards",

        dropDown: "dropDown 0.5s ease-out forwards",
        staggerIn: "staggerIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
