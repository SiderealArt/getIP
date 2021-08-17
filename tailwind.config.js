module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => 
      ({"hero-pattern": "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('./output.webp')",
    }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

