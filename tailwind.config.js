/** @type {import('tailwindcss').Config} */
export default {
    content: ['./client/index.html', './client/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('tailwind-scrollbar')],
};
