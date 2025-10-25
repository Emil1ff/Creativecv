# 🤖 AI Features - Creative CV

Bu layihəyə **Groq AI** inteqrasiyası əlavə edildi. Aşağıdakı AI funksiyaları mövcuddur:

## 🚀 Xüsusiyyətlər

### 1. **AI CV Generator**
- İş başlığı və təsviri əsasında avtomatik CV yaradır
- Professional summary, skills, experience və education yaradır
- Təcrübə səviyyəsinə görə fərqləndirir

### 2. **AI Text Enhancer**
- Mövcud mətnləri peşəkar şəkildə təkmilləşdirir
- Summary, experience, education və skills mətnlərini optimallaşdırır
- Before/After müqayisəsi göstərir

### 3. **AI Skills Suggestion**
- Peşəyə uyğun skill təklifləri verir
- 12-15 relevant skill (texniki + soft skills)
- Mövcud skill-ləri nəzərə alır

### 4. **AI Cover Letter Generator**
- CV və iş elanı əsasında cover letter yaradır
- Şəxsiləşdirilmiş və peşəkar mətn
- Copy və download funksiyaları

## 📦 Quraşdırma

1. **Groq API Key əldə edin:**
   - [https://console.groq.com/keys](https://console.groq.com/keys) ünvanına daxil olun
   - Qeydiyyatdan keçin və API key yaradın

2. **.env faylı yaradın:**
   ```bash
   # .env.example faylını kopyalayın
   cp .env.example .env
   ```

3. **API key-i əlavə edin:**
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Dependencies artıq quraşdırılıb:**
   ```bash
   npm install groq-sdk
   ```

## 💻 İstifadə

### React Komponentlərdə

```tsx
import { AICVGenerator, AITextEnhancer, AISkillsSuggestion, AICoverLetterGenerator } from '@/components/ai';
import { useAI } from '@/context/AIContext';

function MyComponent() {
  const { isGenerating, error } = useAI();
  
  // AI CV Generator
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowAIGenerator(true)}>
        AI ilə CV Yarat
      </button>
      
      {showAIGenerator && (
        <AICVGenerator
          onGenerated={(data) => {
            console.log('Generated CV:', data);
            // CV məlumatlarını istifadə edin
          }}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </>
  );
}
```

### AI Text Enhancer

```tsx
<AITextEnhancer
  text="Original text to enhance"
  context="summary" // 'summary' | 'experience' | 'education' | 'skills'
  onEnhanced={(enhancedText) => {
    console.log('Enhanced text:', enhancedText);
  }}
  onClose={() => setShow(false)}
/>
```

### AI Skills Suggestion

```tsx
<AISkillsSuggestion
  jobTitle="Frontend Developer"
  existingSkills={['React', 'TypeScript']}
  onSelected={(selectedSkills) => {
    console.log('Selected skills:', selectedSkills);
  }}
  onClose={() => setShow(false)}
/>
```

### AI Cover Letter Generator

```tsx
<AICoverLetterGenerator
  cvData={currentCV}
  onGenerated={(coverLetter) => {
    console.log('Cover letter:', coverLetter);
  }}
  onClose={() => setShow(false)}
/>
```

## 🔧 AI Service API

Servisləri birbaşa da istifadə edə bilərsiniz:

```tsx
import * as groqService from '@/services/groqService';

// CV yaratma
const cvData = await groqService.generateCVContent({
  jobTitle: 'Frontend Developer',
  jobDescription: '...',
  experience: 'mid',
});

// Mətn təkmilləşdirmə
const enhanced = await groqService.enhanceText({
  text: 'Original text',
  context: 'summary',
});

// Skill təklifi
const skills = await groqService.suggestSkills('Frontend Developer', ['React']);

// Cover letter
const letter = await groqService.generateCoverLetter(cvData, jobDesc, 'Company');
```

## 🎯 AI Context Hook

```tsx
import { useAI } from '@/context/AIContext';

function MyComponent() {
  const { 
    isGenerating,      // Loading state
    error,             // Error message
    generateCV,        // CV yaratma
    enhanceText,       // Mətn təkmilləşdirmə
    suggestSkills,     // Skill təklifi
    generateCoverLetter, // Cover letter
    clearError         // Xətanı təmizlə
  } = useAI();
  
  // İstifadə
  const handleGenerate = async () => {
    try {
      const result = await generateCV({ jobTitle: 'Developer' });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
}
```

## 🌟 Xüsusiyyətlər

- ✅ **Groq AI** - Sürətli və pulsuz (llama-3.3-70b-versatile model)
- ✅ **Type-safe** - TypeScript dəstəyi
- ✅ **Context API** - Global state management
- ✅ **Error handling** - Xəta idarəetməsi
- ✅ **Loading states** - Yükləmə statusları
- ✅ **Modal/Dialog UI** - Gözəl istifadəçi interfeysi
- ✅ **Dark mode** - Qaranlıq rejim dəstəyi
- ✅ **Responsive** - Mobil uyğun

## 📝 Model Seçimi

Layihədə **llama-3.3-70b-versatile** modeli istifadə olunur. Digər Groq modelləri:

- `llama-3.3-70b-versatile` - Ən yaxşı keyfiyyət (recommended)
- `llama-3.1-8b-instant` - Daha sürətli, az resurs
- `mixtral-8x7b-32768` - Uzun mətnlər üçün

Model dəyişdirmək üçün `src/services/groqService.ts` faylında `model` parametrini dəyişdirin.

## ⚠️ Məhdudiyyətlər

- Groq API pulsuz tier-də rate limit var
- API key-i secure saxlayın (.env faylı .gitignore-da olmalıdır)
- Frontend-dən API call edilir (`dangerouslyAllowBrowser: true`)
  - Production üçün backend API yaratmaq tövsiyə olunur

## 🔐 Təhlükəsizlik

**.env faylı .gitignore-a əlavə edilib:**
```gitignore
.env
.env.local
```

**QEYD:** API key-i heç vaxt GitHub-a push etməyin!

## 📚 Əlavə Məlumat

- Groq Docs: https://console.groq.com/docs
- Groq Models: https://console.groq.com/docs/models
- Rate Limits: https://console.groq.com/docs/rate-limits

---

**Müəllif:** Groq AI inteqrasiyası Creative CV layihəsinə əlavə edildi.
**Tarix:** 2025
**Model:** llama-3.3-70b-versatile
