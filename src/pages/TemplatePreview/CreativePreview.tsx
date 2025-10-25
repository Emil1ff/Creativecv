import PageMeta from "../../components/common/PageMeta";
import CreativeTemplate from "../../components/cv/templates/CreativeTemplate";

const sampleCvData = {
  personalInfo: {
    firstName: "Gerri",
    lastName: "Smith",
    title: "SETUARY MANAGER",
    email: "gerrismith@email.com",
    phone: "(702) 554-7168",
    location: "Fingerprint Rise Sengerema",
    website: "gerrismith.com",
    linkedin: "linkedin.com/in/gerrismith",
    github: "github.com/gerrismith",
    summary: "Creative professional with expertise in design, branding, and visual storytelling. Passionate about creating impactful experiences through innovative design solutions."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Creative Director",
      company: "Design Studio Pro",
      location: "San Francisco, CA",
      startDate: "Jan 2019",
      endDate: "Present",
      current: true,
      description: "",
      achievements: [
        "Led creative team of 12 designers and artists",
        "Developed award-winning campaigns for Fortune 500 clients",
        "Increased client portfolio by 250% in 3 years"
      ]
    },
    {
      id: "2",
      position: "Art Director",
      company: "Creative Agency Inc",
      location: "Los Angeles, CA",
      startDate: "Jun 2015",
      endDate: "Dec 2018",
      current: false,
      description: "",
      achievements: [
        "Managed multiple high-profile branding projects",
        "Won 5 industry design awards",
        "Mentored junior designers and interns"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Fine Arts in Graphic Design",
      school: "Rhode Island School of Design",
      location: "Providence, RI",
      startDate: "2011",
      endDate: "2015",
      gpa: "3.7",
      description: "Focus on Visual Communication and Digital Design"
    }
  ],
  skills: {
    technical: [
      { name: "Adobe Creative Suite", level: 95 },
      { name: "UI/UX Design", level: 90 },
      { name: "Branding", level: 92 },
      { name: "Motion Graphics", level: 85 }
    ],
    soft: [
      { name: "Creativity", level: 98 },
      { name: "Team Leadership", level: 88 },
      { name: "Client Relations", level: 90 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Conversational" }
    ]
  },
  projects: [
    {
      id: "1",
      name: "Global Brand Redesign",
      startDate: "2023",
      endDate: "2024",
      description: "Complete visual identity overhaul for multinational corporation",
      technologies: ["Branding", "UI Design", "Marketing"]
    }
  ],
  certifications: [],
  selectedTemplate: "creative"
};

export default function CreativePreview() {
  return (
    <>
      <PageMeta
        title="Creative Template Preview - Portfolio CV"
        description="Preview of Creative Portfolio CV template"
      />
      
      <div className="min-h-screen bg-white">
        <CreativeTemplate cvData={sampleCvData} />
      </div>
    </>
  );
}
