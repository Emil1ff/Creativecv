import PageMeta from "../../components/common/PageMeta";
import TechTemplate from "../../components/cv/templates/TechTemplate";

const sampleCvData = {
  personalInfo: {
    firstName: "Edward",
    lastName: "Newlin",
    title: "Software Engineer",
    email: "edward.newlin@email.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    website: "edwardnewlin.dev",
    linkedin: "linkedin.com/in/edwardnewlin",
    github: "github.com/edwardnewlin",
    summary: "Full-stack software engineer with 6+ years of experience building scalable web applications. Specialized in React, Node.js, Python, and cloud technologies. Passionate about clean code and innovative solutions."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Software Engineer",
      company: "Tech Innovations Inc",
      location: "Seattle, WA",
      startDate: "Jan 2021",
      endDate: "Present",
      current: true,
      description: "",
      achievements: [
        "Architected and deployed microservices handling 1M+ requests daily",
        "Reduced API response time by 60% through optimization",
        "Led migration to cloud infrastructure (AWS)",
        "Mentored team of 4 junior developers"
      ]
    },
    {
      id: "2",
      position: "Software Engineer",
      company: "Digital Solutions Co",
      location: "San Francisco, CA",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      current: false,
      description: "",
      achievements: [
        "Developed full-stack features for SaaS platform",
        "Implemented CI/CD pipeline reducing deployment time by 70%",
        "Built RESTful APIs serving 50K+ active users"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of Washington",
      location: "Seattle, WA",
      startDate: "2014",
      endDate: "2018",
      gpa: "3.9",
      description: "Focus on Software Engineering and Machine Learning"
    }
  ],
  skills: {
    technical: [
      { name: "React", level: 92 },
      { name: "Node.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "AWS", level: 82 },
      { name: "Docker", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 78 }
    ],
    soft: [
      { name: "Problem Solving", level: 94 },
      { name: "Team Collaboration", level: 88 },
      { name: "Communication", level: 85 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Japanese", proficiency: "Intermediate" }
    ]
  },
  projects: [
    {
      id: "1",
      name: "Real-time Chat Application",
      startDate: "2023",
      endDate: "2024",
      description: "Built scalable real-time messaging platform with WebSocket support",
      technologies: ["React", "Node.js", "Socket.io", "Redis", "MongoDB"],
      url: "https://github.com/example/chat-app"
    },
    {
      id: "2",
      name: "E-Commerce Platform",
      startDate: "2022",
      endDate: "2023",
      description: "Developed full-stack e-commerce solution with payment integration",
      technologies: ["React", "Express", "Stripe", "PostgreSQL"],
      url: "https://github.com/example/ecommerce"
    }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      id: "2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2022"
    }
  ],
  selectedTemplate: "tech"
};

export default function TechPreview() {
  return (
    <>
      <PageMeta
        title="Tech Template Preview - Software Engineer CV"
        description="Preview of Tech CV template for IT professionals"
      />
      
      <div className="min-h-screen bg-white">
        <TechTemplate cvData={sampleCvData} />
      </div>
    </>
  );
}
