import type { AcademicPerformance, Course, Project, SkillCategory, SkillEvidence, Student } from '../types'

const mod = (name: string, topics: string[], skills: string[], assignment: string) => ({ name, topics, skills, assignment })
const phase = (name: string, modules: ReturnType<typeof mod>[]) => ({ name, modules })

export const courses: Course[] = [
  {
    id: 'ai', title: 'AI', track: 'Machine Learning · Data Science', duration: '15 months', learningLevel: 'Foundation to advanced',
    summary: 'A deep technical pathway through programming, mathematics, data science, and applied machine learning.',
    objectives: ['Build strong Python and mathematical foundations', 'Explore machine learning and data science specializations', 'Deliver a collaborative capstone project'], professionalOutcomes: ['Machine Learning Engineer', 'AI Engineer', 'Data Scientist'],
    technologies: ['Python', 'NumPy', 'Pandas', 'scikit-learn', 'PyTorch', 'SQL'], colors: ['#7d57e8', '#b795ff'], icon: '✳', publicInfo: 'Verified public details', source: 'Public AI course page',
    phases: [
      phase('01 · Foundations', [mod('Python & CS foundations', ['Problem solving', 'Python programming', 'Computer science basics'], ['Python', 'Algorithms', 'OOP'], 'Build a command-line study planner'), mod('Applied mathematics', ['Algebra', 'Linear algebra', 'Calculus'], ['Linear Algebra', 'Statistics'], 'Explore vectors with a small notebook')]),
      phase('02 · Core mastery', [mod('Data science & classical ML', ['SQL', 'Probability', 'Regression', 'Classification'], ['SQL', 'Pandas', 'scikit-learn'], 'Train and evaluate a baseline model'), mod('Deep learning', ['Neural networks', 'CNNs', 'Optimization'], ['PyTorch', 'Deep Learning'], 'Classify a small image dataset')]),
      phase('03 · Specialties & capstone', [mod('ML / Data Science specialization', ['Computer vision', 'NLP', 'EDA', 'Data engineering'], ['Machine Learning', 'Computer Vision', 'NLP'], 'Present an end-to-end capstone with a clear evaluation')]),
    ],
  },
  {
    id: 'devhack', title: 'AI DevHack', track: 'Systems · Infrastructure · Security', duration: '15 months', learningLevel: 'Foundation to advanced',
    summary: 'A systems-oriented pathway connecting low-level programming, networks, infrastructure, and secure engineering.',
    objectives: ['Practice Linux and command-line workflows', 'Understand networks and system fundamentals', 'Build reliable infrastructure projects'], professionalOutcomes: ['Software Engineer', 'Systems Engineer', 'DevOps Engineer', 'Junior Cybersecurity Specialist'],
    technologies: ['Linux', 'C', 'C++', 'Git', 'Docker', 'Networking'], colors: ['#ff865e', '#ffbd79'], icon: '⌘', publicInfo: 'Illustrative demo roadmap', source: 'Course listing is public; roadmap below is illustrative',
    phases: [phase('01 · Systems foundations', [mod('Linux & shell', ['Processes', 'Permissions', 'Shell scripts'], ['Linux', 'Bash'], 'Automate a repeatable workstation setup'), mod('Programming foundations', ['C basics', 'Memory', 'Git'], ['C', 'Git', 'Computer Architecture'], 'Trace memory use in a small CLI tool')]), phase('02 · Networks & reliability', [mod('Networks', ['TCP/IP', 'DNS', 'Sockets'], ['Networking', 'Python'], 'Create a simple network status monitor'), mod('Infrastructure', ['Containers', 'Cloud concepts', 'CI basics'], ['Docker', 'CI/CD', 'Cloud'], 'Containerize and document a service')]), phase('03 · Security & capstone', [mod('Secure engineering', ['Threat modeling', 'Access control', 'Observability'], ['Cybersecurity', 'Monitoring'], 'Present a hardened infrastructure capstone')])],
  },
  {
    id: 'appdev', title: 'AI Application Development', track: 'Web · Mobile · Desktop', duration: '15 months', learningLevel: 'Foundation to advanced',
    summary: 'A broad application engineering path spanning systems foundations, modern web, databases, and cross-platform delivery.',
    objectives: ['Build programming and architecture fluency', 'Develop full-stack applications with modern tools', 'Integrate AI capabilities and ship a capstone'], professionalOutcomes: ['Frontend Developer', 'Full-stack Developer', 'Application Engineer'],
    technologies: ['C++', 'PostgreSQL', 'React', 'TypeScript', 'React Native', 'AI APIs'], colors: ['#3779ea', '#80b5ff'], icon: '▧', publicInfo: 'Verified public details', source: 'Public AI Application Development page',
    phases: [phase('01 · Foundations & systems', [mod('AI literacy, Linux & C', ['Terminal workflows', 'OS fundamentals', 'C and memory'], ['Linux', 'C', 'Computer Architecture'], 'Build and audit a small systems utility'), mod('C++ & data structures', ['Modern C++', 'Complexity', 'Linear structures'], ['C++', 'Algorithms'], 'Implement a small collection library')]), phase('02 · Data & services', [mod('Data layer', ['PostgreSQL', 'NoSQL', 'Migrations', 'Vector databases'], ['PostgreSQL', 'MongoDB', 'SQL'], 'Model an application data layer'), mod('APIs & backend', ['HTTP', 'Service architecture', 'AI pipelines'], ['REST APIs', 'Backend', 'AI Integration'], 'Build a microservices API capstone')]), phase('03 · Product engineering', [mod('Frontend architecture', ['DOM', 'React', 'TypeScript', 'State'], ['React', 'TypeScript', 'HTML & CSS'], 'Deliver a production-style web app'), mod('Mobile, desktop & delivery', ['React Native', 'Qt', 'Deployment', 'Technical defense'], ['React Native', 'Deployment', 'QA'], 'Ship a cross-platform integrated capstone')])],
  },
  {
    id: 'uxui', title: 'AI UX/UI', track: 'Product Design · Research', duration: '4 months', learningLevel: 'Beginner-friendly',
    summary: 'A product design path covering user research, interface craft, prototyping, critique, and portfolio storytelling.',
    objectives: ['Identify user needs and product problems', 'Design accessible interfaces and interactive prototypes', 'Present considered case studies in a portfolio'], professionalOutcomes: ['UI/UX Designer', 'Product Designer', 'Interaction Designer'],
    technologies: ['Figma', 'FigJam', 'Prototyping', 'AI design tools'], colors: ['#dd5ca7', '#ffa1ce'], icon: '✺', publicInfo: 'Verified public details', source: 'Public AI UX/UI course page',
    phases: [phase('01 · UX/UI foundations', [mod('Research & problem framing', ['Personas', 'Qualitative and quantitative research', 'Information architecture'], ['User Research', 'UX'], 'Map a user journey and test a wireframe')]), phase('02 · UI & product psychology', [mod('Interface craft', ['Color and accessibility', 'Typography', 'Grids and hierarchy'], ['UI Design', 'Accessibility'], 'Design and prototype a product flow'), mod('Patterns & interaction', ['Design patterns', 'Microinteractions', 'Collaboration'], ['Figma', 'Prototyping', 'Design Systems'], 'Prototype an interaction and gather feedback')]), phase('03 · Portfolio & career preparation', [mod('Final projects & critique', ['Case studies', 'Redesigns', 'Portfolio workshop'], ['Product Thinking', 'Presentation'], 'Refine and present a portfolio case study')])],
  },
  {
    id: 'graphic', title: 'AI Graphic Design', track: 'Visual Design · Motion', duration: '4 months', learningLevel: 'Beginner-friendly',
    summary: 'A creative program for building visual language, graphic compositions, motion, and a portfolio of practical work.',
    objectives: ['Apply composition, color, and typography principles', 'Create assets with digital design tools', 'Develop a final creative portfolio'], professionalOutcomes: ['Graphic Designer', 'Digital Designer', 'AI-assisted Creative Designer'],
    technologies: ['Photoshop', 'Illustrator', 'After Effects', 'AI creative tools'], colors: ['#ef9c37', '#ffd36a'], icon: '◈', publicInfo: 'Illustrative demo roadmap', source: 'Catalog title is public; roadmap synthesized from public Graphic Design outline',
    phases: [phase('01 · Visual foundations', [mod('Design principles', ['Composition', 'Color', 'Typography'], ['Composition', 'Typography', 'Color Theory'], 'Create a modular visual identity'), mod('Digital image & vector craft', ['Photo editing', 'Layers', 'Vector forms'], ['Photoshop', 'Illustrator'], 'Build a poster from a visual brief')]), phase('02 · Motion & portfolio', [mod('Motion & AI tools', ['Animation', '3D motion', 'AI-assisted exploration'], ['After Effects', 'AI Creative Tools'], 'Create a short motion study'), mod('Final creative projects', ['Brand identity', 'Digital composition', 'Presentation'], ['Branding', 'Art Direction'], 'Present two polished portfolio pieces')])],
  },
  {
    id: 'junior', title: 'AI Junior', track: 'Creative Computing · Junior', duration: '4 months', learningLevel: 'Junior beginner',
    summary: 'An approachable introduction to creative computing and AI concepts for younger learners.',
    objectives: ['Build confidence with computational thinking', 'Explore creative coding and responsible AI', 'Share a guided final project'], professionalOutcomes: ['Creative Computing Learner', 'Junior Coding Project Creator'],
    technologies: ['Scratch', 'Python', 'AI tools', 'Creative coding'], colors: ['#2da88c', '#74dbbb'], icon: '✦', publicInfo: 'Illustrative demo roadmap', source: 'Course title and duration are public; roadmap is illustrative',
    phases: [phase('01 · Think & create', [mod('Computational thinking', ['Sequences', 'Conditions', 'Loops'], ['Logic', 'Python'], 'Create an interactive story'), mod('Creative AI literacy', ['How AI works', 'Prompting', 'Safe use'], ['AI Literacy', 'Prompting'], 'Compare and improve a creative prompt')]), phase('02 · Build & share', [mod('Creative coding', ['Events', 'Variables', 'Simple data'], ['Python', 'Creative Coding'], 'Make a small interactive learning game'), mod('Showcase project', ['Planning', 'Iteration', 'Presentation'], ['Problem Solving', 'Presentation'], 'Share a final project and reflection')])],
  },
  {
    id: 'modern', title: 'Modern AI Software Developer', track: 'Online · AI-first Software', duration: '10 months', learningLevel: 'Beginner to intermediate',
    summary: 'An online, AI-first software development program that moves from programming fundamentals to deployed applications.',
    objectives: ['Use AI tools thoughtfully while learning fundamentals', 'Build real software products and understand their architecture', 'Ship web, mobile, and desktop experiences'], professionalOutcomes: ['Junior Software Developer', 'Frontend Developer', 'AI Product Developer'],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Docker', 'AI APIs'], colors: ['#4e61cd', '#9b8dff'], icon: '⌘', publicInfo: 'Verified public details', source: 'Public Modern AI Software Developer page',
    phases: [phase('01 · AI first & fundamentals', [mod('AI-first workflows', ['LLM basics', 'Specs before prompts', 'Git and GitHub'], ['AI Literacy', 'Git', 'Prompting'], 'Ship a small product and review its code'), mod('Programming fundamentals', ['Values', 'Control flow', 'Functions', 'Data structures'], ['JavaScript', 'Algorithms', 'Debugging'], 'Solve a set of programming challenges')]), phase('02 · Building real products', [mod('Product engineering', ['Web interfaces', 'Databases', 'APIs', 'Testing'], ['React', 'SQL', 'Testing'], 'Build a complete web product'), mod('Security & stability', ['HTTPS', 'Docker', 'CI/CD', 'Monitoring'], ['Docker', 'Security', 'Deployment'], 'Deploy and monitor a service')]), phase('03 · AI inside products', [mod('AI features & platforms', ['RAG', 'Agents', 'Evaluation', 'Mobile and desktop'], ['AI Integration', 'RAG', 'React Native'], 'Demonstrate a final AI-enabled application')])],
  },
  {
    id: 'gamedev', title: 'GameDev for Teens', track: 'Unity · Game Design', duration: '4 months', learningLevel: 'Teen beginner',
    summary: 'A hands-on introduction for young learners to game development, design, and a playable project.',
    objectives: ['Learn gameplay and interface fundamentals', 'Practice C# and AI-assisted development safely', 'Build and showcase a playable game'], professionalOutcomes: ['Game Developer', 'Unity Developer', 'Game Designer'],
    technologies: ['Unity', 'C#', 'Figma', 'AI tools'], colors: ['#e64d5e', '#ff9092'], icon: '◉', publicInfo: 'Verified public details', source: 'Public GameDev for Teens page',
    phases: [phase('01 · Unity, game design & UI/UX', [mod('Game development intro', ['Gameplay basics', 'C# literacy', 'UI/UX fundamentals'], ['Unity', 'C#', 'Game Design'], 'Build a first mini game')]), phase('02 · AI-assisted development', [mod('Safe AI vibe coding', ['AI-assisted development', 'Reviewing suggestions', 'Responsible use'], ['AI Literacy', 'Debugging'], 'Improve a prototype with documented AI assistance')]), phase('03 · Build & showcase', [mod('Three-lane endless dodger', ['Controls', 'Core loop', 'Score and save', 'Polish'], ['C#', 'Unity', 'Game Design'], 'Present a playable final game')])],
  },
]

