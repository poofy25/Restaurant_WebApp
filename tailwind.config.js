/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary':{
          DEFAULT : '#1b1a1b',
          light: 'rgb(37, 36, 37)',
          lighter: 'rgb(57, 56, 57)'
        }
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}