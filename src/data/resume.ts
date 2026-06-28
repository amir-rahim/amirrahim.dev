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
	title: 'Software Engineer | Technical Product Manager',
	tagline: 'Passionate about building scalable and user-friendly software solutions',

	contact: {
		email: 'contact@amirrahim.dev',
		phone: 'PLACEHOLDER_PHONE',
		location: 'London, United Kingdom',
		linkedin: 'linkedin.com/in/amir-rahim',
		github: 'github.com/amir-rahim',
	},

	summary:
		'Software Engineer with a background in high-stakes financial technology and experience in technical product delivery. Proven track record in architecting .NET microservices, event-driven systems (Kafka), and Azure-native platforms. Unique blend of deep engineering expertise and product ownership, with a focus on building high-throughput, mission-critical infrastructure for global institutions.',

	experience: [
		{
			title: 'Technology Graduate',
			company: 'UBS',
			location: 'London, United Kingdom',
			startDate: 'September 2024',
			endDate: null,
			highlights: [
				'Selected for a rotational technology programme focused on enterprise software engineering, cloud infrastructure, automation, and product delivery across UBS technology and business divisions.',
				'Product Manager - Wealth Management (March 2026 - Present): Converting complex business requirements into actionable technical delivery plans and prioritising backlogs for a team of ~10 engineers.',
				'Software Engineer - Investment Bank Technology, Evidence Lab (September 2025 - March 2026): Developed and architected a cloud platform for Research Quants from the ground up, to start the migration of their existing platform from on-prem to Azure.',
				'Software Engineer - Asset Management Technology, Managing Investments (September 2024 - August 2025): Built Kafka-based event-driven services and .NET microservices, supported Azure infrastructure, migrated applications to AKS with containerisation, and created performance-testing suites, service-health dashboards, and developer tooling to improve reliability and code quality.'
			],
		},
		{
			title: 'Research Assistant',
			company: 'King\'s College London',
			location: 'London, United Kingdom',
			startDate: 'January 2024',
			endDate: 'July 2024',
			highlights: [
				'Contributed to “Co-designing Encounters with AI in Education for Sustainable Development,” exploring how generative AI can support education for sustainable development (ESD).',
				'Ran co-design workshops with students and faculty to develop, test, and refine teaching and learning resources, then evaluated and disseminated the findings.',
			],
		},
		{
			title: 'Technology Industry Placement',
			company: 'UBS',
			location: 'London, United Kingdom',
			startDate: 'June 2022',
			endDate: 'August 2023',
			highlights: [
				'Built, tested, and maintained public and secured client-facing web applications delivered through ubs.com/am, supporting production-quality digital services for Asset Management clients.',
				'Introduced a reusable unit-testing framework standard for new UBS Asset Management Technology applications, improving engineering consistency, testability, and code quality.',
				'Worked in Agile delivery teams to gather requirements, validate feedback, and ship iterative software improvements aligned to business priorities.',
			],
		},
		{
			title: 'Warehouse Operations',
			company: 'Bell Trading LTD',
			location: 'London, United Kingdom',
			startDate: 'July 2020',
			endDate: 'September 2021',
			highlights: [
				'Managed customer relationships, finance queries, and credit accounts while applying strong communication, analytical, and organisational skills.',
				'Introduced practical technology improvements and an online presence to streamline day-to-day operations.',
			],
		},
		{
			title: 'Match Day Operational Team Member',
			company: 'Arsenal Football Club',
			location: 'London, United Kingdom',
			startDate: 'August 2018',
			endDate: 'May 2019',
			highlights: [
				'Supported match-day operations across 34 home fixtures, building teamwork and composure in a high-pressure environment.',
			],
		}
	],

	education: [
		{
			degree: 'Computer Science BSc (Hons)',
			institution: 'King\'s College London',
			location: 'London, United Kingdom',
			graduationYear: '2024',
			notes: 'Graduated with First Class Honours. Dissertation on AI-enhanced Learning Analytics',
		},
		{
			degree: 'Associateship of King\'s College (AKC)',
			institution: 'King\'s College London',
			location: 'London, United Kingdom',
			graduationYear: '2024',
			notes: 'AKC is a unique programme exploring ethics, theology, and philosophy.',
		},
		{
			degree: 'A-Levels: Computer Science, Physics, Mathematics',
			institution: 'William Perkin Church of England High School',
			location: 'London, United Kingdom',
			graduationYear: '2020',
			notes: 'Acheived A*AA.',
		},
	],

	skills: [
		{
			category: 'Languages',
			items: ['English (Fluent)', 'Arabic (Basic)', 'French (Basic)'],
		},
		{
			category: 'Certifications',
			items: ['Azure AZ-900', 'Azure AI-900', 'Databricks Certified Data Engineer Associate', 'Gitlab Associate', 'Gitlab CI/CD Associate', 'PSM I Scrum Master', 'UBS Certified Engineer'],
		},
		{
			category: 'Programming & Frameworks',
			items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'C#', '.NET', 'Kafka', 'Azure', 'Databricks', 'SQL', 'Docker', 'Kubernetes'],
		},
	],
};
