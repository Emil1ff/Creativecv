import PageMeta from "../../components/common/PageMeta";
import DesignTemplate from "../../components/cv/templates/DesignTemplate";

const sampleCvData = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Martinez",
    title: "UI/UX Designer",
    email: "alex.martinez@email.com",
    phone: "+1 (555) 321-9876",
    location: "Austin, TX",
    website: "alexmartinez.design",
    linkedin: "linkedin.com/in/alexmartinez",
    github: "github.com/alexmartinez",
    summary: "Award-winning UI/UX designer with 7+ years of experience creating intuitive digital experiences. Specialized in user research, interface design, and design systems. Passionate about solving complex problems through thoughtful design."
  },
  workExperience: [
    {
      id: "1",
      position: "Lead UX Designer",
      company: "Design Tech Studio",
      location: "Austin, TX",
      startDate: "Feb 2020",
      endDate: "Present",
      current: true,
      description: "",
      achievements: [
        "Led design team of 6 designers on multiple product launches",
        "Increased user engagement by 85% through UX improvements",
        "Established comprehensive design system adopted company-wide",
        "Conducted user research with 500+ participants"
      ]
    },
    {
      id: "2",
      position: "Senior UI Designer",
      company: "Creative Digital Agency",
      location: "San Francisco, CA",
      startDate: "Aug 2017",
      endDate: "Jan 2020",
      current: false,
      description: "",
      achievements: [
        "Designed interfaces for 20+ web and mobile applications",
        "Improved conversion rates by 45% through A/B testing",
        "Collaborated with cross-functional teams on product strategy"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Fine Arts in Interaction Design",
      school: "California College of the Arts",
      location: "San Francisco, CA",
      startDate: "2013",
      endDate: "2017",
      gpa: "3.9",
      description: "Focus on Digital Media and User Experience"
    }
  ],
  skills: {
    technical: [
      { name: "Figma", level: 95 },
      { name: "Adobe XD", level: 90 },
      { name: "Sketch", level: 88 },
      { name: "Prototyping", level: 92 },
      { name: "User Research", level: 87 },
      { name: "Design Systems", level: 93 }
    ],
    soft: [
      { name: "Creative Thinking", level: 96 },
      { name: "Collaboration", level: 90 },
      { name: "Problem Solving", level: 92 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Native" }
    ]
  },
  projects: [
    {
      id: "1",
      name: "Mobile Banking App Redesign",
      startDate: "2023",
      endDate: "2024",
      description: "Complete UX overhaul for financial app serving 200K+ users",
      technologies: ["Figma", "User Research", "Prototyping"]
    },
    {
      id: "2",
      name: "E-Commerce Design System",
      startDate: "2022",
      endDate: "2023",
      description: "Built scalable design system for multi-platform retail experience",
      technologies: ["Figma", "Design Tokens", "Component Library"]
    }
  ],
  certifications: [
    {
      id: "1",
      name: "Google UX Design Professional Certificate",
      issuer: "Google",
      date: "2021"
    },
    {
      id: "2",
      name: "Nielsen Norman Group UX Certification",
      issuer: "NN/g",
      date: "2020"
    }
  ],
  selectedTemplate: "design"
};

export default function DesignPreview() {
  return (
    <>
      <PageMeta
        title="Design Template Preview - Designer CV"
        description="Preview of Design CV template with vibrant colors"
      />
      
      <div className="min-h-screen bg-white">
        <DesignTemplate cvData={sampleCvData} />
      </div>
    </>
  );
}
