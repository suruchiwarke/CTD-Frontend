/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tungsten: ['Tungsten', 'sans-serif'],
        'tungsten-compressed': ['TungstenCompressed', 'Tungsten', 'sans-serif'],
        aldrich: ['Aldrich', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ctd: {
          dark: '#0a0512',
          purple: '#9d4edd',
          'purple-light': '#c77dff',
          'purple-glow': '#b5179e',
          peach: '#ffd1bd',
          'peach-light': '#fed7aa',
          gold: '#f9d29b',
          card: 'rgba(25, 12, 38, 0.65)',
          'card-border': 'rgba(216, 150, 255, 0.35)',
          'card-glow': 'rgba(199, 125, 255, 0.25)',
          errorBg: '#f6dcd2',
          errorBorder: '#842626',
          errorText: '#7b1e1e',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #fed7aa 100%)',
        'btn-gradient': 'linear-gradient(90deg, #9333ea 0%, #d946ef 50%, #fed7aa 100%)',
        'btn-gradient-hover': 'linear-gradient(90deg, #a855f7 0%, #f472b6 50%, #ffedd5 100%)',
        'text-gradient': 'linear-gradient(90deg, #c084fc 0%, #f472b6 40%, #fed7aa 100%)',
        'title-gradient': 'linear-gradient(180deg, #e9d5ff 0%, #d8b4fe 40%, #ffedd5 100%)',
      },
      boxShadow: {
        'neon-purple': '0 0 25px -3px rgba(168, 85, 247, 0.45), 0 0 10px -2px rgba(168, 85, 247, 0.3)',
        'neon-glow': '0 0 20px rgba(192, 132, 252, 0.4), inset 0 0 15px rgba(192, 132, 252, 0.1)',
        'card-glow': '0 8px 32px 0 rgba(31, 10, 50, 0.45), 0 0 15px rgba(192, 132, 252, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