const roster: Array<[string, string, number, Student['status'], string]> = [
  ['Aram Sargsyan', 'ai', 82, 'Active', '2025-02-12'], ['Mariam Petrosyan', 'ai', 100, 'Graduated', '2024-08-19'], ['Narek Grigoryan', 'ai', 47, 'Active', '2025-07-04'], ['Anahit Hakobyan', 'ai', 28, 'At risk', '2025-10-11'],
  ['Davit Mkrtchyan', 'devhack', 74, 'Active', '2025-03-20'], ['Lilit Avetisyan', 'devhack', 100, 'Graduated', '2024-07-15'], ['Gor Harutyunyan', 'devhack', 53, 'Active', '2025-06-02'], ['Tatev Manukyan', 'devhack', 17, 'Paused', '2025-09-21'],
  ['Erik Vardanyan', 'appdev', 91, 'Active', '2024-12-08'], ['Sona Gevorgyan', 'appdev', 100, 'Graduated', '2024-06-11'], ['Hayk Grigoryan', 'appdev', 61, 'Active', '2025-05-17'], ['Mane Hovhannisyan', 'appdev', 35, 'Active', '2025-08-03'],
  ['Ani Karapetyan', 'uxui', 88, 'Active', '2025-01-28'], ['Levon Aleksanyan', 'uxui', 100, 'Graduated', '2024-09-09'], ['Nina Martirosyan', 'uxui', 56, 'Active', '2025-06-29'], ['Arsen Voskanyan', 'uxui', 22, 'At risk', '2025-10-16'],
  ['Mariam Khachatryan', 'graphic', 95, 'Active', '2024-11-14'], ['Gagik Sargsyan', 'graphic', 100, 'Graduated', '2024-05-27'], ['Eva Danielyan', 'graphic', 42, 'Active', '2025-07-22'], ['Tigran Galstyan', 'graphic', 14, 'Paused', '2025-10-28'],
  ['Lusine Babayan', 'junior', 76, 'Active', '2025-03-03'], ['Mikael Hakobyan', 'junior', 100, 'Graduated', '2024-08-02'], ['Siranush Avagyan', 'junior', 49, 'Active', '2025-06-16'], ['Aren Sargsyan', 'junior', 31, 'Active', '2025-09-07'],
  ['Ruben Manukyan', 'modern', 68, 'Active', '2025-04-19'], ['Elina Petrosyan', 'modern', 100, 'Graduated', '2024-10-23'], ['Vahan Asatryan', 'modern', 39, 'Active', '2025-08-12'], ['Silva Grigoryan', 'modern', 19, 'Paused', '2025-10-30'],
  ['Artur Martirosyan', 'gamedev', 86, 'Active', '2025-02-04'], ['Liana Sargsyan', 'gamedev', 100, 'Graduated', '2024-07-29'], ['Samvel Avetisyan', 'gamedev', 58, 'Active', '2025-05-31'], ['Meline Mkrtchyan', 'gamedev', 24, 'At risk', '2025-09-25'],
]

