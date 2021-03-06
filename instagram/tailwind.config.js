module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darktheme: {
          body: '#121212',
          button: '#287bcb',
          navbar: '#161616',
        },
        lightheme: {
          100: '#ffffff',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#303030',
        },
      },
    },
  },

  plugins: [],
};
