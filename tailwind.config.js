/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      height:{
        'h-97.1': "34rem",
        'h-98': "37rem",
        'h-98.1': "40rem",
        'h-99': "44rem",
        'h-100': "64rem"
      },
      top:{
        "top_42": "42rem"
      },
      width: {
        "0.87": "87%"
      },
      screens: {
        'esm': '200px'
      },
      padding: {
        '4.1': "18px",
        '15': "60px"
      },
      borderRadius: {
        '2lg': "10px",
        '2xl.1': "20px",
        '4xl': '30px',
        '5xl': "50px",
        'largest': "4.75rem"
      },
      fontSize: {
        'xl.1': "22px",
        '2xl.1': "28px",
        '5.1xl': '56px'

      },
      colors: {
        'bg_Dark': '#0D1B27;',
        'bg_Medium': "#90FAEA",
        'bg_Light': '#CEFFF8;',
        'font_blue1': '#0F4C81',
        'blue2': "rgba(15, 76, 129, 0.50)",
        "blue3": "#171C51",
        'blue4': "#6296C4",
        'blue5': "#B3DCFF",
        'blue6': "rgba(144, 250, 234, 0.20)",
        'blue7': "#1067B3",
        'blue8': "#CDE5FB",
        'gray1': "#586166",
        'gray2': "#343D42",
        'gray3': "#8D9396",
        'gray4': "#3C4043",
        'gray5': "#5B5B5B",
        'gray6': "#F5F5F5",
        "gray7": "#CACACA",
        'gray9': "#FDFDFD",
        "gray8": "rgba(0, 0, 0, 0.46)",
        'black1': "#353535",
        'link_active': "#0000EE",
        'link_visited': "#551A8B",
        'select_arrow': "#4a5568",
        'brown1': "#5B5B5B",
        'red1': "#B53759",
        'green1': "#3DA864",
        'yellow1': '#FFD12E',
        'yellow2': "#E1AB20",
      },
      letterSpacing: {
        "low": "1px"
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      inter: ['inter' , 'sans-serif'],
      sora: ['Sora' , 'sans-serif'],
      montserrat: ['Montserrat' , 'sans-serif'],
      amiko: ['Amiko', 'sans-serif'],
      lato: ['Lato' , 'sans-serif']
    },
    boxShadow: {
      box: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
    }
  },
  plugins: [],
}

