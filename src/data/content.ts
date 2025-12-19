// The Marble Archive - Portfolio Content Data
// Edit this file to update your portfolio without touching components

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  scrollText: string;
  model3DPath?: string;
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  skills: string[];
}

export interface ContactContent {
  heading: string;
  subheading: string;
  email: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    author: string;
  };
  hero: HeroContent;
  nav: NavLink[];
  about: AboutContent;
  projects: Project[];
  contact: ContactContent;
}

const content: SiteContent = {
  meta: {
    title: "The Marble Archive | Portfolio",
    description: "A curated collection of digital artifacts and creative works",
    author: "Your Name",
  },

  hero: {
    title: "The Marble Archive",
    subtitle: "Where Code Becomes Art & Digital Dreams Take Form",
    scrollText: "Descend into the Archive",
    model3DPath: "/models/bust.glb",
  },

  nav: [
    { id: "home", label: "Sanctum", href: "#home" },
    { id: "about", label: "Chronicle", href: "#about" },
    { id: "projects", label: "Artifacts", href: "#projects" },
    { id: "contact", label: "Summon", href: "#contact" },
  ],

  about: {
    heading: "The Chronicle",
    paragraphs: [
      "I am a creator who dwells at the intersection of art and technology, forging digital experiences that transcend the ordinary.",
      "With mastery over the sacred arts of React, Three.js, and the mystical forces of WebGL, I breathe life into static designs and transform mere concepts into immersive realities.",
      "Each project in this archive represents a journey—a quest to push the boundaries of what's possible in the digital realm.",
    ],
    skills: [
      "React & Next.js",
      "Three.js & WebGL",
      "TypeScript",
      "Node.js",
      "Python",
      "UI/UX Design",
      "Creative Development",
      "3D Visualization",
    ],
  },

  projects: [
    {
      id: "project-1",
      title: "Ethereal Commerce",
      description: "A luxury e-commerce experience with immersive 3D product visualization",
      longDescription: "An award-winning e-commerce platform that transforms online shopping into a gallery experience. Features include real-time 3D product rotation, AR try-on capabilities, and fluid micro-interactions.",
      tags: ["React", "Three.js", "Stripe", "GSAP"],
      image: "/images/projects/ethereal-commerce.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      featured: true,
    },
    {
      id: "project-2",
      title: "Neural Canvas",
      description: "AI-powered generative art platform using machine learning",
      longDescription: "A creative platform where users can generate unique artworks using neural networks. The system learns from classical art masters to create new, original compositions.",
      tags: ["Python", "TensorFlow", "React", "WebGL"],
      image: "/images/projects/neural-canvas.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      featured: true,
    },
    {
      id: "project-3",
      title: "Sonic Realm",
      description: "Spatial audio visualization experience in 3D space",
      longDescription: "An immersive audio-visual experience that translates music into dynamic 3D environments. Users navigate through soundscapes that react in real-time to audio frequencies.",
      tags: ["Three.js", "Web Audio API", "GLSL", "React"],
      image: "/images/projects/sonic-realm.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      featured: true,
    },
    {
      id: "project-4",
      title: "Chrono Dashboard",
      description: "Real-time analytics dashboard with fluid data visualization",
      longDescription: "A sophisticated analytics dashboard that presents complex data through beautiful, animated visualizations. Features include real-time updates, customizable widgets, and exportable reports.",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      image: "/images/projects/chrono-dashboard.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
    },
    {
      id: "project-5",
      title: "Mythic Tales",
      description: "Interactive storytelling platform with branching narratives",
      longDescription: "A digital storytelling platform that allows users to create and experience interactive narratives. Features include branching storylines, character customization, and collaborative writing tools.",
      tags: ["Next.js", "MongoDB", "Framer Motion", "Tailwind"],
      image: "/images/projects/mythic-tales.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
    },
    {
      id: "project-6",
      title: "Void Protocol",
      description: "Cyberpunk-themed multiplayer game lobby system",
      longDescription: "A stylized game lobby and matchmaking system with real-time player tracking, team formation, and animated UI transitions inspired by cyberpunk aesthetics.",
      tags: ["React", "Socket.io", "Three.js", "Redis"],
      image: "/images/projects/void-protocol.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
    },
  ],

  contact: {
    heading: "Summon Me",
    subheading: "Let us craft something legendary together",
    email: "hello@marblearchive.com",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { platform: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
    ],
  },
};

export default content;
