export const SITE = {
	/** Your full name — shown in nav, footer, title tags */
	title: 'Amir Rahim',

	/** One-line descriptor shown in meta description and hero */
	description: 'Software Engineer / Product Management | Graduate Talent Program @ UBS | Computer Science BSc @ KCL 20\'-24\'',

	/** Canonical base URL (no trailing slash) */
	url: 'https://amirrahim.dev',

	/** Used in OG tags and RSS */
	author: 'Amir Rahim',

	social: {
		github:   'https://github.com/amir-rahim',
		linkedin: 'https://linkedin.com/in/amir-rahim',
		flickr:   'https://flickr.com/photos/amir-rahim',
		/** Flickr numeric account ID — used to fetch the public photo feed */
		flickrNsid: '165330949@N02',
		email:    'contact@amirrahim.dev',
	},

	/** Navigation links (in order) */
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Resume', href: '/resume' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' },
	],
} as const;
