// ─────────────────────────────────────────────────────────────────────────────
// RESUME DATA — replace every PLACEHOLDER with your real information.
// Types are enforced; TypeScript will flag any structural mistakes.
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkExperience {
	title: string;
	company: string;
	location: string;
	startDate: string;   // e.g. "Jan 2021"
	endDate: string | null; // null = present
	highlights: string[];
}

export interface Education {
	degree: string;
	institution: string;
	location: string;
	graduationYear: string;
	notes?: string;
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface ResumeData {
	name: string;
	title: string;
	tagline: string;
	contact: {
		email: string;
		phone: string;
		location: string;
		linkedin: string;
		github: string;
	};
	summary: string;
	experience: WorkExperience[];
	education: Education[];
	skills: SkillGroup[];
}

export const resume: ResumeData = {
	name: 'Amir Rahim',
	title: 'PLACEHOLDER_JOB_TITLE',
	tagline: 'PLACEHOLDER_ONE_LINE_TAGLINE',

	contact: {
		email: 'PLACEHOLDER_EMAIL',
		phone: 'PLACEHOLDER_PHONE',
		location: 'PLACEHOLDER_CITY, PLACEHOLDER_COUNTRY',
		linkedin: 'linkedin.com/in/PLACEHOLDER_LINKEDIN',
		github: 'github.com/PLACEHOLDER_GITHUB',
	},

	summary:
		'PLACEHOLDER — A concise (2–3 sentence) professional summary that highlights your ' +
		'experience, domain expertise, and what you bring to a tech-lead / engineering-leadership ' +
		'role in finance. Keep it tight and confident.',

	experience: [
		{
			title: 'PLACEHOLDER_SENIOR_TITLE',
			company: 'PLACEHOLDER_COMPANY_A',
			location: 'PLACEHOLDER_CITY',
			startDate: 'MMM YYYY',
			endDate: null,
			highlights: [
				'PLACEHOLDER — Led a cross-functional initiative that delivered X outcome, reducing Y by Z%.',
				'PLACEHOLDER — Built and owned a critical system handling N transactions per day.',
				'PLACEHOLDER — Mentored N engineers, instituting practices that cut review cycle time by X%.',
			],
		},
		{
			title: 'PLACEHOLDER_MID_TITLE',
			company: 'PLACEHOLDER_COMPANY_B',
			location: 'PLACEHOLDER_CITY',
			startDate: 'MMM YYYY',
			endDate: 'MMM YYYY',
			highlights: [
				'PLACEHOLDER — Designed and shipped a new microservice for X, serving Y requests/sec.',
				'PLACEHOLDER — Partnered with product to define requirements for a regulatory-facing feature.',
				'PLACEHOLDER — Improved test coverage from X% to Y%, eliminating a class of production bugs.',
			],
		},
		{
			title: 'PLACEHOLDER_EARLY_TITLE',
			company: 'PLACEHOLDER_COMPANY_C',
			location: 'PLACEHOLDER_CITY',
			startDate: 'MMM YYYY',
			endDate: 'MMM YYYY',
			highlights: [
				'PLACEHOLDER — Contributed to a high-throughput data pipeline processing X GB/day.',
				'PLACEHOLDER — Collaborated with quant analysts to surface new risk signals into production.',
			],
		},
	],

	education: [
		{
			degree: 'PLACEHOLDER_DEGREE (e.g. MEng Computer Science)',
			institution: 'PLACEHOLDER_UNIVERSITY',
			location: 'PLACEHOLDER_CITY, PLACEHOLDER_COUNTRY',
			graduationYear: 'YYYY',
			notes: 'PLACEHOLDER — e.g. First class honours / thesis topic / notable modules',
		},
	],

	skills: [
		{
			category: 'Languages',
			items: ['PLACEHOLDER', 'PLACEHOLDER', 'PLACEHOLDER'],
		},
		{
			category: 'Frameworks & Runtimes',
			items: ['PLACEHOLDER', 'PLACEHOLDER', 'PLACEHOLDER'],
		},
		{
			category: 'Infrastructure & Cloud',
			items: ['PLACEHOLDER', 'PLACEHOLDER', 'PLACEHOLDER'],
		},
		{
			category: 'Finance & Domain',
			items: ['PLACEHOLDER', 'PLACEHOLDER', 'PLACEHOLDER'],
		},
		{
			category: 'Leadership & Process',
			items: ['PLACEHOLDER', 'PLACEHOLDER', 'PLACEHOLDER'],
		},
	],
};
