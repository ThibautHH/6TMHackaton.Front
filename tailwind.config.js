/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  colors: {
    primary: '#1F1F1F',
    secondary: {
      100: '#f6fffb',
      200: '#edfff7',
      300: '#e3fff2',
      400: '#daffee',
      500: '#d0ffe9'
    },
    tertiary: '#0D1414',
    black: {
      0: '#FFFFFF',
      25: '#FCFCFE',
      50: '#F9FAFB',
      100: '#F1F4F7',
      200: '#E9ECF0',
      300: '#D9DCDF',
      400: '#a1a4a9',
      500: '#72747A',
      600: '#50565E',
      700: '#3A424E',
      800: '#414141',
      900: '#0D1414',
      1000: '#000'
    },
    fuze: {
      1: '#5B4A98',
      2: '#7f56d9',
      3: '#C4C2FF'
    },
    cyber: {
      1: '#95DAF0',
      2: '#C2EEFB'
    },
    agri: {
      1: '#CE6CA7',
      2: '#E2AACC'
    },
    white: '#FFFFFF'
  },
  fontFamily: {
    black: ['Poppins-Black', 'sans-serif'],
    bold: ['Poppins-Bold', 'sans-serif'],
    light: ['Poppins-Light', 'sans-serif'],
    medium: ['Poppins-Medium', 'sans-serif'],
    regular: ['Poppins-Regular', 'sans-serif'],
    thin: ['Poppins-Thin', 'sans-serif']
  },
  extend: {
    scale: {
      99: '.99',
      101: '1.01',
      102: '1.02'
    }
  }
};
export const plugins = [];
