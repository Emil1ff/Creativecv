import { CvData } from "../CvWizard";

interface ClassicTemplateProps {
  cvData: CvData;
}

export default function ClassicTemplate({ cvData }: ClassicTemplateProps) {
  const { personalInfo, workExperience, skills, education, certifications, projects } = cvData;

  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto p-8" id="cv-content">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <span>📧 {personalInfo.email}</span>
          <span>📱 {personalInfo.phone}</span>
          <span>📍 {personalInfo.location}</span>
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
        {personalInfo.summary && (
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      <p className="text-gray-600 text-sm">{exp.location}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-600">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-medium">{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.location}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-8">
          {/* Technical Skills */}
          {skills.technical.length > 0 && (
            <section className="w-full md:w-[calc(50%-1rem)]">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-3">
                {skills.technical.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 w-24">{skill.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-600 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {skills.soft.length > 0 && (
            <section className="w-full md:w-[calc(50%-1rem)]">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                SOFT SKILLS
              </h2>
              <div className="space-y-3">
                {skills.soft.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 w-24">{skill.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-600 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages */}
        {skills.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-4">
              {skills.languages.map((language, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)]">
                  <p className="font-medium text-gray-900">{language.name}</p>
                  <p className="text-sm text-gray-600">{language.proficiency}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-gray-600 text-sm">{project.startDate} - {project.endDate}</p>
                    </div>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
              CERTIFICATIONS
            </h2>
            <div className="flex flex-wrap gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 border border-gray-200 rounded w-full md:w-[calc(50%-0.5rem)]">
                  <h4 className="font-medium text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
