export interface EducationEntry {
  school: string
  degree: string
  period: string
  details: string[]
}

export interface ExperienceEntry {
  role: string
  org: string
  period: string
  bullets: string[]
}

export interface PublicationEntry {
  citation: string
  link?: string
}

export const EDUCATION: EducationEntry[] = [
  {
    school: 'Northeastern University',
    degree: 'Master of Science in Artificial Intelligence',
    period: 'Sep 2024 – May 2026',
    details: [
      'GPA: 3.9/4.0',
      'Coursework: Machine Learning, Deep Learning, Natural Language Processing, Information Retrieval, Computer Vision, Advanced AI, Algorithms, Advanced Perception, AI for HCI, VR',
    ],
  },
  {
    school: 'New York University',
    degree: 'B.S. in Computer Science',
    period: 'Sep 2020 – May 2024',
    details: [
      'Coursework: Data Structures, Algorithms, Software Engineering, Agile Development, Randomized Algorithms',
    ],
  },
]

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'AI Product Manager',
    org: 'Plaud AI',
    period: 'June 2026 – Present',
    bullets: [
      'Led product for Aperture, an internal AI evaluation platform to design and orchestrate end-to-end eval workflows across teams',
      'Defined support for connecting production agents and persona agents that simulate user behavior, enabling evaluation of multi-step agent scenarios at scale',
      'Own AI quality strategy: define success metrics, benchmarks, and launch criteria that decide when LLM-powered features ship',
      'Turn model failure analysis and user feedback into prioritized requirements, aligning ML, engineering, and design; built dashboards for a shared view of quality and launch readiness',
    ],
  },
  {
    role: 'AI / Machine Learning Engineering Intern',
    org: 'Zscaler',
    period: 'May 2025 – Aug 2025',
    bullets: [
      'Designed and shipped an LLM guardrail system that enforces secure and compliant AI usage in enterprise environments',
      'Built CI/CD pipelines (Docker, Kubernetes, AWS) and automated test and pre-release checks, increasing reliability and reducing regressions',
      'Built monitoring and log analysis pipelines (Grafana, Loki) that helped teams troubleshoot production issues faster',
    ],
  },
  {
    role: 'Research Assistant / Teaching Assistant (Machine Learning / NLP)',
    org: 'Northeastern University',
    period: 'Sep 2024 – Present',
    bullets: [
      'Led research on multimodal sentiment and emotion classification, from problem framing and experiment design to PyTorch pipelines and results',
      'Ran ablation and reliability studies to improve model robustness; documented experiments for reproducibility and handoff in Agile-style sprints',
    ],
  },
  {
    role: 'AI Research & Development Intern',
    org: 'Digital China',
    period: 'Jun 2024 – Aug 2024',
    bullets: [
      'Built an evaluation framework (Python + SQL) to assess multi-step LLM agent behavior, and dashboards to monitor reliability and regression risk',
      'Designed a synthetic data pipeline that improved tool-calling accuracy from 86.4% to 92.1%',
    ],
  },
  {
    role: 'Retrieval-Augmented Generation (RAG) System — Hackathon Project',
    org: 'Independent',
    period: 'Nov 2024 – Jan 2025',
    bullets: [
      'Built a RAG system with Python, LangChain, Streamlit, and Snowflake; added automated testing and prompt validation to improve answer reliability and reduce hallucinations',
    ],
  },
]

export const PUBLICATIONS: PublicationEntry[] = [
  {
    citation: 'Tao, A. et al. "Agent Tool-Calling Benchmarks for LLM Evaluation" — arXiv:2412.15660 (2024)',
    link: 'https://arxiv.org/abs/2412.15660',
  },
  {
    citation:
      'Tao, X., Song, X., Wu, J., Khoei, T.T. "RCAL: Reinforced Cross-Modal Alignment for Multimodal Sentiment Analysis with Sparse Visual Frames." 2026 IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP). Accepted, presenting May 2026.',
  },
]

export const CONTACT = {
  email: 'xinran.tao2001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/xinran-tao-a03291208',
  github: 'https://github.com/XinranTaoAngela',
  location: 'San Francisco Bay Area, CA',
}
