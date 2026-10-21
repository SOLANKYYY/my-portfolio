const repo = (name) => `https://github.com/SOLANKYYY/${name}`;
export const selectedProjects = [
  {
    title: "RetinaBridge",
    category: "AI & ML",
    art: "retina",
    description:
      "A retinal-image research prototype: taking a trained MATLAB network into browser-based ONNX inference, with image enhancement and visual explanations. Built for demonstration, not clinical diagnosis.",
    tags: ["Python", "ONNX Runtime", "Flask", "Computer vision"],
    github: repo("RetinaBridge"),
    demo: "https://retina-bridge.vercel.app/",
  },
  {
    title: "Signal Desk",
    category: "Web & systems",
    art: "signal",
    description:
      "A cyber threat intelligence workspace for exploring security reports, searching PDF evidence, and recording analyst decisions. Makes sources and rule-based assessments easy to inspect.",
    tags: ["Python", "Flask", "MongoDB", "JavaScript"],
    github: repo("signal-desk"),
  },
  {
    title: "Flat & Fork",
    category: "Web & systems",
    art: "flat",
    description:
      "A shared-home application for meal planning, voting, kitchen duties, and rotating laundry schedules. Includes resident and cook roles, invitations, and persistent shared data.",
    tags: ["Next.js", "PostgreSQL", "Authentication"],
    github: repo("flat-and-fork"),
  },
  {
    title: "AgriLens",
    category: "AI & ML",
    art: "agri",
    description:
      "An interactive comparison of two local language models on 2,200 crop observations. Explore saved predictions, per-crop results, and evaluation limitations side by side.",
    tags: ["Python", "Ollama", "LLM evaluation"],
    github: repo("agrilens-llm-benchmark"),
  },
  {
    title: "LungLens",
    category: "AI & ML",
    art: "lung",
    description:
      "A lung-screening research interface with a local Python inference pipeline and a synthetic-pattern training baseline. Demonstrates the model workflow; it is not a trained cancer detector.",
    tags: ["Python", "NumPy", "Model evaluation"],
    github: repo("lunglens"),
  },
];
export const moreProjects = [
  {
    title: "TraceLens",
    description: "Sysmon event classification and security research",
    github: repo("tracelens-sysmon-lab"),
  },
  {
    title: "VeraGate",
    description: "Face recognition and visual authentication",
    github: repo("veragate-face-lab"),
  },
  {
    title: "InboxLens",
    description: "Message classification with natural language processing",
    github: repo("inboxlens-message-lab"),
  },
  {
    title: "Health Predictive Analytics",
    description: "ODE modeling and machine learning",
    github: repo(
      "Health-Predictive-Analytics-using-ODE-Modeling-Machine-Learning",
    ),
  },
  {
    title: "LeetCode Solutions",
    description: "Data structures, algorithms, and problem solving",
    github: repo("LeetCode-Solutions"),
  },
];
export const skills = [
  {
    title: "Machine learning",
    items: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV",
      "MediaPipe",
      "ONNX Runtime",
    ],
  },
  {
    title: "Web development",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "HTML & CSS",
      "Tailwind CSS",
      "Flask",
    ],
  },
  {
    title: "Data & tooling",
    items: ["SQL", "MySQL", "MongoDB", "Git", "Linux", "Docker"],
  },
  {
    title: "Foundations",
    items: [
      "Java",
      "Data structures",
      "Algorithms",
      "OOP",
      "Data analysis",
      "Figma",
    ],
  },
];