const additionalNames = [
  'Sargis Melikyan','Nare Grigoryan','Arpi Vardanyan','Vahan Hakobyan','Mariam Danielyan','Ashot Karapetyan','Hasmik Sargsyan','Ruben Avetisyan','Nelli Hovsepyan','Edgar Petrosyan','Mane Margaryan',
  'Tigran Ghazaryan','Lusine Mkrtchyan','Mher Sahakyan','Ani Hakobyan','Gor Petrosyan','Silva Avagyan','Arman Manukyan','Liana Grigoryan','Hayk Voskanyan','Sona Hovhannisyan','Karen Danielyan',
  'Narek Asatryan','Anush Martirosyan','Arsen Galstyan','Meline Harutyunyan','Levon Sargsyan','Elina Mkrtchyan','Davit Avagyan','Tatev Karapetyan','Erik Babayan','Siranush Petrosyan','Samvel Hovsepyan',
  'Nina Sargsyan','Artur Grigoryan','Eva Mkrtchyan','Vazgen Hakobyan','Lilit Manukyan','Aren Martirosyan','Gohar Petrosyan','Mikael Vardanyan','Ani Danielyan','Raffi Avetisyan','Mariam Asatryan',
  'Arman Grigoryan','Lusine Karapetyan','Tigran Avetisyan','Sona Mkrtchyan','Narek Harutyunyan','Nare Babayan','Gagik Hakobyan','Mane Petrosyan','Gevorg Sargsyan','Anahit Vardanyan','Diana Grigoryan',
  'Ashot Mkrtchyan','Liana Hakobyan','Vahan Petrosyan','Arpi Avetisyan','Ruben Grigoryan','Nelli Sargsyan','Edgar Hovhannisyan','Hasmik Manukyan','Sargis Karapetyan','Mher Vardanyan','Elina Harutyunyan',
  'Gor Avetisyan','Silva Hakobyan','Arsen Petrosyan','Meline Sargsyan','Levon Mkrtchyan','Tatev Grigoryan','Erik Hovhannisyan','Siranush Vardanyan','Samvel Karapetyan','Nina Avagyan','Artur Hakobyan',
  'Eva Petrosyan','Vazgen Grigoryan','Lilit Sargsyan','Aren Mkrtchyan','Gohar Hovhannisyan','Mikael Avetisyan','Raffi Manukyan','Diana Vardanyan','Vardan Danielyan','Shushan Manukyan','Hrachya Avagyan',
]
const courseIds = courses.map(course => course.id)
additionalNames.forEach((name, index) => {
  const courseId = courseIds[Math.floor(index / 11)]
  const progressOptions = [8, 16, 24, 33, 41, 49, 57, 64, 72, 81, 93, 100]
  const progress = name === 'Arman Manukyan' ? 92 : progressOptions[(index * 7 + Math.floor(index / 11) * 3) % progressOptions.length]
  const status: Student['status'] = progress === 100 ? 'Graduated' : index % 13 === 0 ? 'Paused' : index % 9 === 0 ? 'At risk' : 'Active'
  const month = String((index % 10) + 1).padStart(2, '0')
  const day = String((index * 3 % 27) + 1).padStart(2, '0')
  roster.push([name, courseId, progress, status, `2025-${month}-${day}`])
})

