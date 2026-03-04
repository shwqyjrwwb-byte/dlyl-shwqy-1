"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function TestImagesPage() {
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    // Get window.location.origin only on client side
    setOrigin(window.location.origin)
  }, [])

  const testImages = [
    { name: "Accounting", path: "/images/accounting.png" },
    { name: "Buffet", path: "/images/buffet.png" },
    { name: "Ceramics", path: "/images/ceramics.png" },
    { name: "Chairman Office", path: "/images/chairman-office.png" },
    { name: "Commerce", path: "/images/commerce.png" },
    { name: "Company Engineers", path: "/images/company-engineers.png" },
    { name: "Contracts", path: "/images/contracts.png" },
    { name: "Customer Service", path: "/images/customer-service.png" },
    { name: "Department Managers", path: "/images/department-managers.png" },
    { name: "Electricity Showroom", path: "/images/electricity-showroom.png" },
    { name: "Executive Leadership", path: "/images/executive-leadership.png" },
    { name: "Furniture", path: "/images/furniture.png" },
    { name: "General Manager", path: "/images/general-manager.png" },
    { name: "HR", path: "/images/hr.png" },
    { name: "Inspections", path: "/images/inspections.png" },
    { name: "IT", path: "/images/it.png" },
    { name: "Legal", path: "/images/legal.png" },
    { name: "Marble Showroom", path: "/images/marble-showroom.png" },
    { name: "Operations", path: "/images/operations.png" },
    { name: "Paint Showroom", path: "/images/paint-showroom.png" },
    { name: "Social Media", path: "/images/social-media.png" },
    { name: "Technical Office", path: "/images/technical-office.png" },
    { name: "Telesales", path: "/images/telesales.png" },
    { name: "Ahmed Shawky", path: "/images/ahmed-shawky.jpeg" },
    { name: "Malak", path: "/images/malak-abdelraouf.jpeg" },
  ]

  const handleError = (imageName: string) => {
    setErrors(prev => ({ ...prev, [imageName]: true }))
    console.error(`Failed to load: ${imageName}`)
  }

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">اختبار الصور - Image Test</h1>
        
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">معلومات النظام:</h2>
          <p>Environment: {process.env.NODE_ENV}</p>
          {origin && <p>Base Path: {origin}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {testImages.map((img) => (
            <div key={img.path} className="border rounded-lg p-4 bg-card">
              <div className="relative w-full h-40 mb-3 bg-muted rounded overflow-hidden">
                {!errors[img.name] ? (
                  <Image
                    src={img.path}
                    alt={img.name}
                    fill
                    className="object-contain p-2"
                    onError={() => handleError(img.name)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-500">
                    <div className="text-center">
                      <p className="text-sm">❌ فشل التحميل</p>
                      <p className="text-xs mt-1">{img.path}</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-center">{img.name}</p>
              <p className="text-xs text-muted-foreground text-center mt-1">{img.path}</p>
              {errors[img.name] && (
                <p className="text-xs text-red-500 text-center mt-2">Error loading</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">اختبار مع img tag:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <img 
                src="/images/accounting.png" 
                alt="Accounting" 
                className="w-full h-32 object-contain"
                onError={(e) => {
                  console.error("img tag failed:", e)
                  e.currentTarget.style.border = "2px solid red"
                }}
              />
              <p className="text-xs text-center mt-2">img tag - accounting.png</p>
            </div>
            <div>
              <img 
                src="/images/ahmed-shawky.jpeg" 
                alt="Ahmed Shawky" 
                className="w-full h-32 object-contain"
                onError={(e) => {
                  console.error("img tag failed:", e)
                  e.currentTarget.style.border = "2px solid red"
                }}
              />
              <p className="text-xs text-center mt-2">img tag - ahmed-shawky.jpeg</p>
            </div>
            <div>
              <img 
                src="/images/hr.png" 
                alt="HR" 
                className="w-full h-32 object-contain"
                onError={(e) => {
                  console.error("img tag failed:", e)
                  e.currentTarget.style.border = "2px solid red"
                }}
              />
              <p className="text-xs text-center mt-2">img tag - hr.png</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">التعليمات:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>إذا ظهرت الصور هنا، المشكلة في صفحة الأقسام نفسها</li>
            <li>إذا لم تظهر الصور، المشكلة في Railway deployment</li>
            <li>افتح Console (F12) لرؤية أي أخطاء</li>
            <li>تحقق من Network tab لرؤية طلبات الصور</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
