/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#f57224',
      },
    },
  },
  plugins: [],
}
