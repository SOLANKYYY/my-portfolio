// Central content module — every string here mirrors the original single-file
// portfolio verbatim, plus the new LeetCode/DSA project entry.

export const profile = {
  name: 'Solanki Om Narendra',
  role: 'Artificial Intelligence & Machine Learning Undergraduate',
  roleSecondary: 'Software Engineer',
  bio: "I am an aspiring Artificial Intelligence and Machine Learning engineer with a strong foundation in modern software development. Equipped with hands-on experience across multiple programming languages, I specialize in bridging the gap between core software engineering and intelligent system design. I am passionate about leveraging computer vision, data structures, and smart automation to build impactful, real-world solutions. Constantly eager to learn and adapt, I look forward to collaborating on innovative tech initiatives and challenging engineering roles.",
  dob: 'September 4, 2006',
  location: 'Bengaluru',
  email: 'om.n.solanki49@gmail.com',
  resume: '/resume.pdf',
  photo: '/profile.jpg',
  socials: {
    github: 'https://github.com/SOLANKYYY',
    linkedin: 'https://www.linkedin.com/in/solanki-om-b89793330/',
    twitter: 'https://x.com/Om_solanki49',
  },
  languages: [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Full Prof.' },
    { name: 'Gujarati', level: 'Native' },
  ],
}

export const education = [
  {
    institution: 'Jain University, Bengaluru',
    degree: 'B.Tech in CS & AIML',
    period: '2024–Present',
    detail: 'Current Academic Standing:',
    stat: '8.7 SGPA',
    icon: 'graduation-cap',
  },
  {
    institution: 'PP Savani Cambridge Int. School',
    degree: 'Higher Secondary Education (HSC)',
    period: '',
    detail: 'Final Board Result:',
    stat: '75%',
    icon: 'school',
  },
]

export const skillGroups = [
  {
    title: 'AI & ML Core',
    icon: 'brain-circuit',
    skills: [
      'Neural Architectures',
      'NLP',
      'Computer Vision',
      'OpenCV',
      'MediaPipe',
      'TensorFlow',
      'Scikit-learn (LDA, Autoencoders)',
      'Python',
    ],
  },
  {
    title: 'Data & Systems Infrastructure',
    icon: 'server',
    skills: [
      'Data Warehousing',
      'Virtualization',
      'Database Management',
      'Algorithms on Graphs',
      'SQL',
      'MySQL',
      'Linux',
      'Docker',
    ],
  },
  {
    title: 'Programming & Core CS',
    icon: 'code-2',
    skills: [
      'Python (Basics)',
      'Java',
      'HTML',
      'Git',
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (OOP)',
      'Dynamic Programming',
      'Data Analysis',
    ],
  },
  {
    title: 'Interface & Prototyping',
    icon: 'layout-template',
    skills: [
      'Frontend UI Architectures',
      'React.js',
      'Tailwind CSS',
      'Figma',
    ],
    badgeMap: { 'React.js': 'Learning' },
  },
]

export const experience = [
  {
    title: 'AI Intern',
    org: 'sikka.ai',
    period: 'Jul 2026 – Present',
    detail: 'Developing core machine learning models and computer vision pipelines in an on-site corporate environment.',
  },
  {
    title: 'Tech Team Member',
    org: 'Turing Club',
    period: 'Feb 2026 – Present',
    detail: 'Selected as a core team member to drive technical initiatives and manage web development projects for the Department of Computer Science.',
  },
  {
    title: 'Designer',
    org: 'The Cognito Club',
    period: 'Mar 2025 – Jul 2025',
    detail: 'Contributed to creative UI/UX projects, refining user experiences and digital design architectures.',
  },
]

export const hackathons = [
  {
    title: 'NavaNIEti National Hackathon',
    period: '2026',
    detail: "Built 'ReGenX', a gesture-based contactless nurse alert system using ESP32, hardware sensors, and MQTT protocols.",
  },
  {
    title: 'Smart India Hackathon (SIH)',
    period: '2025',
    detail: 'National Level finalist solving real-world technological problem statements mapped by government ministries.',
  },
  {
    title: 'Inceptrix Hackathon Finalist',
    period: '2024 & 2025',
    detail: 'Consistent back-to-back finalist demonstrating ultra-rapid prototyping, deployment stability, and fast execution.',
  },
]

export const projects = [
  {
    title: 'CTI Event Classification over Sysmon Logs',
    description: 'Predicting MITRE ATT&CK tactics from Sysmon logs utilizing dimensionality reduction techniques.',
    tags: ['Autoencoders', 'LDA'],
    icon: 'shield-alert',
    github: 'https://github.com/SOLANKYYY/CTI-Event-Classification-over-Sysmon-Logs',
  },
  {
    title: 'Dual-Threshold Face Recognition',
    description: 'High-accuracy secure visual access system leveraging OpenCV with proprietary threshold mechanics.',
    tags: ['OpenCV', 'Computer Vision'],
    icon: 'scan-face',
    github: 'https://github.com/SOLANKYYY/Dual-Threshold-Face-Auth',
  },
  {
    title: 'Health Predictive Analytics',
    description: 'Advanced framework combining Ordinary Differential Equations (ODE) and Machine Learning models for health forecasting.',
    tags: ['ODE', 'ML Forecasting'],
    icon: 'activity',
    github: 'https://github.com/SOLANKYYY/Health-Predictive-Analytics-using-ODE-Modeling-Machine-Learning',
  },
  {
    title: 'Spam Email Detection',
    description: 'NLP-driven classification pipeline that flags spam messages using text vectorization and classic ML models.',
    tags: ['NLP', 'Scikit-learn'],
    icon: 'mail-warning',
    github: 'https://github.com/SOLANKYYY/Spam-Email-Detection-ML-Project',
  },
  {
    title: 'Same-Data LLM Comparison',
    description: 'Benchmarking framework that runs identical datasets and prompts across multiple LLMs to compare output quality.',
    tags: ['LLMs', 'Benchmarking'],
    icon: 'git-compare',
    github: 'https://github.com/SOLANKYYY/same-data-llm-comparison',
  },
  {
    title: 'LeetCode Solutions & DSA Problem Solving',
    description: 'Optimized data structures and algorithms implementations in Python & C++, covering Dynamic Programming, Graphs, Trees, and Array patterns with detailed complexity analysis.',
    tags: ['Data Structures', 'Algorithms', 'Python', 'C++', 'Problem Solving'],
    icon: 'code-2',
    // TODO: replace with the actual repository URL
    github: 'https://github.com/SOLANKYYY/leetcode-dsa-solutions',
  },
]

export const contact = {
  tagline: 'Seeking opportunities in Machine Learning and Full-Stack Engineering.',
  formEndpoint: 'https://formspree.io/f/mdalbzlw',
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#arsenal' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
