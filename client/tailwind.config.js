/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chat: '#40444b',
        nav: '#1DA1F2'
      },
    },
  },
  plugins: [],
}

