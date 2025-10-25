import PageMeta from "../../components/common/PageMeta";
import NatureTemplate from "../../components/cv/templates/NatureTemplate";

const sampleCvData = {
  personalInfo: {
    firstName: "Sarah",
    lastName: "Green",
    title: "Environmental Scientist",
    email: "sarah.green@email.com",
    phone: "+1 (555) 876-5432",
    location: "Portland, OR",
    website: "sarahgreen.eco",
    linkedin: "linkedin.com/in/sarahgreen",
    github: "github.com/sarahgreen",
    summary: "Dedicated environmental scientist with 8+ years of experience in sustainability research, ecological conservation, and environmental policy development. Committed to creating positive environmental impact through data-driven solutions."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Environmental Scientist",
      company: "EcoSolutions Research Institute",
      location: "Portland, OR",
      startDate: "Mar 2019",
      endDate: "Present",
      current: true,
      description: "",
      achievements: [
        "Led 15+ environmental impact assessment projects",
        "Developed sustainable practices reducing carbon footprint by 40%",
        "Published 8 research papers in peer-reviewed journals",
        "Secured $2M in research grants"
      ]
    },
    {
      id: "2",
      position: "Environmental Consultant",
      company: "Green Future Consulting",
      location: "Seattle, WA",
      startDate: "Jun 2015",
      endDate: "Feb 2019",
      current: false,
      description: "",
      achievements: [
        "Advised 30+ organizations on sustainability initiatives",
        "Implemented waste reduction programs saving 200+ tons annually",
        "Conducted environmental compliance audits"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Science in Environmental Science",
      school: "University of Oregon",
      location: "Eugene, OR",
      startDate: "2013",
      endDate: "2015",
      gpa: "3.9",
      description: "Focus on Ecology and Conservation Biology"
    },
    {
      id: "2",
      degree: "Bachelor of Science in Biology",
      school: "Portland State University",
      location: "Portland, OR",
      startDate: "2009",
      endDate: "2013",
      gpa: "3.8",
      description: "Minor in Environmental Studies"
    }
  ],
  skills: {
    technical: [
      { name: "Environmental Impact Assessment", level: 92 },
      { name: "GIS Mapping", level: 85 },
      { name: "Data Analysis", level: 88 },
      { name: "Field Research", level: 90 }
    ],
    soft: [
      { name: "Research", level: 94 },
      { name: "Project Management", level: 86 },
      { name: "Communication", level: 89 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Professional" }
    ]
  },
  projects: [],
  certifications: [
    {
      id: "1",
      name: "Certified Environmental Professional (CEP)",
      issuer: "Academy of Board Certified Environmental Professionals",
      date: "2020"
    },
    {
      id: "2",
      name: "LEED Green Associate",
      issuer: "U.S. Green Building Council",
      date: "2019"
    }
  ],
  selectedTemplate: "nature"
};

export default function NaturePreview() {
  return (
    <>
      <PageMeta
        title="Nature Template Preview - Environmental CV"
        description="Preview of Nature CV template with organic design"
      />
      
      <div className="min-h-screen bg-white">
        <NatureTemplate cvData={sampleCvData} />
      </div>
    </>
  );
}
