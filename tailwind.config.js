/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  colors: {
    primary: '#2B93D0',
    secondary: '#F9F871',
    tertiary: '#F87171',
    black: '#000000',
    white: '#FFFFFF'
  },
  fontFamily: {
  },
  extend: {
    scale: {
      99: '.99',
      101: '1.01'
    }
  }
};
export const plugins = [];
