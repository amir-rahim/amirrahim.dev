export const SITE = {
	/** Your full name — shown in nav, footer, title tags */
	title: 'Amir Rahim',

	/** One-line descriptor shown in meta description and hero */
	description: 'Software Engineer | Technical Product Manger | Tech Enthusiast | Blogger',

	/** Canonical base URL (no trailing slash) */
	url: 'https://amirrahim.dev',

	/** Used in OG tags and RSS */
	author: 'Amir Rahim',

	/** Twitter/X handle including @ — or set to '' to omit */
	twitterHandle: '',

	social: {
		github: 'https://github.com/amir-rahim',
		linkedin: 'https://linkedin.com/in/amir-rahim',
		email: 'hello@amirrahim.dev',
	},

	/** Navigation links (in order) */
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Resume', href: '/resume' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
	],
} as const;
