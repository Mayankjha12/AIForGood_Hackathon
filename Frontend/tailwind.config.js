/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Essential: Tells Tailwind to scan all files in your src folder
      "./public/index.html",
    ],
    theme: {
      extend: {
        // Custom colors matching your CSS variables (e.g., --medium-green)
        colors: {
          'green-600': '#4CAF50', // This is your --medium-green
          'green-500': '#4CAF50', // Duplicated for easy use
          'green-700': '#388E3C', // Hover color (slightly darker)
          'green-50': '#E8F5E9', // Your --light-green-bg
          'gray-300': '#BDBDBD', // Your --subtle-grey
          'gray-800': '#333333', // Your --text-color
          'gray-900/50': 'rgba(0, 0, 0, 0.5)', // Your --dark-overlay
        },
        fontFamily: {
          // Adding your custom fonts for easy use in components
          lato: ['Lato', 'sans-serif'], // Your --font-body
          poppins: ['Poppins', 'sans-serif'], // Your --font-heading
        },
      },
    },
    plugins: [],
  };