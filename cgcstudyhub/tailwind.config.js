/** @type {import('tailwindcss').Config} */
// export const darkMode = 'class';
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  theme :{
  extend: {
    colors: {
      test: "#00d9ff",
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      heading: ["Inter", "ui-sans-serif", "system-ui"],
    },
  },
},
}
    export const plugins = [];
