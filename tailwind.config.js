/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,vue}"],
	theme: {
		extend: {
			colors: {
				myred: "#FF5050",
				vDeep: "#21092F",
				vMd: "#8F8694",
				grey: "#DFDEE0",
			},
			fontFamily: {
				sans: ["Space Grotesk", "sans-serif"],
			},
			boxShadow: {
				main: "0px 15px 60px 0px rgba(0, 0, 0, 0.25)",
			},
			screens: {
				tablet: { min: "767px", max: "992px" },
				lmd: { max: "768px" },
				lsm: { max: "540px" },
			},
		},
	},
	plugins: [],
};
