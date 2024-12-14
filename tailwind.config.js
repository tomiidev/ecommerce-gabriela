/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}",   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  
  plugins: [
    require('flowbite/plugin')
]

}

