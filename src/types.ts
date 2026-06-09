export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full-Stack" | "Landing Page" | "Blog" | "SaaS";
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  gallery: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  coverImage: string;
  likes: number;
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 percentage
  iconName: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}
