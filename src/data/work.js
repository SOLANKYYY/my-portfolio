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
    details: [{label:"Engineering",text:"Converted a MATLAB network into an ONNX-backed Python service, with a browser interface for image upload and review."},{label:"Interpretability",text:"Pairs model output with image enhancement, Grad-CAM attention, and a printable report."},{label:"Scope",text:"Research demonstration. Broader evaluation of the deployed pipeline remains necessary."}],
  },
  {
    title: "Signal Desk",
    category: "Web & systems",
    art: "signal",
    description:
      "A cyber threat intelligence workspace for exploring security reports, searching PDF evidence, and recording analyst decisions. Makes sources and rule-based assessments easy to inspect.",
    tags: ["Python", "Flask", "MongoDB", "JavaScript"],
    github: repo("signal-desk"),
    details: [{label:"Evidence workflow",text:"Search extracted PDF passages, follow source references, and inspect related reports and entities."},{label:"Analyst controls",text:"Record verdicts, reasoning, and alert acknowledgements separately from automatic rule-based ratings."},{label:"System design",text:"Python processing and MongoDB storage support persistent reports, evidence, and review history."}],
  },
  {
    title: "Flat & Fork",
    category: "Web & systems",
    art: "flat",
    description:
      "A shared-home application for meal planning, voting, kitchen duties, and rotating laundry schedules. Includes resident and cook roles, invitations, and persistent shared data.",
    tags: ["Next.js", "PostgreSQL", "Authentication"],
    github: repo("flat-and-fork"),
    details: [{label:"Shared decisions",text:"Residents suggest meals and vote; cook accounts have a separate set of responsibilities."},{label:"Scheduling",text:"Recurring washing and drying rotations support individual reassignments without replacing future turns."},{label:"Persistence",text:"Version checks protect shared household state against simultaneous edits."}],
  },
  {
    title: "AgriLens",
    category: "AI & ML",
    art: "agri",
    description:
      "An interactive comparison of two local language models on 2,200 crop observations. Explore saved predictions, per-crop results, and evaluation limitations side by side.",
    tags: ["Python", "Ollama", "LLM evaluation"],
    github: repo("agrilens-llm-benchmark"),
    details: [{label:"Controlled comparison",text:"DeepSeek-R1 1.5B and Llama 3.2 3B receive the same crop records, labels, and prompt."},{label:"Exploration",text:"Browse 2,200 saved responses, compare results by crop, and export filtered observations."},{label:"Evaluation",text:"Separates exact matches, normalized matches, failures, and invalid labels instead of treating fluent answers as correct."}],
  },
  {
    title: "LungLens",
    category: "AI & ML",
    art: "lung",
    description:
      "A lung-screening research interface with a local Python inference pipeline and a synthetic-pattern training baseline. Demonstrates the model workflow; it is not a trained cancer detector.",
    tags: ["Python", "NumPy", "Model evaluation"],
    github: repo("lunglens"),
    details: [{label:"End-to-end workflow",text:"Connects a scan-review interface with a local Python inference API, training scripts, and evaluation output."},{label:"Reproducible baseline",text:"Includes 180 synthetic images with separate training, validation, and test partitions."},{label:"Scope",text:"The included NumPy model recognizes artificial patterns. It does not diagnose cancer or assign a clinical stage."}],
  },
  {
    title: "TraceLens", category: "AI & ML", art: "trace",
    description: "A research showcase comparing LDA and autoencoders on Sysmon event embeddings. Explore how classification structure changes as 384 dimensions become 2, 10, or 50.",
    tags: ["Python", "MiniLM", "LDA", "Autoencoders"], github: repo("tracelens-sysmon-lab"),
    details: [{label:"Research question",text:"How much structure survives when event embeddings are compressed into a smaller representation?"},{label:"Interactive study",text:"Compare recorded benchmarks, inspect saved projections, and explore the original heuristic labeling rules."},{label:"Limitations",text:"Results are exploratory: full-data fitting and rule-generated labels prevent claims of independent threat-detection performance."}],
  },
];
export const moreProjects = [
  {
    title: "TerraSense",
    category: "Applied ML",
    description:
      "A soil-and-climate classification lab with browser inference and comparisons of three machine-learning models. Explore dataset patterns and model limitations before drawing conclusions about crops.",
    tags: ["Python", "Scikit-learn", "Browser inference"],
    github: repo("terrasense-crop-lab"),
  },
  {
    title: "VeraGate",
    category: "Computer vision",
    description:
      "An interactive lab for a dual-threshold face-recognition prototype. The browser simulator explains score boundaries and enrollment steps; the OpenCV recognition pipeline runs locally.",
    tags: ["OpenCV", "LBPH", "Decision thresholds"],
    github: repo("veragate-face-lab"),
  },
  {
    title: "InboxLens",
    category: "Natural language",
    description:
      "A browser-based SMS spam classifier with token explanations and evaluation after message deduplication. Try short messages locally and inspect the evidence and limits behind a result.",
    tags: ["TF-IDF", "Naive Bayes", "JavaScript"],
    github: repo("inboxlens-message-lab"),
  },
  {
    title: "Health Predictive Analytics",
    category: "Mathematical modeling",
    description:
      "An exploratory project bringing together ODE-based heart-rate simulations and machine-learning classification. Built to study mathematical models and health-data workflows; clinical performance has not been established.",
    tags: ["Python", "SciPy", "ODE modeling"],
    github: repo(
      "Health-Predictive-Analytics-using-ODE-Modeling-Machine-Learning",
    ),
  },
  {
    title: "LeetCode Solutions",
    category: "Problem solving",
    description:
      "A collection of coding solutions organized by topic, from arrays and linked lists to trees and dynamic programming. A place to explore approaches, revisit patterns, and strengthen core problem-solving skills.",
    tags: ["Data structures", "Algorithms", "Dynamic programming"],
    github: repo("LeetCode-Solutions"),
  },
];
export const skills = [
  {
    title: "Machine learning",
    description:
      "Working through data preparation, model inference, and evaluation, with interfaces that make predictions and their limitations easier to inspect.",
    example: { title: "RetinaBridge", href: repo("RetinaBridge") },
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
    description:
      "Turning a practical workflow into a responsive application, from the first screen to shared state, authentication, and persistent data.",
    example: { title: "Flat & Fork", href: repo("flat-and-fork") },
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
    description:
      "Organizing records, source material, and review history so an application can connect evidence with the decisions people make.",
    example: { title: "Signal Desk", href: repo("signal-desk") },
    items: ["SQL", "MySQL", "MongoDB", "Git", "Linux", "Docker"],
  },
  {
    title: "Foundations",
    description:
      "Practicing algorithms and data structures alongside the software-design fundamentals that support larger applications.",
    example: { title: "LeetCode Solutions", href: repo("LeetCode-Solutions") },
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