const skillSets: Record<string, Array<[string, SkillCategory, string]>> = {
  ai: [['Python','Programming Languages','Python & CS foundations'],['NumPy','Tools & Platforms','Data science & classical ML'],['Pandas','Tools & Platforms','Data science & classical ML'],['SQL','Databases','Data science & classical ML'],['scikit-learn','AI & Machine Learning','Data science & classical ML'],['Machine Learning','AI & Machine Learning','Data science & classical ML'],['Statistics','Computer Science Fundamentals','Applied mathematics'],['Linear Algebra','Computer Science Fundamentals','Applied mathematics'],['PyTorch','AI & Machine Learning','Deep learning'],['Computer Vision','AI & Machine Learning','ML / Data Science specialization'],['NLP','AI & Machine Learning','ML / Data Science specialization'],['Algorithms','Computer Science Fundamentals','Python & CS foundations']],
  devhack: [['Linux','DevOps & Infrastructure','Linux & shell'],['Bash','Programming Languages','Linux & shell'],['C','Programming Languages','Programming foundations'],['Git','Tools & Platforms','Programming foundations'],['Networking','Computer Science Fundamentals','Networks'],['Python','Programming Languages','Networks'],['DevOps','DevOps & Infrastructure','Infrastructure'],['Docker','DevOps & Infrastructure','Infrastructure'],['CI/CD','DevOps & Infrastructure','Infrastructure'],['Cybersecurity','DevOps & Infrastructure','Secure engineering'],['Monitoring','DevOps & Infrastructure','Secure engineering'],['Computer Architecture','Computer Science Fundamentals','Programming foundations']],
  appdev: [['C++','Programming Languages','C++ & data structures'],['Linux','DevOps & Infrastructure','AI literacy, Linux & C'],['PostgreSQL','Databases','Data layer'],['MongoDB','Databases','Data layer'],['React','Frameworks','Frontend architecture'],['TypeScript','Programming Languages','Frontend architecture'],['React Native','Frameworks','Mobile, desktop & delivery'],['REST APIs','Frameworks','APIs & backend'],['AI Integration','AI & Machine Learning','APIs & backend'],['Algorithms','Computer Science Fundamentals','C++ & data structures'],['HTML & CSS','Programming Languages','Frontend architecture'],['Deployment','DevOps & Infrastructure','Mobile, desktop & delivery']],
  uxui: [['Figma','Design & Creative Tools','Patterns & interaction'],['User Research','Computer Science Fundamentals','Research & problem framing'],['UX','Design & Creative Tools','Research & problem framing'],['UI Design','Design & Creative Tools','Interface craft'],['Prototyping','Design & Creative Tools','Patterns & interaction'],['Design Systems','Design & Creative Tools','Patterns & interaction'],['Accessibility','Computer Science Fundamentals','Interface craft'],['Product Thinking','Computer Science Fundamentals','Final projects & critique'],['Typography','Design & Creative Tools','Interface craft']],
  graphic: [['Photoshop','Design & Creative Tools','Digital image & vector craft'],['Illustrator','Design & Creative Tools','Digital image & vector craft'],['After Effects','Design & Creative Tools','Motion & AI tools'],['Typography','Design & Creative Tools','Design principles'],['Composition','Design & Creative Tools','Design principles'],['Color Theory','Design & Creative Tools','Design principles'],['AI Creative Tools','AI & Machine Learning','Motion & AI tools'],['Branding','Design & Creative Tools','Final creative projects'],['Art Direction','Design & Creative Tools','Final creative projects']],
  junior: [['Python','Programming Languages','Creative coding'],['Logic','Computer Science Fundamentals','Computational thinking'],['AI Literacy','AI & Machine Learning','Creative AI literacy'],['Prompting','AI & Machine Learning','Creative AI literacy'],['Creative Coding','Tools & Platforms','Creative coding'],['Problem Solving','Computer Science Fundamentals','Showcase project'],['Presentation','Tools & Platforms','Showcase project']],
  modern: [['JavaScript','Programming Languages','Programming fundamentals'],['TypeScript','Programming Languages','Product engineering'],['React','Frameworks','Product engineering'],['SQL','Databases','Product engineering'],['Docker','DevOps & Infrastructure','Security & stability'],['AI Literacy','AI & Machine Learning','AI-first workflows'],['Git','Tools & Platforms','AI-first workflows'],['Algorithms','Computer Science Fundamentals','Programming fundamentals'],['Testing','Tools & Platforms','Product engineering'],['Security','DevOps & Infrastructure','Security & stability'],['AI Integration','AI & Machine Learning','AI features & platforms'],['React Native','Frameworks','AI features & platforms']],
  gamedev: [['Unity','Frameworks','Game development intro'],['C#','Programming Languages','Game development intro'],['Game Design','Design & Creative Tools','Three-lane endless dodger'],['AI Literacy','AI & Machine Learning','Safe AI vibe coding'],['Debugging','Tools & Platforms','Safe AI vibe coding'],['Figma','Design & Creative Tools','Game development intro']],
}

