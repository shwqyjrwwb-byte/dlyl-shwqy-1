"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Upload, User, MapPin, FileText, AlertCircle, CheckCircle } from "lucide-react"

interface WorkerData {
  name: string
  nationalIdImage: File | null
}

export function WorkPermitForm() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    siteName: "",
    siteCode: "",
    region: "",
    contractorName: "",
    contractorNationalId: null as File | null,
    engineerName: "",
    engineerPhone: "",
    workPhase: "",
    notes: "",
  })

  const [workers, setWorkers] = useState<WorkerData[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleAddWorker = () => {
    if (workers.length < 9) {
      setWorkers([...workers, { name: "", nationalIdImage: null }])
    }
  }

  const handleRemoveWorker = (index: number) => {
    setWorkers(workers.filter((_, i) => i !== index))
  }

  const handleWorkerChange = (index: number, field: keyof WorkerData, value: string | File) => {
    const newWorkers = [...workers]
    newWorkers[index] = { ...newWorkers[index], [field]: value }
    setWorkers(newWorkers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // إنشاء FormData لرفع الملفات
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        submitData.append(key, value)
      } else if (value) {
        submitData.append(key, value.toString())
      }
    })

    // إضافة بيانات العمال
    workers.forEach((worker, index) => {
      submitData.append(`worker_${index}_name`, worker.name)
      if (worker.nationalIdImage) {
        submitData.append(`worker_${index}_id`, worker.nationalIdImage)
      }
    })

    try {
      const response = await fetch("/api/work-permit", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        setSubmitSuccess(true)
        // إعادة تعيين النموذج
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("حدث خطأ أثناء إرسال الطلب")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Card className="p-12 text-center bg-green-50 border-green-200">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-green-900 mb-3">تم إرسال الطلب بنجاح!</h2>
        <p className="text-lg text-green-700">سيتم مراجعة طلبك والرد عليك في أقرب وقت</p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-8 shadow-2xl border-2">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl mb-8 -mx-8 -mt-8">
          <h2 className="text-2xl font-black text-center">تصريح دخول ومباشرة أعمال تشطيبات</h2>
          <p className="text-center text-blue-100 mt-2">بناءً على العقد المبرم بيننا، يتم بموجب هذا منحكم التصريح لمباشرة الأعمال الموضحة أدناه</p>
        </div>

        {/* القسم 1: بيانات الموقع والعمل */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-blue-600 pb-2">
            <FileText className="w-6 h-6 text-blue-600" />
            1. بيانات الموقع والعمل
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate" className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تاريخ بداية الأعمال
              </Label>
              <Input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="endDate" className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تاريخ انتهاء الأعمال
              </Label>
              <Input
                id="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="siteName" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                اسم الموقع
              </Label>
              <Input
                id="siteName"
                type="text"
                required
                placeholder="أدخل اسم الموقع"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="siteCode" className="text-base font-semibold">
                كود الموقع
              </Label>
              <Input
                id="siteCode"
                type="text"
                required
                placeholder="أدخل كود الموقع"
                value={formData.siteCode}
                onChange={(e) => setFormData({ ...formData, siteCode: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="region" className="text-base font-semibold">
                المنطقة
              </Label>
              <Input
                id="region"
                type="text"
                required
                placeholder="أدخل المنطقة"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="workPhase" className="text-base font-semibold">
                مرحلة العمل
              </Label>
              <Input
                id="workPhase"
                type="text"
                required
                placeholder="مثال: المرحلة الأولى - التأسيس"
                value={formData.workPhase}
                onChange={(e) => setFormData({ ...formData, workPhase: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* القسم 2: بيانات المقاول */}
        <div className="mb-8 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-green-600 pb-2">
            <User className="w-6 h-6 text-green-600" />
            2. بيانات المقاول الرئيسي
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contractorName" className="text-base font-semibold">
                اسم المقاول
              </Label>
              <Input
                id="contractorName"
                type="text"
                required
                placeholder="أدخل اسم المقاول"
                value={formData.contractorName}
                onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="contractorId" className="text-base font-semibold flex items-center gap-2">
                <Upload className="w-4 h-4" />
                صورة الرقم القومي للمقاول
              </Label>
              <Input
                id="contractorId"
                type="file"
                required
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, contractorNationalId: e.target.files?.[0] || null })}
                className="mt-2 h-12"
              />
            </div>
          </div>

          {/* العمال المرافقين */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">العمال المرافقين (اختياري - حتى 9 عمال)</Label>
              <Button
                type="button"
                onClick={handleAddWorker}
                disabled={workers.length >= 9}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <User className="w-4 h-4" />
                إضافة عامل
              </Button>
            </div>

            {workers.map((worker, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-white rounded-lg border">
                <div className="md:col-span-1">
                  <Label className="text-sm">اسم العامل {index + 1}</Label>
                  <Input
                    type="text"
                    required
                    placeholder="أدخل الاسم"
                    value={worker.name}
                    onChange={(e) => handleWorkerChange(index, "name", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label className="text-sm">صورة الرقم القومي</Label>
                  <Input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => handleWorkerChange(index, "nationalIdImage", e.target.files?.[0] as File)}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={() => handleRemoveWorker(index)}
                    variant="destructive"
                    size="sm"
                    className="w-full"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* القسم 3: الشروط والالتزامات */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-red-600 pb-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            3. الشروط والالتزامات
          </h3>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">•</span>
                <span className="text-base">مراعاة اشتراطات الكمبوند</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">•</span>
                <span className="text-base">الالتزام التام بمعايير السلامة والصحة المهنية</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">•</span>
                <span className="text-base">المقاول مسؤول عن ترحيل المخلفات الناتجة عن أعماله إلى الأماكن المخصصة يومياً</span>
              </li>
            </ul>
          </div>
        </div>

        {/* القسم 4: مسؤول الموقع */}
        <div className="mb-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-blue-600 pb-2">
            <User className="w-6 h-6 text-blue-600" />
            4. مسؤول الموقع من طرفنا
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="engineerName" className="text-base font-semibold">
                اسم المهندس المسؤول
              </Label>
              <Input
                id="engineerName"
                type="text"
                required
                placeholder="أدخل اسم المهندس"
                value={formData.engineerName}
                onChange={(e) => setFormData({ ...formData, engineerName: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="engineerPhone" className="text-base font-semibold">
                رقم التواصل
              </Label>
              <Input
                id="engineerPhone"
                type="tel"
                required
                placeholder="01xxxxxxxxx"
                value={formData.engineerPhone}
                onChange={(e) => setFormData({ ...formData, engineerPhone: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* ملاحظات إضافية */}
        <div className="mb-8">
          <Label htmlFor="notes" className="text-base font-semibold">
            ملاحظات إضافية (اختياري)
          </Label>
          <Textarea
            id="notes"
            placeholder="أي ملاحظات أو تفاصيل إضافية..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="mt-2 min-h-[100px] text-lg"
          />
        </div>

        {/* زر الإرسال */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال طلب التصريح"}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          بعد الإرسال، سيتم مراجعة طلبك من قبل الإدارة وإخطارك بالقرار
        </p>
      </Card>
    </form>
  )
}
