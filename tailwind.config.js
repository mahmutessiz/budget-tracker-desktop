/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "default",
      "cupcake",
      "cyberpunk",
      "wireframe",
      "retro",
      "valentine",
      "luxury",
      "dim",
      "sunset",
    ],
  },
};
