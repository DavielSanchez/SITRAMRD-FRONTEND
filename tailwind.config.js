/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                orangeColor: "rgb(var(--primary-orange-color))",
                purpleColor: "rgb(var(--primary-purple-color))",
                colorDark: "rgb(var(--color-dark))",
                colorLight: "rgb(var(--color-light))",
                bgDark: "rgb(var(--bg-dark))",
                bgLight: "rgb(var(--bg-light))",
            },
        },
    },
    plugins: [],
};