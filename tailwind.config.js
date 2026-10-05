/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F9FF',
        surface: '#FFFFFF',
        soft: '#EFF4FF',
        'soft-blue': '#DCE9FF',
        ink: '#0B1C30',
        navy: '#131B2E',
        muted: '#667085',
        border: '#D8DEE9',
        brand: '#0866CE',
        mint: '#6FFBBE',
        success: '#009668',
        'success-soft': '#E6FAF2',
        danger: '#D92D20',
        'danger-soft': '#FFF0F0',
        amber: '#B54708',
        'amber-soft': '#FFF4E5',
      },
    },
  },
  plugins: [],
};
