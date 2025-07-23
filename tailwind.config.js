module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ['bg-white', 'bg-red-500', 'bg-blue-500'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
        },
      },
      keyframes: {
        blinkBlue: {
          '0%, 100%': { color: '#3B82F6' },   // azul-500
          '50%': { color: '#60A5FA' }         // azul-400
        },
      },
      animation: {
        blinkBlue: 'blinkBlue 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
