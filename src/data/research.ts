/**
 * Research Hub facts: what has been published, and who supervises.
 *
 * Shared by the landing page (the inverse "Already in the literature" band and
 * the supervisor list) and /research, so a new paper or a new supervisor is
 * added in exactly one place.
 */

export type Publication = {
  title: string;
  /** Short form used on the landing chips, where the full venue does not fit. */
  venueShort: string;
  venue: string;
  /** Short form used on the landing chips, where the full title does not fit. */
  chipTitle: string;
  authors: string;
  link: string;
};

export const publications: Publication[] = [
  {
    title:
      "The Anatomy of Alignment: Decomposing Preference Optimization by Steering Sparse Features",
    venueShort: "NeurIPS 2025 Spotlight",
    venue: "NeurIPS 2025 Spotlight",
    authors: "Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski",
    link: "https://arxiv.org/abs/2509.12934",
    chipTitle: "The Anatomy of Alignment",
  },
  {
    title: "Self-Ablating Transformers: More Interpretability, Less Sparsity",
    venueShort: "ICLR 2025",
    venue: "ICLR 2025",
    authors: "Jeremias Ferrao",
    link: "https://openreview.net/pdf?id=QcmEb490bK",
    chipTitle: "Self-Ablating Transformers",
  },
  {
    title: "EU-Agent-Bench: Measuring Illegal Behavior of LLM Agents Under EU Law",
    venueShort: "NeurIPS 2025",
    venue: "NeurIPS 2025",
    authors: "Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa",
    link: "https://arxiv.org/abs/2510.21524",
    chipTitle: "EU-Agent-Bench",
  },
  {
    title:
      "Contextual Sparsity as a Tool for Mechanistic Understanding of Retrieval in Hybrid Foundation Models",
    venueShort: "ICLR 2025",
    venue: "ICLR 2025",
    authors: "Davide Zani, Felix Michalak, Steven Abreu",
    link: "https://openreview.net/pdf?id=TGWzg86kYv",
    chipTitle: "Contextual Sparsity",
  },
  {
    title: "Steering Large Language Models using Conceptors",
    venueShort: "NeurIPS 2024",
    venue: "NeurIPS 2024",
    authors: "Joris Postmus, Steven Abreu",
    link: "https://jorispos.github.io/conceptor_steering/",
    chipTitle: "Steering LLMs using Conceptors",
  },
  {
    title: "AutoSteer: Weight-Preserving Reinforcement Learning for Interpretable Model Control",
    venueShort: "1st, Apart Research",
    venue: "1st Place, Apart Research Hackathon",
    authors: "Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/autosteer-weight-preserving-reinforcement-learning-for-interpretable-model-control",
    chipTitle: "AutoSteer",
  },
  {
    title: "Local Learning Coefficients Predict Developmental Milestones During GRPO",
    venueShort: "3rd, Apart Research",
    venue: "3rd Place, Apart Research Hackathon",
    authors: "Jeremias Ferrao, Ilija Lichkovski",
    link: "https://apartresearch.com/project/local-learning-coefficients-predict-developmental-milestones-during-group-relative-policy-optimization-2te2",
    chipTitle: "Local Learning Coefficients",
  },
  {
    title: "Collective Deliberation for Safer CBRN Decisions: A Multi-Agent LLM Debate Pipeline",
    venueShort: "4th, Apart Research",
    venue: "4th Place, Apart Research Hackathon",
    authors: "Alexander Müller, Arsenijs Golicins, Galina Lesnic",
    link: "https://apartresearch.com/project/collective-deliberation-for-safer-cbrn-decisions-a-multi-agent-llm-debate-pipeline-3w8q",
    chipTitle: "Collective Deliberation",
  },
  {
    title: "Sandbagging LLMs using Activation Steering",
    venueShort: "Apart Research",
    venue: "Apart Research",
    authors: "Jeremias Ferrao, Davide Zani",
    link: "https://www.apartresearch.com/project/sandbagging-llms-using-activation-steering",
    chipTitle: "Sandbagging LLMs using Activation Steering",
  },
  {
    title: "Cybersecurity Persistence Benchmark",
    venueShort: "Apart Research",
    venue: "Apart Research",
    authors: "Davide Zani, Felix Michalak, Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/cybersecurity-persistence-benchmark",
    chipTitle: "Cybersecurity Persistence Benchmark",
  },
  {
    title: "Playing with Perception: Fooling Traffic Sign Classifiers via Copy-Paste Manipulation",
    venueShort: "Research project",
    venue: "Research Project",
    authors: "Davide Zani, Alexandru Dimofte",
    link: "https://drive.google.com/file/d/1JvhstWaLIHB9QPI-cg5S-1ASexhmqLSN/view",
    chipTitle: "Playing with Perception",
  },
  {
    title: "AI Misinformation and Threats to Democratic Rights",
    venueShort: "Apart Research",
    venue: "Apart Research",
    authors: "Davide Zani, Mariam Ibrahim, Tiwai Mhundwa, Felix Michalak, Andrei Avram",
    link: "https://www.apartresearch.com/project/ai-misinformation-and-threats-to-democratic-rights",
    chipTitle: "AI Misinformation and Democratic Rights",
  },
];

