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
    black: '#000000',
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
