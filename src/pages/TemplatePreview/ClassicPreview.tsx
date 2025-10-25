import PageMeta from "../../components/common/PageMeta";
import ClassicTemplate from "../../components/cv/templates/ClassicTemplate";

const sampleCvData = {
  personalInfo: {
    firstName: "John",
    lastName: "Smith",
    title: "Executive Manager",
    email: "john.smith@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    website: "johnsmith.com",
    linkedin: "linkedin.com/in/johnsmith",
    github: "github.com/johnsmith",
    summary: "Results-driven executive with over 15 years of experience in strategic planning, operations management, and team leadership. Proven track record of driving organizational growth and operational excellence."
  },
  workExperience: [
    {
      id: "1",
      position: "Chief Operating Officer",
      company: "Fortune 500 Corporation",
      location: "New York, NY",
      startDate: "Jan 2018",
      endDate: "Present",
      current: true,
      description: "",
      achievements: [
        "Led operational transformation resulting in 35% cost reduction",
        "Managed cross-functional teams of 200+ employees",
        "Implemented strategic initiatives generating $50M in annual revenue"
      ]
    },
    {
      id: "2",
      position: "Vice President of Operations",
      company: "Global Industries Inc",
      location: "Chicago, IL",
      startDate: "Mar 2012",
      endDate: "Dec 2017",
      current: false,
      description: "",
      achievements: [
        "Streamlined operations across 15 regional offices",
        "Improved efficiency metrics by 45%",
        "Developed and mentored senior leadership team"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Business Administration (MBA)",
      school: "Harvard Business School",
      location: "Boston, MA",
      startDate: "2008",
      endDate: "2010",
      gpa: "3.9",
      description: "Focus on Strategic Management and Leadership"
    },
    {
      id: "2",
      degree: "Bachelor of Science in Business Administration",
      school: "University of Pennsylvania",
      location: "Philadelphia, PA",
      startDate: "2004",
      endDate: "2008",
      gpa: "4.0",
      description: "Graduated Summa Cum Laude"
    }
  ],
  skills: {
    technical: [
      { name: "Strategic Planning", level: 95 },
      { name: "Operations Management", level: 93 },
      { name: "Financial Analysis", level: 88 },
      { name: "Project Management", level: 90 }
    ],
    soft: [
      { name: "Leadership", level: 96 },
      { name: "Decision Making", level: 94 },
      { name: "Communication", level: 92 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "French", proficiency: "Professional" }
    ]
  },
  projects: [],
  certifications: [],
  selectedTemplate: "classic"
};

export default function ClassicPreview() {
  return (
    <>
      <PageMeta
        title="Classic Template Preview - Executive CV"
        description="Preview of Classic Executive CV template"
      />
      
      <div className="min-h-screen bg-white">
        <ClassicTemplate cvData={sampleCvData} />
      </div>
    </>
  );
}
