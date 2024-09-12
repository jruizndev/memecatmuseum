/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "20px": "20px",
        "24px": "24px", // Agrega un tamaño mayor aquí
        "28px": "28px", // Agrega otro tamaño mayor si es necesario
      },
      letterSpacing: {
        "3px": "3px",
      },
    },
  },
  plugins: [],
};
