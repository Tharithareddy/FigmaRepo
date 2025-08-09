/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors from Figma design
        primary: '#your-color',
        secondary: '#your-color',
      },
      fontFamily: {
        // Add custom fonts from Figma
        'custom': ['YourFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}