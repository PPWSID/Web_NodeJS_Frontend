// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",  // ค้นหาในไฟล์ Vue และ JavaScript ทั้งหมดในโฟลเดอร์ src
    "./components/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}