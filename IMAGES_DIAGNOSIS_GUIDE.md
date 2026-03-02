# دليل تشخيص مشكلة الصور - Images Diagnosis Guide

## 🔍 الأسباب المحتملة لعدم ظهور الصور

### 1. المشكلة على Railway (الأكثر احتمالاً)

**السبب**: مجلد `public` لم يتم نسخه إلى standalone build

**كيفية التحقق**:
1. افتح Railway Dashboard
2. اذهب إلى Deployments → Latest → View Logs
3. ابحث عن:
   ```
   ✅ Public folder copied successfully!
   ✅ XXX items found in images directory
   ```

**إذا لم تجد هذه الرسائل**:
- المشكلة: السكريبت لم يعمل
- الحل: أعد النشر يدوياً

**إذا وجدت الرسائل**:
- المشكلة قد تكون في مكان آخر

---

### 2. مشكلة في المسارات (Paths)

**الأسباب المحتملة**:

#### أ) المسار غير صحيح
```javascript
// ✅ صحيح
src="/images/accounting.png"

// ❌ خطأ
src="images/accounting.png"
src="./images/accounting.png"
src="/public/images/accounting.png"
```

#### ب) اسم الملف غير صحيح
```javascript
// تحقق من الحالة (case-sensitive)
// ✅ صحيح
src="/images/accounting.png"

// ❌ خطأ (إذا كان الملف Accounting.png)
src="/images/Accounting.png"
```

#### ج) امتداد الملف غير صحيح
```javascript
// تحقق من الامتداد
// ✅ صحيح
src="/images/ahmed-shawky.jpeg"

// ❌ خطأ
src="/images/ahmed-shawky.jpg"
```

---

### 3. مشكلة في Next.js Image Component

**الأسباب المحتملة**:

#### أ) unoptimized setting
```javascript
// في next.config.mjs
images: {
  unoptimized: true, // ✅ يجب أن يكون true على Railway
}
```

#### ب) loader مفقود
```javascript
// إذا كنت تستخدم custom loader
images: {
  loader: 'default', // أو custom loader
}
```

---

### 4. مشكلة في CORS أو Headers

**الأعراض**:
- الصور تعمل محلياً
- الصور لا تعمل على Railway
- Console يظهر CORS errors

**الحل**:
أضف headers في `next.config.mjs`:
```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

---

### 5. مشكلة في Railway Static Files

**السبب**: Railway لا يخدم الملفات الثابتة بشكل صحيح

**الحل**:
تحقق من `railway.toml`:
```toml
[staticFiles]
path = "public"
```

---

## 🧪 خطوات التشخيص

### الخطوة 1: اختبار محلي
```bash
npm run build
npm start
```
افتح `http://localhost:3000/contacts`
- ✅ إذا ظهرت الصور: المشكلة على Railway
- ❌ إذا لم تظهر: المشكلة في الكود

---

### الخطوة 2: اختبار صفحة Test Images
افتح: `https://your-app.railway.app/test-images`

هذه الصفحة تختبر:
- Next.js Image component
- img tag عادي
- مسارات مختلفة
- أنواع ملفات مختلفة (png, jpeg)

**النتائج**:
- ✅ كل الصور تظهر: المشكلة في صفحة الأقسام نفسها
- ❌ بعض الصور لا تظهر: مشكلة في الملفات المحددة
- ❌ لا صور تظهر: مشكلة في Railway deployment

---

### الخطوة 3: فحص Network Tab
1. افتح صفحة الأقسام
2. اضغط F12 → Network tab
3. رشح بـ "images" أو "png"
4. حدث الصفحة

**ماذا تبحث عنه**:
- **Status 200**: الصورة تحملت بنجاح ✅
- **Status 404**: الصورة غير موجودة ❌
- **Status 500**: خطأ في السيرفر ❌
- **Failed**: مشكلة في الاتصال ❌

---

### الخطوة 4: فحص Console
افتح Console (F12) وابحث عن:
```
Failed to load resource: net::ERR_FILE_NOT_FOUND
```
أو
```
Image failed to load
```

---

### الخطوة 5: فحص الملفات على Railway

**الطريقة 1: من Build Logs**
```bash
# ابحث في logs عن
ls -la .next/standalone/public/images/
```

**الطريقة 2: إضافة endpoint للتحقق**
أضف في `app/api/check-images/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public', 'images')
  
  try {
    const files = fs.readdirSync(publicDir)
    return NextResponse.json({
      success: true,
      count: files.length,
      files: files.slice(0, 20), // أول 20 ملف
      path: publicDir
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      path: publicDir
    })
  }
}
```

ثم افتح: `https://your-app.railway.app/api/check-images`

---

## 🔧 الحلول المقترحة

### الحل 1: التأكد من Build Script
```json
// في package.json
"scripts": {
  "build": "next build && node scripts/copy-public.js"
}
```

### الحل 2: استخدام img tag بدلاً من Image
```jsx
// بدلاً من
<Image src="/images/accounting.png" alt="Accounting" fill />

// استخدم
<img src="/images/accounting.png" alt="Accounting" className="w-full h-full object-contain" />
```

### الحل 3: تحديث outputFileTracingIncludes
```javascript
// في next.config.mjs
experimental: {
  outputFileTracingIncludes: {
    '/*': ['./public/**/*'],
    '/api/**': ['./public/**/*'],
  },
}
```

### الحل 4: إضافة publicRuntimeConfig
```javascript
// في next.config.mjs
publicRuntimeConfig: {
  staticFolder: '/public',
}
```

### الحل 5: استخدام CDN خارجي
إذا استمرت المشكلة، يمكن رفع الصور على:
- Cloudinary
- AWS S3
- Vercel Blob
- Imgur

---

## 📊 جدول التشخيص السريع

| الأعراض | السبب المحتمل | الحل |
|---------|---------------|------|
| الصور تعمل محلياً فقط | Railway deployment | تحقق من Build Logs |
| بعض الصور تعمل وبعضها لا | أسماء ملفات خاطئة | تحقق من الأسماء |
| لا صور تظهر أبداً | مجلد public مفقود | أعد النشر |
| 404 errors | مسارات خاطئة | تحقق من المسارات |
| صور بطيئة جداً | حجم الصور كبير | ضغط الصور |

---

## 🎯 الخطوات التالية

1. ✅ افتح `/test-images` على Railway
2. ✅ تحقق من Console و Network tab
3. ✅ راجع Build Logs على Railway
4. ✅ جرب الحلول المقترحة واحداً تلو الآخر
5. ✅ إذا استمرت المشكلة، استخدم img tag بدلاً من Image component

---

## 📝 ملاحظات مهمة

1. **Railway يستخدم Nixpacks**: قد يتعامل مع الملفات بشكل مختلف
2. **Standalone mode**: يتطلب نسخ يدوي لمجلد public
3. **unoptimized: true**: ضروري على Railway
4. **الصور في Git**: تأكد أن جميع الصور مرفوعة على GitHub

---

## 🆘 إذا لم ينجح شيء

**الحل النهائي**: استبدل جميع `<Image>` بـ `<img>`:

```bash
# ابحث عن جميع استخدامات Image
grep -r "<Image" components/

# استبدلها بـ img tag
```

**مثال**:
```jsx
// قبل
<Image
  src="/images/accounting.png"
  alt="Accounting"
  fill
  className="object-contain"
/>

// بعد
<img
  src="/images/accounting.png"
  alt="Accounting"
  className="w-full h-full object-contain"
/>
```

---

تاريخ التحديث: ${new Date().toLocaleDateString('ar-EG')}
