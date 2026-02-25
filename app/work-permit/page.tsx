"use client"

import { WorkPermitForm } from "@/components/work-permit-form"

export default function WorkPermitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-3">تصريح دخول ومباشرة أعمال تشطيبات</h1>
          <p className="text-lg text-gray-600">يرجى ملء جميع البيانات المطلوبة بدقة</p>
        </div>
        
        <WorkPermitForm />
      </div>
    </div>
  )
}