const levelFor = (progress: number, ix: number): SkillEvidence['proficiency'] => {
  if (progress >= 80 && ix % 4 === 0) return 'Advanced'
  if (progress >= 55 || (progress >= 35 && ix % 4 === 1)) return 'Intermediate'
  if (progress >= 25 || ix % 3 === 0) return 'Developing'
  return 'Beginner'
}

type StudentBase = Omit<Student, 'academicPerformance'>
const feminineNames = new Set(['Mariam', 'Anahit', 'Lilit', 'Tatev', 'Sona', 'Mane', 'Ani', 'Nina', 'Lusine', 'Siranush', 'Elina', 'Silva', 'Nare', 'Arpi', 'Hasmik', 'Nelli', 'Anush', 'Meline', 'Gohar', 'Shushan', 'Eva', 'Liana', 'Diana', 'Astghik', 'Arevik', 'Armine', 'Narine', 'Gayane', 'Susanna', 'Karine', 'Seda', 'Kristine', 'Elen', 'Luiza'])
let womenPortrait = 0
let menPortrait = 0
const baseStudents: StudentBase[] = roster.map(([name, courseId, progress, status, enrolledAt], i) => {
  const course = courses.find(c => c.id === courseId)!
  const firstName = name.split(' ')[0]
  const genderedCollection = feminineNames.has(firstName) ? 'women' : 'men'
  const portraitNumber = genderedCollection === 'women' ? ++womenPortrait : ++menPortrait
  const handle = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const searchName = encodeURIComponent(`Academy demo ${name}`)
  const stageIndex = Math.min(course.phases.length - 1, Math.floor(progress / (100 / course.phases.length)))
  const stage = course.phases[stageIndex]?.name.replace(/^\d+ · /, '') ?? 'Getting started'
  const skills = (skillSets[courseId] ?? []).slice(0, Math.max(3, Math.min(7, 3 + Math.floor(progress / 25)))).map(([skill, category, moduleName], ix) => ({
    name: skill, category, proficiency: levelFor(progress, ix), module: moduleName, evidence: `${skillSets[courseId][(ix + i) % skillSets[courseId].length][0]} practice · ${course.phases[Math.min(stageIndex, course.phases.length - 1)].modules[0].name}`,
  }))
  return {
    id: `s${String(i + 1).padStart(2, '0')}`, name,
    photoUrl: `https://randomuser.me/api/portraits/${genderedCollection}/${portraitNumber}.jpg`,
    socialProfiles: {
      linkedin: `https://www.linkedin.com/search/results/people/?keywords=${searchName}`,
      github: `https://github.com/search/users?q=${encodeURIComponent(`academy-demo-${handle}`)}`,
    },
    courseId, progress, status,
    level: progress < 35 ? 'Foundation' : progress < 75 ? 'Intermediate' : progress < 100 ? 'Advanced' : 'Advanced', stage,
    enrolledAt, skills,
    bio: `${name.split(' ')[0]} is developing ${course.track.toLowerCase()} skills through hands-on practice. Currently focused on ${skills.slice(0, 2).map(s => s.name).join(' and ')}.`,
    achievements: [
      ...(progress >= 25 ? [{ title: 'First learning milestone', kind: 'Milestone' as const, date: '2026-05-12', note: 'Completed the foundation checkpoint.' }] : []),
      ...(progress >= 60 ? [{ title: 'Project review passed', kind: 'Exam' as const, date: '2026-09-18', note: 'Received feedback on a practical assignment.' }] : []),
      ...(progress === 100 ? [{ title: 'Program completion', kind: 'Certificate' as const, date: '2026-10-21', note: 'Demo record of a completed learning path.' }] : []),
    ],
    readiness: { technical: Math.min(98, Math.max(22, progress + (i % 3) * 4)), projects: Math.min(100, 28 + (i % 4) * 18 + Math.floor(progress / 4)), problemSolving: Math.min(96, Math.max(25, progress - 4 + (i % 5) * 3)), portfolio: Math.min(100, 24 + (i % 5) * 14 + Math.floor(progress / 6)) },
  }
})

