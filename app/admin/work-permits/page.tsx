"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, XCircle, Clock, FileText, User, MapPin, 
  Calendar, Phone, Eye, Download, Printer, ArrowRight, LogOut 
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WorkPermitAdminAuthCheck } from "@/components/work-permit-admin-auth-check"
import { useRouter } from "next/navigation"

interface Worker {
  name: string
  nationalIdPath: string
}

interface WorkPermit {
  permitId: string
  startDate: string
  endDate: string
  siteName: string
  siteCode: string
  region: string
  contractorName: string
  contractorNationalId?: string
  engineerName: string
  engineerPhone: string
  workPhase: string
  notes: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  workers: Worker[]
  approvedBy?: string
  approvedAt?: string
  rejectionReason?: string
}

export default function WorkPermitsAdminPage() {
  const router = useRouter()
  const [permits, setPermits] = useState<WorkPermit[]>([])
  const [selectedPermit, setSelectedPermit] = useState<WorkPermit | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")

  useEffect(() => {
    fetchPermits()
  }, [])

  const fetchPermits = async () => {
    try {
      const response = await fetch("/api/work-permit")
      const data = await response.json()
      if (data.success) {
        setPermits(data.permits || [])
      }
    } catch (error) {
      console.error("Error fetching permits:", error)
    }
  }

  const handleApprove = async (permitId: string) => {
    try {
      const response = await fetch("/api/work-permit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permitId,
          status: "approved",
          approvedBy: "admin",
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert("تم الموافقة على التصريح بنجاح")
        fetchPermits() // إعادة تحميل التصاريح
      } else {
        alert("حدث خطأ أثناء الموافقة")
      }
    } catch (error) {
      console.error("Error approving permit:", error)
      alert("حدث خطأ أثناء الموافقة")
    }
  }

  const handleReject = async (permitId: string) => {
    const reason = prompt("سبب الرفض:")
    if (reason) {
      try {
        const response = await fetch("/api/work-permit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            permitId,
            status: "rejected",
            rejectionReason: reason,
          }),
        })

        const data = await response.json()
        if (data.success) {
          alert("تم رفض التصريح")
          fetchPermits() // إعادة تحميل التصاريح
        } else {
          alert("حدث خطأ أثناء الرفض")
        }
      } catch (error) {
        console.error("Error rejecting permit:", error)
        alert("حدث خطأ أثناء الرفض")
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("workPermitAdminLoggedIn")
    localStorage.removeItem("workPermitAdminLoginTime")
    router.push("/admin/work-permits/login")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-white gap-2"><Clock className="w-4 h-4" />قيد المراجعة</Badge>
      case "approved":
        return <Badge className="bg-green-500 text-white gap-2"><CheckCircle className="w-4 h-4" />موافق عليه</Badge>
      case "rejected":
        return <Badge className="bg-red-500 text-white gap-2"><XCircle className="w-4 h-4" />مرفوض</Badge>
      default:
        return null
    }
  }

  const filteredPermits = permits.filter(p => filter === "all" || p.status === filter)

  return (
    <WorkPermitAdminAuthCheck>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and logout */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <Link href="/">
              <Button variant="outline" className="gap-2 bg-white hover:bg-gray-100 shadow-lg border-2 h-12 px-6">
                <ArrowRight className="w-5 h-5" />
                رجوع للصفحة الرئيسية
              </Button>
            </Link>

            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="gap-2 h-12 px-6 shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <FileText className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black mb-1">إدارة تصاريح الأعمال</h1>
                <p className="text-lg text-blue-100">مراجعة والموافقة على طلبات التصاريح</p>
              </div>
            </div>
            
            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-3xl font-black mb-1">{permits.length}</p>
                <p className="text-sm text-blue-100">إجمالي التصاريح</p>
              </div>
              <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-yellow-400/30">
                <p className="text-3xl font-black mb-1">{permits.filter(p => p.status === "pending").length}</p>
                <p className="text-sm text-blue-100">قيد المراجعة</p>
              </div>
              <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-green-400/30">
                <p className="text-3xl font-black mb-1">{permits.filter(p => p.status === "approved").length}</p>
                <p className="text-sm text-blue-100">موافق عليها</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-black text-gray-900 mb-4">تصفية التصاريح</h3>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="gap-2 h-12 px-6 font-bold"
            >
              <FileText className="w-5 h-5" />
              الكل ({permits.length})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
              className="gap-2 h-12 px-6 font-bold bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
              style={filter === "pending" ? {} : { background: "transparent", color: "inherit" }}
            >
              <Clock className="w-5 h-5" />
              قيد المراجعة ({permits.filter(p => p.status === "pending").length})
            </Button>
            <Button
              variant={filter === "approved" ? "default" : "outline"}
              onClick={() => setFilter("approved")}
              className="gap-2 h-12 px-6 font-bold bg-green-600 hover:bg-green-700 text-white border-green-600"
              style={filter === "approved" ? {} : { background: "transparent", color: "inherit" }}
            >
              <CheckCircle className="w-5 h-5" />
              موافق عليها ({permits.filter(p => p.status === "approved").length})
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              onClick={() => setFilter("rejected")}
              className="gap-2 h-12 px-6 font-bold bg-red-600 hover:bg-red-700 text-white border-red-600"
              style={filter === "rejected" ? {} : { background: "transparent", color: "inherit" }}
            >
              <XCircle className="w-5 h-5" />
              مرفوضة ({permits.filter(p => p.status === "rejected").length})
            </Button>
          </div>
        </div>

        {/* Permits List */}
        {filteredPermits.length === 0 ? (
          <Card className="p-16 text-center bg-white shadow-xl">
            <div className="bg-gray-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-3xl font-black text-gray-400 mb-3">لا توجد تصاريح</h3>
            <p className="text-lg text-gray-500">لم يتم تقديم أي طلبات تصريح بعد</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredPermits.map((permit) => (
              <Card key={permit.permitId} className="p-6 hover:shadow-2xl transition-all bg-white border-2 hover:border-blue-300">
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-2xl font-black text-gray-900">{permit.siteName}</h3>
                      {getStatusBadge(permit.status)}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-bold text-gray-700">المنطقة: <span className="text-gray-900">{permit.region}</span></span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-bold text-gray-700">الكود: <span className="text-gray-900">{permit.siteCode}</span></span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-bold text-gray-700">من {permit.startDate} إلى {permit.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-bold text-gray-700">المقاول: <span className="text-gray-900">{permit.contractorName}</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPermit(permit)}
                      className="gap-2 h-10 px-4 font-bold border-2"
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </Button>
                    {permit.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white gap-2 h-10 px-4 font-bold shadow-lg"
                          onClick={() => handleApprove(permit.permitId)}
                        >
                          <CheckCircle className="w-4 h-4" />
                          موافقة
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(permit.permitId)}
                          className="gap-2 h-10 px-4 font-bold shadow-lg"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {permit.workers.length > 0 && (
                  <div className="mt-4 pt-4 border-t-2 border-gray-100">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      العمال المرافقين: {permit.workers.length}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {permit.workers.map((worker, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm font-bold py-1 px-3 border-2">
                          {worker.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {permit.status === "approved" && permit.approvedAt && (
                  <div className="mt-4 pt-4 border-t-2 border-green-100 bg-green-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                    <p className="text-sm font-bold text-green-800">
                      ✓ تمت الموافقة بواسطة: {permit.approvedBy} في {new Date(permit.approvedAt).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                )}
                
                {permit.status === "rejected" && permit.rejectionReason && (
                  <div className="mt-4 pt-4 border-t-2 border-red-100 bg-red-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                    <p className="text-sm font-bold text-red-800 mb-1">✗ تم الرفض</p>
                    <p className="text-sm text-red-700">السبب: {permit.rejectionReason}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Permit Details Modal */}
        {selectedPermit && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPermit(null)}
          >
            <Card 
              className="max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-8 sticky top-0 z-10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black mb-1">تفاصيل التصريح</h2>
                      <p className="text-blue-100">رقم التصريح: {selectedPermit.permitId}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedPermit.status)}
                </div>
              </div>

              <div className="p-8 space-y-8 bg-gray-50">
                {/* بيانات الموقع */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">بيانات الموقع</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-bold mb-1">اسم الموقع</p>
                      <p className="font-black text-lg text-gray-900">{selectedPermit.siteName}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-bold mb-1">كود الموقع</p>
                      <p className="font-black text-lg text-gray-900">{selectedPermit.siteCode}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-bold mb-1">المنطقة</p>
                      <p className="font-black text-lg text-gray-900">{selectedPermit.region}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-bold mb-1">مرحلة العمل</p>
                      <p className="font-black text-lg text-gray-900">{selectedPermit.workPhase}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                      <p className="text-sm text-green-700 font-bold mb-1">تاريخ البداية</p>
                      <p className="font-black text-lg text-gray-900">{selectedPermit.startDate}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                      <p className="text-sm text-red-700 font-bold mb-1">تاريخ النهاية</p>
                      <p className="font-black text-lg text-gray-900">{selectedPermit.endDate}</p>
                    </div>
                  </div>
                </div>

                {/* بيانات المقاول */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">بيانات المقاول الرئيسي</h3>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <p className="font-black text-2xl text-gray-900">{selectedPermit.contractorName}</p>
                    </div>
                    {selectedPermit.contractorNationalId && (
                      <div>
                        <p className="text-sm text-gray-700 font-bold mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-green-600" />
                          صورة الرقم القومي:
                        </p>
                        <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-4 border-gray-200 shadow-lg">
                          <Image
                            src={selectedPermit.contractorNationalId}
                            alt="الرقم القومي للمقاول"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* العمال */}
                {selectedPermit.workers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-purple-600 p-2 rounded-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900">العمال المرافقين ({selectedPermit.workers.length})</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedPermit.workers.map((worker, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-100 text-purple-700 font-black text-xl w-10 h-10 rounded-full flex items-center justify-center">
                              {idx + 1}
                            </div>
                            <p className="font-black text-xl text-gray-900">{worker.name}</p>
                          </div>
                          <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-4 border-gray-200 shadow-lg">
                            <Image
                              src={worker.nationalIdPath}
                              alt={`الرقم القومي - ${worker.name}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* المهندس المسؤول */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-600 p-2 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">المهندس المسؤول</h3>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-black text-2xl text-gray-900 mb-3">{selectedPermit.engineerName}</p>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-orange-600" />
                        <span className="font-mono text-lg font-bold text-gray-700">{selectedPermit.engineerPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ملاحظات */}
                {selectedPermit.notes && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gray-600 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900">ملاحظات إضافية</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                      <p className="text-lg text-gray-700 leading-relaxed">{selectedPermit.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t-4 border-gray-200 sticky bottom-0 bg-gray-50 pb-2">
                  {selectedPermit.status === "pending" && (
                    <>
                      <Button
                        className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white gap-2 text-lg font-black shadow-xl"
                        onClick={() => {
                          handleApprove(selectedPermit.permitId)
                          setSelectedPermit(null)
                        }}
                      >
                        <CheckCircle className="w-6 h-6" />
                        الموافقة على التصريح
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1 h-14 gap-2 text-lg font-black shadow-xl"
                        onClick={() => {
                          handleReject(selectedPermit.permitId)
                          setSelectedPermit(null)
                        }}
                      >
                        <XCircle className="w-6 h-6" />
                        رفض التصريح
                      </Button>
                    </>
                  )}
                  {selectedPermit.status === "approved" && (
                    <>
                      <Button className="flex-1 h-14 gap-2 text-lg font-black shadow-xl">
                        <Printer className="w-6 h-6" />
                        طباعة التصريح
                      </Button>
                      <Button variant="outline" className="flex-1 h-14 gap-2 text-lg font-black border-2 shadow-xl">
                        <Download className="w-6 h-6" />
                        تحميل PDF
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPermit(null)}
                    className="h-14 px-8 text-lg font-black border-2"
                  >
                    إغلاق
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
    </WorkPermitAdminAuthCheck>
  )
}
