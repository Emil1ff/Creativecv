# 🤖💬 AI Chat CV Builder

## Xüsusiyyətlər

**AI ilə Söhbət Edərək CV Yaradın!**

İstifadəçi AI ilə adi söhbət edir, AI avtomatik olaraq:
1. ✅ Məlumatları toplayır
2. ✅ Structured CV data yaradır
3. ✅ Uyğun template seçir
4. ✅ CV-ni real-time preview göstərir
5. ✅ Hazır CV-ni saxlayır

## 🎯 Necə İşləyir?

### 1. **Söhbət Başlayır**
AI sizinlə salamlaşır və ilk sualları verir:
```
AI: Salam! 👋 Mən sizə CV yaratmaqda kömək edəcəyəm. 
    Gəlin başlayaq! Adınızı və soyadınızı deyın. 
    Hansı sahədə işləyirsiniz?
```

### 2. **İstifadəçi Cavab Verir**
Siz adi dildə danışırsınız:
```
Siz: Mənim adım Nigar Məmmədovadır, 
     Frontend Developer-əm
```

### 3. **AI Məlumat Toplayır**
AI söhbət zamanı məlumatları ekstrak edir və saxlayır:
- Ad, soyad, peşə
- Email, telefon, ünvan
- İş təcrübəsi
- Skill-lər
- Təhsil
- Template seçimi

### 4. **Real-time Preview**
Məlumatlar toplandıqca CV preview avtomatik göstərilir.

### 5. **CV Saxlanır**
Tamamlandıqda "CV-ni Saxla" düyməsi ilə CV saxlanır.

## 📁 Fayllar

```
src/
├── services/
│   └── aiConversationService.ts    # AI söhbət məntiqi
├── pages/
│   └── AIChatBuilder/
│       └── AIChatBuilder.tsx       # Söhbət interfeysi
└── App.tsx                         # Route: /ai-builder
```

## 🚀 İstifadə

### Route
```
http://localhost:5173/ai-builder
```

### Home Səhifəsindən
Ana səhifədə "AI ilə CV Yarat" düyməsini basın.

## 💡 Nümunə Söhbət

```
AI: Salam! 👋 Adınızı və peşənizi deyın?

Siz: Rəşad Əliyev, Backend Developer

AI: Gözəl! Email və telefon nömrənizi paylaşa bilərsinizmi?

Siz: rashad@example.com, +994501234567

AI: İş təcrübənizi danışın. Hansı şirkətdə işləyirsiniz?

Siz: 3 ildir CodeAcademy-də Backend Developer-əm. 
     Python, Django, PostgreSQL istifadə edirəm.

AI: Super! Təhsiliniz haqqında məlumat verin.

Siz: 2019-cu ildə BDU Kompüter Elmləri fakültəsini bitirmişəm.

AI: ✅ CV hazırdır! Sağ tərəfdə preview görə bilərsiniz.
    "CV-ni Saxla" düyməsini basın.
```

## 🎨 AI Funksiyaları

### Conversation Management
- **startConversation()** - Yeni söhbət başladır
- **sendMessage()** - İstifadəçi mesajını AI-a göndərir
- **extractCvDataFromConversation()** - Söhbətdən CV data çıxarır

### Data Extraction
AI söhbətdən bu məlumatları çıxarır:
```typescript
{
  personalInfo: {
    firstName, lastName, title, email, phone, 
    location, summary
  },
  workExperience: [...],
  skills: { technical: [...], soft: [...] },
  education: [...],
  selectedTemplate: "modern"
}
```

### Progress Tracking
Real-time progress bar:
- 15% - Personal info
- 15% - Contact
- 10% - Summary
- 25% - Experience
- 15% - Skills
- 15% - Education
- 5% - Template

## 🔄 Conversation Flow

```
Start → Personal Info → Contact Info → Summary →
Work Experience → Skills → Education → Template →
Preview → Save
```

## 🎯 Template Seçimi

AI avtomatik template seçir:
- **Modern** - Ümumi peşələr
- **Tech** - Developer, Engineer
- **Creative** - Designer, Artist
- **Classic** - Business, Management
- **Nature** - Environmental, Biology
- **Design** - UX/UI, Graphic Design

## 💻 Kod Nümunəsi

```tsx
import { startConversation, sendMessage } from '@/services/aiConversationService';

// Söhbət başlat
const conversation = startConversation();

// Mesaj göndər
const { reply, updatedState } = await sendMessage(
  conversation,
  "Mənim adım Nigar, Frontend Developer-əm"
);

// CV data-ya bax
console.log(updatedState.cvData);
console.log(updatedState.completed); // true/false
```

## ⚡ Performance

- **Sürətli cavablar** - Groq AI (llama-3.3-70b-versatile)
- **Real-time update** - CV data dərhal güncəllənir
- **Scroll to bottom** - Yeni mesajlar avtomatik görünür
- **Typing indicator** - AI "yazır..." göstəricisi

## 🎨 UI Features

- ✅ Chat interfeysi (Messenger style)
- ✅ Progress bar
- ✅ Typing indicator
- ✅ Real-time CV preview
- ✅ Dark mode
- ✅ Responsive design
- ✅ Keyboard shortcuts (Enter = send)

## 🔧 Konfiqurasiya

### System Prompt
`aiConversationService.ts`-də `SYSTEM_PROMPT` dəyişdirə bilərsiniz:
- AI-ın davranışı
- Sual sırası
- Dil (Azərbaycan/İngilis)

### Extraction Logic
`extractCvDataFromConversation()` funksiyasında:
- JSON format
- Field mapping
- Validation

## 🐛 Troubleshooting

**AI cavab vermir:**
- Groq API key yoxlayın
- .env faylında `VITE_GROQ_API_KEY` olduğunu təsdiqləyin

**Məlumatlar çıxarılmır:**
- AI-a daha strukturlu məlumat verin
- Tarixləri format ilə yazın (YYYY-MM)

**Preview görünmür:**
- Minimum məlumatlar lazımdır (ad, email, experience, education)

## 📚 Əlavə Məlumat

- Main Docs: `AI_FEATURES.md`
- Setup: `GROQ_SETUP.md`
- Demo: `/ai-demo`
- Builder: `/ai-builder`

---

**🎉 İndi test edin:** http://localhost:5173/ai-builder
