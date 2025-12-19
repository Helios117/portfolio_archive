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

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  skillCategories: SkillCategory[];
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
    title: "Helios | Suraj Vaidyanathan",
    description: "The digital realm of Helios - Full-stack developer, quantum enthusiast, and creator of digital artifacts",
    author: "Suraj Vaidyanathan",
  },

  hero: {
    title: "Helios",
    subtitle: "Illuminating the Digital Realm • Full-Stack Developer & Quantum Enthusiast",
    scrollText: "Explore the Artifacts",
    model3DPath: "/models/helios.glb",
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
      "I am Helios, a full-stack developer from India traversing the intersection of code and creativity. My interests span machine learning, quantum computing, physics simulations, and the endless frontier of technology.",
      "Beyond the digital realm, I am an avid reader, movie connoisseur, video game enthusiast, and audiophile—driven by an endless curiosity and passion for learning.",
      "Each artifact in this archive represents a journey through complex problem spaces—from rendering light rays in virtual worlds to securing communications against quantum threats.",
    ],
    skillCategories: [
      {
        name: "Languages",
        skills: ["C", "C++", "Python", "TypeScript", "JavaScript", "Java", "R", "HTML5", "CSS3", "LaTeX"],
      },
      {
        name: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "Vite", "Three.js", "WebGL"],
      },
      {
        name: "Backend",
        skills: ["Flask", "Django", "FastAPI", "Node.js"],
      },
      {
        name: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Supabase", "Firebase"],
      },
      {
        name: "ML & Data Science",
        skills: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "SciPy"],
      },
      {
        name: "Cloud & DevOps",
        skills: ["AWS", "Google Cloud", "GitHub Actions", "Docker"],
      },
      {
        name: "Design & Creative",
        skills: ["Blender", "Figma", "Adobe Photoshop", "Krita"],
      },
      {
        name: "Tools & Other",
        skills: ["Git", "Arduino", "FFmpeg", "Godot Engine", "Anaconda"],
      },
    ],
  },

  projects: [
    {
      id: "project-1",
      title: "Raytracing Engine",
      description: "A 3D renderer built from scratch in C++ following the raytracing paradigm",
      longDescription: "A complete raytracing engine implemented in C++ from first principles. This renderer simulates the physical behavior of light, including reflections, refractions, and shadows, to produce photorealistic images. Built following the 'Ray Tracing in a Weekend' guide with additional enhancements.",
      tags: ["C++", "Computer Graphics", "Ray Tracing", "3D Rendering"],
      image: "/images/projects/raytracing.jpg",
      githubLink: "https://github.com/Helios117/raytracing",
      featured: true,
    },
    {
      id: "project-2",
      title: "Photon",
      description: "Post-quantum secure messaging application using Kyber lattice cryptography",
      longDescription: "A cutting-edge secure messaging application that implements post-quantum cryptography using Kyber lattice-based encryption. Designed to withstand attacks from future quantum computers, ensuring long-term communication security in the quantum age.",
      tags: ["TypeScript", "Cryptography", "Kyber", "Post-Quantum", "Security"],
      image: "/images/projects/photon.jpg",
      liveLink: "https://photon3.vercel.app",
      githubLink: "https://github.com/Helios117/photon3",
      featured: true,
    },
    {
      id: "project-3",
      title: "CFD Python",
      description: "Computational Fluid Dynamics simulation solving Navier-Stokes equations",
      longDescription: "A comprehensive implementation of the '12 Steps to Navier-Stokes' in Python using Jupyter Notebooks. This project simulates fluid dynamics by numerically solving the Navier-Stokes equations, visualizing flow patterns, pressure distributions, and turbulence.",
      tags: ["Python", "Jupyter", "CFD", "Navier-Stokes", "Physics"],
      image: "/images/projects/cfd.jpg",
      githubLink: "https://github.com/Helios117/CFDPython",
      featured: true,
    },
    {
      id: "project-4",
      title: "Utkarsh Bank",
      description: "Full-featured online banking web application",
      longDescription: "A comprehensive banking web application built with Flask, featuring user authentication, account management, transactions, and a clean, intuitive interface. Demonstrates full-stack development with secure financial transaction handling.",
      tags: ["Flask", "Python", "HTML/CSS", "Banking", "Full-Stack"],
      image: "/images/projects/utkarsh-bank.jpg",
      githubLink: "https://github.com/Helios117/Utkarsh_Bank",
      featured: true,
    },
    {
      id: "project-5",
      title: "Dijkstra Visualizer",
      description: "Interactive visualization of Dijkstra's shortest path algorithm",
      longDescription: "An educational tool that brings Dijkstra's algorithm to life through interactive visualization. Watch as the algorithm explores nodes, updates distances, and finds the optimal path in real-time. Built for AlgoVybe with collaborators.",
      tags: ["TypeScript", "Algorithms", "Visualization", "Graph Theory"],
      image: "/images/projects/dijkstra.jpg",
      liveLink: "https://mine-dijkstra-quest-06852.vercel.app",
      githubLink: "https://github.com/Helios117/Dijkstra-Visual",
    },
    {
      id: "project-6",
      title: "Flight Planner",
      description: "Optimal flight routing with graph coloring for runway scheduling",
      longDescription: "An intelligent flight planning system that uses Dijkstra's algorithm for optimal route finding and graph coloring algorithms for efficient runway scheduling. Demonstrates practical applications of algorithmic thinking in aviation logistics.",
      tags: ["Python", "Dijkstra", "Graph Coloring", "Optimization"],
      image: "/images/projects/flight-planner.jpg",
      githubLink: "https://github.com/Helios117/Flight_Planner",
    },
  ],

  contact: {
    heading: "Summon Me",
    subheading: "Let us forge something legendary together",
    email: "suraj.vaidyanathan@gmail.com",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/Helios117", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/suraj-vaidyanathan-6bb080356", icon: "linkedin" },
      { platform: "LeetCode", url: "https://leetcode.com/u/Lord_Helios/", icon: "leetcode" },
    ],
  },
};

export default content;
