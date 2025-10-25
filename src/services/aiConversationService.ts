import Groq from "groq-sdk";
import { CvData } from "../components/cv/CvWizard";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ConversationState {
  messages: Message[];
  cvData: Partial<CvData>;
  completed: boolean;
  currentStep: string;
}

const SYSTEM_PROMPT = `Sen dostcasına, empatik və köməkçi bir CV məsləhətçisisfən. ChatGPT kimi təbii və səmimi danış.

DAVRANIŞ TƏRZI:
- Təbii, dostcasına və səmimi ol (robot kimi deyil!)
- Emoji istifadə et amma çox deyil (1-2 emoji kifayət)
- Quru-formal deyil, söhbət kimi danış
- Rəğbətləndir və müsbət ol
- Hər dəfə 1-2 sual ver (insanlar çox sual sevmir)
- HEÇVAXT JSON, kod və ya formal struktur göstərmə

TOPLAMA PROSESI:
1. Salam və tanışlıq - ad, soyad, peşə
2. Əlaqə - email, telefon, şəhər
3. Kar’yera hekayəsi - professional summary
4. İş təcrübəsi - harada, necə, nə etdin?
5. Bacarıqlar - texniki və soft skills
6. Təhsil - harada oxumuşsan?
7. Arzular - hansı template beğənirsin?

NÜMUNƏLƏR:

PİS (robot kimi):
"✅ Qeyd etdim:
- Ad: Emil Hesenov
İndi email və telefon nömrənizi deyə bilərsinizmi?"

YAXSI (dostcasına):
"Gözəl! Emil, sizə tanışmaq xöşdur! 😊

Frontend Developer olaraq paylaşdığınız üçün təşəkkürlər. İndi bir email və telefon nömrəsi qeyd edək ki, işə götürənlər sizi tez tapa bilsinlər. Nə deyirsiniz? 📞"

ADI DİLDƏ DANIŞ:
- "Qeyd etdim" deyil → "Gözəl!", "Super!", "Mənimilə paylaşdığınız üçün sağ olun!"
- Rəğbətləndirmək - "Siz artdq çox yaxınsmız!", "Əla belə!"
- Empatiya - "Bilirəm, CV yaratmaq çətin ola bilər, amma mən kömək edəcəm!"
- Sual vermək - "Nə deyirsiniz?", "Necfədir?", "Paylaşa bilərsinizmi?"

Azərbaycan və ya ingilis dilində danış (istifadəçiyə uyğun).
Robot kimi deyil, DOST kimi danış!`;

export async function sendMessage(
  conversationState: ConversationState,
  userMessage: string
): Promise<{ reply: string; updatedState: ConversationState }> {
  const newMessages: Message[] = [
    ...conversationState.messages,
    { role: "user", content: userMessage },
  ];

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...newMessages,
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.9,
      max_tokens: 1500,
    });

    const reply = completion.choices[0]?.message?.content || "Üzr istəyirəm, xəta baş verdi.";

    newMessages.push({ role: "assistant", content: reply });

    const extractedData = await extractCvDataFromConversation(newMessages);

    return {
      reply,
      updatedState: {
        messages: newMessages,
        cvData: extractedData,
        completed: isConversationComplete(extractedData),
        currentStep: getCurrentStep(extractedData),
      },
    };
  } catch (error) {
    console.error("AI conversation error:", error);
    throw new Error("Söhbət zamanı xəta baş verdi");
  }
}

async function extractCvDataFromConversation(
  messages: Message[]
): Promise<Partial<CvData>> {
  const conversationText = messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const extractPrompt = `
Aşağıdakı söhbətdən CV məlumatlarını çıxar və JSON formatda ver.

Söhbət:
${conversationText}

ÇIXARIŞ FORMATI (YALNIZ OLAN məlumatları ver, olmayan field-ləri buraxma):
{
  "personalInfo": {
    "firstName": "...",
    "lastName": "...",
    "title": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "summary": "..."
  },
  "workExperience": [
    {
      "company": "...",
      "position": "...",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "description": "...",
      "achievements": ["..."]
    }
  ],
  "skills": {
    "technical": [{"name": "...", "level": 4}],
    "soft": [{"name": "...", "level": 3}]
  },
  "education": [
    {
      "degree": "...",
      "school": "...",
      "startDate": "YYYY",
      "endDate": "YYYY"
    }
  ],
  "selectedTemplate": "modern"
}

QEYD: 
- Skill level 1-5 arasında olmalıdır
- Template: modern, classic, creative, tech, nature, design
- YALNIZ JSON ver, başqa heç nə yazma
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: extractPrompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2000,
    });

    let content = completion.choices[0]?.message?.content || "{}";
    
    // Clean markdown code blocks
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const extractedData = JSON.parse(content);
    
    // Add IDs to array items and ensure all fields exist
    if (extractedData.workExperience) {
      extractedData.workExperience = extractedData.workExperience.map((item: any, idx: number) => ({
        ...item,
        id: `work-${Date.now()}-${idx}`,
        achievements: item.achievements || [],
        location: item.location || '',
      }));
    }
    
    if (extractedData.education) {
      extractedData.education = extractedData.education.map((item: any, idx: number) => ({
        ...item,
        id: `edu-${Date.now()}-${idx}`,
        location: item.location || '',
        gpa: item.gpa || '',
        description: item.description || '',
      }));
    }
    
    if (extractedData.projects) {
      extractedData.projects = extractedData.projects.map((item: any, idx: number) => ({
        ...item,
        id: `proj-${Date.now()}-${idx}`,
        technologies: item.technologies || [],
        url: item.url || '',
      }));
    }

    return extractedData;
  } catch (error) {
    console.error("Data extraction error:", error);
    return {};
  }
}

// Check if conversation is complete
function isConversationComplete(cvData: Partial<CvData>): boolean {
  return !!(
    cvData.personalInfo?.firstName &&
    cvData.personalInfo?.lastName &&
    cvData.personalInfo?.email &&
    cvData.workExperience &&
    cvData.workExperience.length > 0 &&
    cvData.skills &&
    cvData.education &&
    cvData.education.length > 0
  );
}

// Get current step of conversation
function getCurrentStep(cvData: Partial<CvData>): string {
  if (!cvData.personalInfo?.firstName) return "personal";
  if (!cvData.personalInfo?.email) return "contact";
  if (!cvData.personalInfo?.summary) return "summary";
  if (!cvData.workExperience || cvData.workExperience.length === 0) return "experience";
  if (!cvData.skills) return "skills";
  if (!cvData.education || cvData.education.length === 0) return "education";
  if (!cvData.selectedTemplate) return "template";
  return "complete";
}

// Start a new conversation
export function startConversation(): ConversationState {
  return {
    messages: [
      {
        role: "assistant",
        content: "Salam! 👋 Sizə tanışmaq çox xöşdur!\n\nMən sizə peşəkar CV yaratmaqda kömək edəcəyəm. Bilirəm, CV hazırlamaq bəzən çətin ola bilər, amma narahat olmayın - mən burdayam! 😊\n\nGəlin addım-addım gedinək. Əvvəlcə bir-birimizlə tanışaq: Adınız, soyadınız nədir? Və hansı sahədə çalışırsınız? 🎯",
      },
    ],
    cvData: {},
    completed: false,
    currentStep: "personal",
  };
}