const projectNames: Record<string, Array<[string, string, string[], string]>> = {
  ai: [['Armenian Language Chatbot','A conversational prototype exploring Armenian text workflows.',['Python','NLP','Pandas'],'AI'],['Computer Vision Object Detector','A small image detection experiment with a clear evaluation notebook.',['Python','PyTorch','Computer Vision'],'AI'],['Smart Study Insights','An exploratory dashboard for learning data.',['Python','Pandas','SQL'],'Data'],['Model Playground','A lightweight interface for comparing model experiments.',['Python','scikit-learn','Machine Learning'],'AI']],
  devhack: [['Network Monitoring Dashboard','A compact status view for services and latency checks.',['Linux','Python','Networking'],'Infrastructure'],['Secure File Vault','A CLI prototype for file handling and access controls.',['C','Linux','Cybersecurity'],'Security'],['Container Lab','A reproducible multi-service development setup.',['Docker','Git','CI/CD','DevOps'],'Infrastructure'],['Terminal Task Runner','A scriptable tool for common workstation tasks.',['Bash','Linux','Git'],'Systems'],['Platform Reliability Toolkit','A small systems toolkit for service checks, release notes, and repeatable deployment steps.',['Linux','Bash','Docker','Monitoring'],'Infrastructure']],
  appdev: [['Smart Expense Tracker','A full-stack spending organizer with categorization.',['React','TypeScript','PostgreSQL'],'Web app'],['AI Resume Analyzer','A prototype that extracts themes from a resume.',['React','AI Integration','REST APIs'],'AI app'],['E-commerce Dashboard','A responsive admin experience for order insights.',['React','TypeScript','SQL'],'Web app'],['Mobile Habit Tracker','A cross-platform flow for daily habit tracking.',['React Native','TypeScript','REST APIs'],'Mobile']],
  uxui: [['Personal Finance App','A research-backed mobile concept for everyday budgets.',['Figma','Prototyping','User Research'],'Product design'],['Community Learning Hub','A responsive dashboard concept for peer learning.',['Figma','Design Systems','UI Design'],'Product design'],['Travel Planner Redesign','A usability-focused redesign with tested flows.',['Figma','UX','Accessibility'],'UX case study'],['Creative Brief Builder','A polished interface concept for creative teams.',['Figma','Typography','Prototyping'],'Product design']],
  graphic: [['Brand Identity Concept','A visual identity system for a fictional local café.',['Illustrator','Typography','Branding'],'Branding'],['Editorial Motion Study','A short animated composition with kinetic type.',['After Effects','Typography','Composition'],'Motion'],['Digital Poster Series','A cohesive set of campaign posters.',['Photoshop','Illustrator','Color Theory'],'Graphic design'],['AI Art Direction Board','An exploration board with curated visual directions.',['Photoshop','AI Creative Tools','Art Direction'],'Creative AI']],
  junior: [['Interactive Storybook','A branching story built around a playful theme.',['Python','Logic','Creative Coding'],'Creative coding'],['Smart Garden Game','A small game about caring for a virtual garden.',['Python','AI Literacy','Problem Solving'],'Game'],['Quiz Adventure','A quiz with levels, score, and a final reflection.',['Creative Coding','Logic','Presentation'],'Learning game'],['Prompt Art Journal','A curated set of AI-assisted visual experiments.',['Prompting','AI Literacy','Presentation'],'Creative AI']],
  modern: [['Personal Portfolio Website','A responsive portfolio built with an AI-first workflow.',['React','TypeScript','Git'],'Web app'],['AI Meeting Notes','A demo of structured summaries and saved notes.',['AI Integration','React','SQL'],'AI app'],['Product Feedback Board','A full-stack application for organizing feedback.',['React','Testing','SQL'],'Web app'],['Mobile Focus Companion','A mobile-first focus timer and reflection app.',['React Native','TypeScript','AI Integration'],'Mobile']],
  gamedev: [['2D Platform Game','A playable platformer with levels and simple controls.',['Unity','C#','Game Design'],'Game'],['Three-lane Dodger','An endless dodger with score and save data.',['Unity','C#','AI Literacy'],'Game'],['Mini Puzzle Quest','A short puzzle game with a clear progression loop.',['Unity','C#','Figma'],'Game'],['Arcade Space Rescue','An arcade prototype with enemy waves and feedback.',['Unity','C#','Game Design'],'Game']],
}

