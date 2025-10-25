# 🚀 Groq AI - Quraşdırma Təlimatı

## 1️⃣ Groq API Key Alın

1. [https://console.groq.com](https://console.groq.com) ünvanına daxil olun
2. Qeydiyyatdan keçin (pulsuz)
3. [API Keys](https://console.groq.com/keys) səhifəsinə gedin
4. "Create API Key" düyməsini basın
5. API key-i kopyalayın

## 2️⃣ .env Faylı Yaradın

Layihənin root qovluğunda `.env` faylı yaradın:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

## 3️⃣ API Key-i Əlavə Edin

`.env` faylını açın və API key-i əlavə edin:

```env
VITE_GROQ_API_KEY=gsk_your_api_key_here
```

## 4️⃣ Layihəni İşə Salın

```bash
npm run dev
```

## 5️⃣ AI Features-i Test Edin

Brauzerdə [http://localhost:5173/ai-demo](http://localhost:5173/ai-demo) ünvanına daxil olun.

---

## ✅ Test

API key-in işlədiyini yoxlamaq üçün:

1. `/ai-demo` səhifəsinə gedin
2. İstənilən AI funksiyasını test edin
3. Əgər xəta olarsa, API key-i yoxlayın

## 🔒 Təhlükəsizlik

- ⚠️ `.env` faylı Git-ə push edilməyəcək (`.gitignore`-da var)
- ⚠️ API key-i heç kimə göstərməyin
- ⚠️ Production üçün backend API yaratmaq tövsiyə olunur

## 📞 Kömək

Əgər problem olarsa:
- [Groq Documentation](https://console.groq.com/docs)
- [AI_FEATURES.md](./AI_FEATURES.md) - Ətraflı təlimat
