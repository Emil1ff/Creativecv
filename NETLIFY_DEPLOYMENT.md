# Netlify Deployment Guide

## Environment Variables Setup

Netlify-də deploy edərkən AI funksiyalarının işləməsi üçün environment variable-ları konfiqurasiya etməlisiniz.

### Addım 1: Netlify Dashboard-a daxil olun
1. https://app.netlify.com/ saytına daxil olun
2. Proyektinizi seçin

### Addım 2: Environment Variables əlavə edin
1. **Site Settings** → **Environment Variables** bölməsinə keçin
2. **Add a variable** düyməsinə basın
3. Aşağıdakı dəyərləri əlavə edin:

```
Key: VITE_GROQ_API_KEY
Value: [Your Groq API Key]
```

### Addım 3: Groq API Key əldə edin
1. https://console.groq.com/keys saytına keçin
2. Hesab yaradın və ya daxil olun
3. **Create API Key** düyməsinə basın
4. API key-i kopyalayın

### Addım 4: Redeploy edin
1. **Deploys** bölməsinə keçin
2. **Trigger deploy** → **Deploy site** seçin

## Build Settings

Netlify avtomatik olaraq `package.json`-dakı build scriptlərini işlədəcək:

```json
{
  "scripts": {
    "build": "tsc -b && vite build"
  }
}
```

## Netlify Configuration (netlify.toml)

Proyektdə `netlify.toml` faylı varsa, build parametrlərini yoxlayın:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Troubleshooting

### API Key xətası
Əgər "GROQ_API_KEY is missing" xətası alırsınızsa:
- Environment variable düzgün əlavə edildiyinə əmin olun
- Variable adının **VITE_GROQ_API_KEY** olduğunu yoxlayın (VITE_ prefix vacibdir!)
- Deploy-dan sonra səhifəni yeniləyin (hard refresh: Ctrl+F5)

### Build xətası
Əgər build zamanı xəta alırsınızsa:
```bash
npm run build
```
komandası ilə local-da test edin.

### Browser console-da xətalar
F12 basıb Console tab-ına baxın və xətaları yoxlayın.

## Security Notes

⚠️ **Diqqət**: `dangerouslyAllowBrowser: true` frontend-də API key-i göstərir. Production üçün:
1. Backend API yaradın (Node.js/Express)
2. API key-i backend-də saxlayın
3. Frontend-dən backend-ə request göndərin

Alternativ olaraq Netlify Functions istifadə edə bilərsiniz.
