/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}",   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        questrial: ["Questrial", "sans-serif"], // Agrega Questrial
        poppins: ["Poppins", "sans-serif"], // Agrega Poppins
        open: ["Open Sans", "sans-serif"], // Agrega Poppins
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover', 'focus', 'dark'],
      backgroundColor: ['hover', 'focus', 'dark'],
    },
  },
  plugins: [
    require('flowbite/plugin')
]

}

