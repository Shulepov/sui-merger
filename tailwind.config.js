/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  media: true, // or 'media' or 'class'
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-1': '#181A1F',
        'dark-2': '#202228',
        'dark-3': '#282B33',
        'blue-1': '#4E6ED8',
        'blue-2': '#5E7EE8'
      }
    }
  },
  plugins: [],
};
