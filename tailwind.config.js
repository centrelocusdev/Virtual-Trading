/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      padding: {
        '4.1': "18px"
      },
      borderRadius: {
        '2lg': "10px",
        '4xl': '30px'
      },
      fontSize: {
        '5.1xl': '56px'

      },
      colors: {
        'bg_Dark': '#0D1B27;',
        'bg_Medium': "#90FAEA",
        'bg_Light': '#CEFFF8;',
        'font_blue1': '#0F4C81',
        'blue2': "rgba(15, 76, 129, 0.50)",
        'gray1': "#586166",
        'gray2': "#343D42",
        'gray3': "#8D9396",
        'gray4': "#3C4043",
        'gray5': "#5B5B5B",
        'gray6': "#F5F5F5",
        "gray7": "#CACACA",
        'black1': "#353535",
      },
    },
  },
  plugins: [],
}

