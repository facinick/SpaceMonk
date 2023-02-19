/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    prefix: '',
  },
}