const artStyles = ['art-lilac', 'art-blue', 'art-orange', 'art-rose', 'art-mint', 'art-ink']
export const initialProjects: Project[] = baseStudents.flatMap((student, ix) => {
  const templates = projectNames[student.courseId]
  const academyShowcase = student.name === 'Arman Manukyan'
  const count = academyShowcase ? 5 : ix % 5 === 0 ? 3 : 2
  return Array.from({ length: count }, (_, j) => {
    const [title, description, technologies, category] = templates[(ix + j) % templates.length]
    const done = academyShowcase || student.progress === 100 || j === 0 || student.progress > 70
    return {
      id: `${student.id}-p${j + 1}`, studentId: student.id, title, description, technologies, category,
      completedAt: done ? `2026-${String(((ix * 2 + j) % 11) + 1).padStart(2, '0')}-${String(((ix * 7 + j * 3) % 27) + 1).padStart(2, '0')}` : '2026-11-10',
      score: done ? academyShowcase ? 97 + (j % 3) : 76 + (ix * 7 + j * 9) % 23 : 0,
      status: done ? (student.progress === 100 ? 'Completed' : j === 1 ? 'In review' : 'Completed') : 'In progress',
      art: artStyles[(ix + j) % artStyles.length],
    } satisfies Project
  })
})

