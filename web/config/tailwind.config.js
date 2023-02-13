/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ["night", "light"],
    base: true,
    utils: true,
    prefix: '',
    darkTheme: 'dark',
  },
}
