/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(8, minmax(0, 1fr))',
        'auto-fill-new': 'repeat(auto-fill, minmax(64px, 1fr))',
      },
      gridTemplateRows: {
        'auto-fill': 'repeat(16, minmax(0, 1fr))',
        'auto-fill-new': 'repeat(auto-fill, minmax(64px, 1fr))',
      },
    },
  },
  plugins: [],
}