const bounded = (value: number) => Math.max(35, Math.min(99, value))
const academicFor = (student: StudentBase, index: number, projects: Project[]): AcademicPerformance => {
  const showcaseDevHackPerformer = student.name === 'Arman Manukyan'
  const examBase = showcaseDevHackPerformer ? 96 : bounded(49 + (index * 17 % 51) + (student.progress > 65 ? 3 : 0))
  const instructorBase = showcaseDevHackPerformer ? 97 : bounded(43 + (index * 17 % 56))
  const ownProjects = projects.filter(project => project.studentId === student.id && project.status === 'Completed')
  return {
    instructorEvaluations: [
      { id: `${student.id}-eval-1`, instructorId: 'instructor-demo-01', score: showcaseDevHackPerformer ? 95 : bounded(instructorBase - 8), feedback: 'Shows curiosity and is building a steady practice routine.', evaluationDate: '2026-08-12' },
      { id: `${student.id}-eval-2`, instructorId: 'instructor-demo-01', score: instructorBase, feedback: index % 3 === 0 ? 'Strong problem framing; keep explaining decisions with evidence.' : 'Good progress. Continue asking focused questions and documenting trade-offs.', evaluationDate: '2026-10-22' },
      ...(showcaseDevHackPerformer ? [
        { id: `${student.id}-eval-3`, instructorId: 'instructor-demo-01', score: 99, feedback: 'Consistently dependable in peer reviews and systems debugging; recommends this learner for a portfolio conversation.', evaluationDate: '2026-11-04' },
        { id: `${student.id}-eval-4`, instructorId: 'instructor-demo-01', score: 98, feedback: 'Strong ownership across the capstone and clear technical communication; instructor recommendation recorded for this demo.', evaluationDate: '2026-11-12' },
      ] : []),
    ],
    examResults: [
      { id: `${student.id}-exam-1`, courseId: student.courseId, examTitle: 'Foundations checkpoint', score: bounded(examBase - 9), maximumScore: 100, examDate: '2026-08-26' },
      { id: `${student.id}-exam-2`, courseId: student.courseId, examTitle: 'Applied skills assessment', score: examBase, maximumScore: 100, examDate: '2026-10-29' },
    ],
    projectEvaluations: ownProjects.map((project, projectIndex) => ({ id: `${project.id}-evaluation`, projectId: project.id, score: project.score, feedback: projectIndex % 2 === 0 ? 'Clear scope and thoughtful iteration. Add a short note about testing.' : 'Good technical direction; the next step is a more polished walkthrough.', submissionDate: project.completedAt, status: 'Evaluated' as const })),
    upcomingAssessments: [
      { id: `${student.id}-upcoming-exam`, title: `${courses.find(course => course.id === student.courseId)?.title ?? 'Course'} knowledge checkpoint`, scheduledDate: `2026-12-${String((index * 3 % 20) + 5).padStart(2, '0')}`, kind: 'Exam' as const },
      { id: `${student.id}-upcoming-review`, title: 'Practical project review', scheduledDate: `2027-01-${String((index * 5 % 20) + 5).padStart(2, '0')}`, kind: 'Project review' as const },
    ],
    assignmentScore: showcaseDevHackPerformer ? 96 : bounded(48 + (index * 19 % 50)),
    consistencyScore: showcaseDevHackPerformer ? 95 : bounded(42 + (index * 13 % 57)),
    history: ['2026-09', '2026-10'].map((period, snapshotIndex) => ({
      period,
      instructorScore: bounded(instructorBase + ((index * (snapshotIndex === 0 ? 7 : 9)) % (snapshotIndex === 0 ? 23 : 17)) - (snapshotIndex === 0 ? 14 : 8)),
      examScore: bounded(examBase + ((index * (snapshotIndex === 0 ? 11 : 5)) % (snapshotIndex === 0 ? 25 : 19)) - (snapshotIndex === 0 ? 15 : 9)),
      projectScore: bounded((ownProjects.reduce((sum, project) => sum + project.score, 0) / Math.max(1, ownProjects.length)) + ((index * (snapshotIndex === 0 ? 13 : 7)) % (snapshotIndex === 0 ? 27 : 17)) - (snapshotIndex === 0 ? 16 : 8)),
      assignmentScore: bounded(48 + (index * 19 % 50) + ((index * 3) % 15) - (snapshotIndex === 0 ? 16 : 8)),
      consistencyScore: bounded(42 + (index * 13 % 57) + ((index * 5) % 17) - (snapshotIndex === 0 ? 15 : 8)),
    })),
  }
}

export const initialStudents: Student[] = baseStudents.map((student, index) => ({
  ...student,
  photoUrl: student.name === 'Arman Manukyan' ? 'https://randomuser.me/api/portraits/men/74.jpg' : student.photoUrl,
  academicPerformance: academicFor(student, index, initialProjects),
}))

export const skillCategories: SkillCategory[] = ['Programming Languages', 'Frameworks', 'Databases', 'Tools & Platforms', 'AI & Machine Learning', 'Design & Creative Tools', 'Computer Science Fundamentals', 'DevOps & Infrastructure']
export const allSkillNames = Array.from(new Set(initialStudents.flatMap(s => s.skills.map(x => x.name)))).sort()
export const levelOrder: Record<SkillEvidence['proficiency'], number> = { Beginner: 1, Developing: 2, Intermediate: 3, Advanced: 4 }
