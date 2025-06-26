/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // or ./pages if using pages dir
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Verdana", "Open Sans"', "Arial", "sans-serif"],
      },
      colors: {
        primary: "#3b82f6", // Tailwind's blue-500
        "primary-foreground": "#ffffff", // white

        secondary: "#e5e7eb", // Tailwind's gray-200
        "secondary-foreground": "#111827", // gray-900

        destructive: "#dc2626", // Tailwind's red-600
        "destructive-foreground": "#ffffff", // white

        accent: "#f3f4f6", // light gray for hover (optional)
        "accent-foreground": "#111827", // dark gray for contrast

        background: "#ffffff", // fallback bg
        foreground: "#000000", // fallback text
        border: "#e5e7eb", //
      },
    },
  },
  plugins: [],
};
