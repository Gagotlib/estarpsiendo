import type { Config } from "tailwindcss";

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: '#0ca826',
				secondary: {
					100: '#800dad',
					200: '#6a0a9c',
					300: '#5a0a8b',
				}
			}
		}
	},
	plugins: []
}
export default config;
