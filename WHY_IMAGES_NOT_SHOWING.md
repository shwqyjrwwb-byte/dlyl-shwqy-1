# لماذا الصور لا تظهر في الأقسام؟

## 🎯 الإجابة المختصرة

الصور لا تظهر على Railway لأن مجلد `public` لا يتم نسخه تلقائياً عند استخدام `output: 'standalone'` في Next.js.

---

## 🔍 التشخيص السريع

### الخطوة 1: افتح صفحة الاختبار
```
https://your-app.railway.app/test-images
```

**ماذا سترى**:
- ✅ إذا ظهرت الصور: المشكلة محلولة!
- ❌ إذا لم تظهر: تابع الخطوات التالية

---

### الخطوة 2: تحقق من API
```
https://your-app.railway.app/api/check-images
```

**ماذا تبحث عنه**:
```json
{
  "success": true,
  "checks": {
    "publicDirExists": true,  // ✅ يجب أن يكون true
    "imagesDirExists": true,  // ✅ يجب أن يكون true
    "totalFiles": 200,        // ✅ يجب أن يكون > 0
    "departmentImages": {
      "accounting.png": true, // ✅ يجب أن يكون true
      "hr.png": true,
      // ... إلخ
    }
  }
}
```

**إذا كانت النتيجة**:
- `publicDirExists: false` → مجلد public مفقود تماماً
- `imagesDirExists: false` → مجلد images مفقود
- `totalFiles: 0` → لا توجد صور
- `departmentImages: false` → صور الأقسام مفقودة

---

### الخطوة 3: تحقق من Build Logs على Railway

1. افتح Railway Dashboard
2. اذهب إلى: Deployments → Latest → View Logs
3. ابحث عن:

```bash
# يجب أن ترى هذه الرسائل:
📁 Copying public folder to standalone build...
✅ Public folder copied successfully!
✅ 200+ items found in images directory
```

**إذا لم ترى هذه الرسائل**:
- السكريبت `scripts/copy-public.js` لم يعمل
- الحل: أعد النشر

---

## 🔧 الحلول

### الحل 1: أعد النشر على Railway (الأسرع)

```bash
# في Railway Dashboard
Deployments → Redeploy
```

انتظر حتى ينتهي البناء، ثم تحقق من Build Logs.

---

### الحل 2: تحقق من الكود المحلي

```bash
# على جهازك
npm run build
```

**يجب أن ترى**:
```
📁 Copying public folder to standalone build...
✅ Public folder copied successfully!
✅ XXX items found in images directory
```

**إذا لم ترى هذه الرسائل**:
- المشكلة في `scripts/copy-public.js`
- تحقق من أن الملف موجود
- تحقق من `package.json` build script

---

### الحل 3: تحقق من package.json

```json
{
  "scripts": {
    "build": "next build && node scripts/copy-public.js"
  }
}
```

**يجب أن يحتوي على**: `&& node scripts/copy-public.js`

---

### الحل 4: تحقق من next.config.mjs

```javascript
{
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./public/**/*'],
    },
  },
}
```

---

### الحل 5: تحقق من railway.toml

```toml
[staticFiles]
path = "public"
```

---

## 🧪 اختبار محلي

```bash
# 1. بناء المشروع
npm run build

# 2. تحقق من وجود الصور
ls .next/standalone/public/images/

# 3. يجب أن ترى جميع الصور
# إذا لم ترى الصور، السكريبت لم يعمل

# 4. شغل المشروع
npm start

# 5. افتح المتصفح
http://localhost:3000/contacts
```

---

## 📊 الأسباب الشائعة

### 1. السكريبت لم يعمل (90%)
**السبب**: `scripts/copy-public.js` لم يتم تشغيله
**الحل**: تحقق من build script في package.json

### 2. مجلد public فارغ (5%)
**السبب**: الصور لم يتم رفعها على Git
**الحل**: تحقق من `.gitignore`

### 3. مشكلة في Railway (3%)
**السبب**: Railway لا يخدم الملفات الثابتة
**الحل**: تحقق من railway.toml

### 4. مشكلة في المسارات (2%)
**السبب**: المسارات غير صحيحة في الكود
**الحل**: تحقق من `/images/` في الكود

---

## ✅ التحقق النهائي

بعد تطبيق الحلول، تحقق من:

1. ✅ `/test-images` - جميع الصور تظهر
2. ✅ `/api/check-images` - success: true
3. ✅ `/contacts` - صور الأقسام تظهر
4. ✅ `/home` - صور الخلفية تظهر
5. ✅ Console (F12) - لا توجد أخطاء

---

## 🆘 إذا لم ينجح شيء

**اتصل بي وأرسل**:
1. رابط `/api/check-images` على Railway
2. Build Logs من Railway
3. Screenshot من Console (F12)
4. Screenshot من Network tab

---

## 📝 ملخص سريع

| المشكلة | السبب | الحل |
|---------|-------|------|
| لا صور تظهر | مجلد public مفقود | أعد النشر |
| بعض الصور تظهر | ملفات محددة مفقودة | تحقق من الأسماء |
| الصور بطيئة | حجم كبير | ضغط الصور |
| 404 errors | مسارات خاطئة | تحقق من الكود |

---

## 🎯 الخطوات التالية

1. افتح `/test-images` على Railway
2. افتح `/api/check-images` على Railway
3. تحقق من Build Logs
4. إذا كل شيء صحيح، الصور يجب أن تظهر
5. إذا لم تظهر، أرسل لي النتائج

---

تاريخ التحديث: ${new Date().toLocaleDateString('ar-EG')}
