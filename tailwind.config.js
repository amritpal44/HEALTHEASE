/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'home-buildings': "url('/src/assests/images/homepagebackground.jpg')"
      // }
    },
    fontFamily: {
      'clarity-city': ['Clarity City', 'sans']
    }
  },
  plugins: [],
}