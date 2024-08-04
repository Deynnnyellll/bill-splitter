/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryOne: '#F5DB54',
        primaryTwo: '#ADB0B9',
        primaryThree: '#996BFF',
        darkOne: '#181A1F',
        darkTwo: '#21242C',
        darkThree: '#19191D',
        lightOne: '#FFFF',
        lightTwo: '#F8F8F',
        lightThree: '#F3F3F5',
        lightFour: '#F3EEFF'
      },
      fontFamily: {
        signika: ["Signika", 'sans-serif']
      }
    },
  },
  plugins: [],
}