export type Supervisor = {
  name: string;
  position: string;
  /** Trimmed to fit the landing's 196px name column plus affiliation. */
  positionShort: string;
  image: string;
  agenda: string;
};

export const supervisors: Supervisor[] = [
  {
    name: "Steven Abreu",
    position: "Research Scientist, MakerMaker",
    positionShort: "Research Scientist, MakerMaker",
    image: "/photos/supervisors/steven.webp",
    agenda:
      "https://docs.google.com/document/d/1UIGpTGYUk9nGvH1H5l5oHclRfNT4pCJ7ArQoIIdDNT4/edit?usp=sharing",
  },
  {
    name: "Fatih Turkmen",
    position: "Associate Professor of Computer Science, University of Groningen",
    positionShort: "Associate Professor, University of Groningen",
    image: "/photos/supervisors/Fatih_3.png",
    agenda:
      "https://docs.google.com/document/d/15UNTtMQYEfO0WQjNKC3QyXHdYW1S2TtITbU94ZltZOc/edit?usp=sharing",
  },
  {
    name: "Jobst Heitzig",
    position:
      "Working Group Leader, Senior Scientist, Potsdam Institute for Climate Impact Research",
    positionShort: "Senior Scientist, Potsdam Institute",
    image: "/photos/supervisors/Jobst.png",
    agenda:
      "https://docs.google.com/document/d/1jGBETx0wVUSAZhk4RK6Rett4FVRwTgdUna7Wi2aMg_k/edit?usp=sharing",
  },
  {
    name: "Guillaume Pourcel",
    position: "PhD AI Candidate, University of Groningen",
    positionShort: "PhD AI Candidate, University of Groningen",
    image: "/photos/supervisors/Guillame.jpg",
    agenda:
      "https://docs.google.com/document/d/1kr-lo1Qr_k7Yq3C1eoPg9gwFKlJ9PflTWqGrexA8Nxc/edit?usp=sharing",
  },
  {
    name: "Ana Lucic",
    position: "Assistant professor, University of Amsterdam",
    positionShort: "Assistant professor, University of Amsterdam",
    image: "/photos/supervisors/Ana_Lucic.png",
    agenda:
      "https://docs.google.com/document/d/1IhPnQWQEN6ykshxW9B6xWehtfPwSl0B4T5HzrKyMnn8/edit?usp=sharing",
  },
];

export const RESEARCH_EMAIL = "research@safeainetherlands.org";
export const RESEARCH_INTEREST_FORM_URL = "https://forms.gle/na3wbBR4V1YVHAnFA";
