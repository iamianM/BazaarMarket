/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'tremble': 'shake 0.5s infinite',
        'motion': 'gradient 15s ease infinite'
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
          '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
          '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
          '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
          '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
          '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
          '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
          '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
          '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
          '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
        },
        gradient: {
          '0%': {},
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
    fontFamily: {
      'poppins': ['poppins', 'sans-serif'],
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: ["acid", "light", "dark", "emerald", "corporate", "synthwave", "cyberpunk", "valentine", "halloween", "garden", "aqua", "pastel", "fantasy", "luxury", "dracula", "cmyk", "autumn", "business", "lemonade", "night"],
  },
};
