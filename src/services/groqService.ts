import Groq from "groq-sdk";

// API key-in olub-olmadığını yoxla
const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.error('GROQ_API_KEY is not configured. Please set VITE_GROQ_API_KEY environment variable.');
}

const groq = apiKey ? new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Frontend üçün
}) : null;

export interface CVData {
  jobTitle: string;
  jobDescription?: string;
  experience?: string;
  skills?: string[];
}

export interface EnhanceTextOptions {
  text: string;
  context: 'summary' | 'experience' | 'education' | 'skills';
}

// AI CV Generator
export async function generateCVContent(data: CVData): Promise<any> {
  const prompt = `
You are a professional CV writer. Based on the following job information, generate a comprehensive CV content in JSON format.

Job Title: ${data.jobTitle}
${data.jobDescription ? `Job Description: ${data.jobDescription}` : ''}
${data.experience ? `Experience Level: ${data.experience}` : ''}
${data.skills ? `Existing Skills: ${data.skills.join(', ')}` : ''}

Generate a structured CV with the following sections:
1. Professional Summary (2-3 sentences)
2. Key Skills (8-12 skills relevant to the job)
3. Work Experience suggestions (2-3 relevant positions with bullet points)
4. Education recommendations

Return ONLY valid JSON in this exact format:
{
  "summary": "professional summary text",
  "skills": ["skill1", "skill2", ...],
  "workExperience": [
    {
      "position": "Job Title",
      "company": "Company Name",
      "duration": "2020 - 2023",
      "responsibilities": ["responsibility1", "responsibility2", "responsibility3"]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "year": "2020"
    }
  ]
}
`;

  try {
    if (!groq) {
      throw new Error('Groq API is not configured. Please set VITE_GROQ_API_KEY environment variable.');
    }
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2000,
    });

    let content = completion.choices[0]?.message?.content || "{}";
    
    // Markdown kod bloklarını təmizlə (```json ... ```)
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    return JSON.parse(content);
  } catch (error) {
    console.error("AI CV generation error:", error);
    throw new Error("Failed to generate CV content");
  }
}

// AI Text Enhancer
export async function enhanceText(options: EnhanceTextOptions): Promise<string> {
  const contextInstructions = {
    summary: "professional summary for a CV. Make it compelling, concise (2-3 sentences), and highlight key achievements",
    experience: "work experience bullet point. Make it action-oriented, quantifiable, and achievement-focused",
    education: "education description. Make it clear and highlight relevant coursework or achievements",
    skills: "skills description. Make it professional and highlight proficiency level"
  };

  const prompt = `
You are a professional CV writer. Improve the following ${contextInstructions[options.context]}.

Original text: "${options.text}"

Return ONLY the improved text without any explanations, quotes, or additional formatting. The text should be professional, clear, and impactful.
`;

  try {
    if (!groq) {
      throw new Error('Groq API is not configured. Please set VITE_GROQ_API_KEY environment variable.');
    }
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content?.trim() || options.text;
  } catch (error) {
    console.error("AI text enhancement error:", error);
    throw new Error("Failed to enhance text");
  }
}

// AI Skills Suggestion
export async function suggestSkills(jobTitle: string, existingSkills: string[] = []): Promise<string[]> {
  const prompt = `
You are a career advisor. Suggest 12-15 relevant professional skills for a "${jobTitle}" position.
${existingSkills.length > 0 ? `Exclude these existing skills: ${existingSkills.join(', ')}` : ''}

Return ONLY a JSON array of skill names, nothing else. Format: ["skill1", "skill2", ...]
Include both technical and soft skills relevant to the position.
`;

  try {
    if (!groq) {
      throw new Error('Groq API is not configured. Please set VITE_GROQ_API_KEY environment variable.');
    }
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 500,
    });

    let content = completion.choices[0]?.message?.content || "[]";
    
    // Markdown kod bloklarını təmizlə
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const skills = JSON.parse(content);
    return Array.isArray(skills) ? skills : [];
  } catch (error) {
    console.error("AI skills suggestion error:", error);
    throw new Error("Failed to suggest skills");
  }
}

// AI Cover Letter Generator
export async function generateCoverLetter(cvData: any, jobDescription: string, companyName: string): Promise<string> {
  const prompt = `
You are a professional cover letter writer. Create a compelling cover letter based on the following information:

Candidate Name: ${cvData.personalInfo?.firstName} ${cvData.personalInfo?.lastName}
Current Position: ${cvData.personalInfo?.title || 'Professional'}
Company: ${companyName}
Job Description: ${jobDescription}

Skills: ${cvData.skills?.join(', ') || 'N/A'}
Recent Experience: ${cvData.workExperience?.[0]?.position || 'N/A'} at ${cvData.workExperience?.[0]?.company || 'N/A'}

Write a professional, engaging cover letter (3-4 paragraphs) that:
1. Opens with enthusiasm for the position
2. Highlights relevant skills and experience
3. Shows knowledge of the company
4. Closes with a call to action

Return ONLY the cover letter text, no additional formatting or explanations.
`;

  try {
    if (!groq) {
      throw new Error('Groq API is not configured. Please set VITE_GROQ_API_KEY environment variable.');
    }
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("AI cover letter generation error:", error);
    throw new Error("Failed to generate cover letter");
  }
}

export default {
  generateCVContent,
  enhanceText,
  suggestSkills,
  generateCoverLetter,
};
