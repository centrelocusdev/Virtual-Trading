/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
    boxShadow: {
      "table": "0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
    },
    minHeight: {
      "24": "24rem",
      '11': "11rem",
      'h-118': "138px",
      'h-71': "91px",
      'h-150': "150px",
      'h-170': "170px",
      'h-400': "400px",
    },
    minWidth:{
      '260': "260px"
    },
      maxWidth: {
        '306': "306px",
        '260': "260px"
      },
      height:{
        "3p": "12px",
        "h-80" :"5rem",
        "h-90": "5.6rem",
        'h-71': "91px",
        'h-118': "138px",
        'h-24h': "24rem",
        'h-30': "30rem",
        'h-31': "32rem",
        'h-97.1': "34rem",
        'h-98': "37rem",
        'h-98.1': "40rem",
        'h-99': "44rem",
        'h-53': "53rem",
        'h-99.1': "60rem",
        'h-100': "64rem",
        'h-68': "68rem",
        'little-screen': "94vh",
        '163': "163px",
      },
      top:{
        "top_42": "42rem"
      },
      width: {
        "3p": "12px",
        "0.87": "80%",
        "w-128": "8rem",
        "w-160": "10rem",
        "306": "306px",
        '260': "260px",
        '270': "270px",
        '11p': "11%"
      },
      screens: {
        'esm': '200px',
        "ipad_pro": "1020px",
        'msm': "450px"
      },
      padding: {
        '4.1': "18px",
        '15': "60px"
      },
      borderRadius: {
        '2lg': "10px",
        '2xl.1': "20px",
        '2xl.2': "25px",
        '4xl': '30px',
        '4xl.1': "40px",
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
        'black2': "#1C1C1C",
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
        "blue9": "#D4EBFF",
        "blue10": "rgba(206, 255, 248, 0.50)",
        'gray1': "#586166",
        'gray2': "#343D42",
        'gray3': "#8D9396",
        'gray4': "#3C4043",
        'gray5': "#5B5B5B",
        'gray6': "#F5F5F5",
        "gray7": "#CACACA",
        'gray9': "#FDFDFD",
        "gray8": "rgba(0, 0, 0, 0.46)",
        "gray10": "#E5ECF6",
        "gray11": "#E0E0E0",
        'gray12': "#031A2E",
        'gray13': "#292929",
        'gray14': "#848484",
        'gray15': "#7A7A7A",
        'gray16': "#EBEDEE",
        'gray17': '#C3C5D4',
        'black1': "#353535",
        'link_active': "#0000EE",
        'link_visited': "#551A8B",
        'select_arrow': "#4a5568",
        'brown1': "#5B5B5B",
        'red1': "#B53759",
        'red2': "#D34645",
        'green1': "#3DA864",
        'yellow1': '#FFD12E',
        'yellow2': "#E1AB20",
        'purple1': "#683AB5",
        'purple2': "#ab7ff5",
        'purple3': "#C19CFF",
        'purple4': "#472E71",
        'green2': "#B6EED4",
        'green3': "#0CAF60",
        'green4': '#367C30',
        'green5': "#8FE8BF",
        'green6': "#F0FBF6",
        'green7': "#ADFBE9",
        'green8': "#F0FBF6",
        'green9': "#EAFAF3",
        'green10': "#E2F9EF",
        'green11': "#FFFAFA",
        'green12': "#F3FDF8",
        'green13': "#46DD97",
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
      lato: ['Lato' , 'sans-serif'],
      manrope: ['Manrope' , 'san-serif']
    },
    boxShadow: {
      box: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      box2: "0px 20px 95px 0px #3DA86499"
    }
  },
  plugins: [],
}

