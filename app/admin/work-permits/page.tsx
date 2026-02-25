"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, XCircle, Clock, FileText, User, MapPin, 
  Calendar, Phone, Eye, Download, Printer 
} from "lucide-react"
import Image from "next/image"

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
    // TODO: تنفيذ الموافقة
    console.log("Approving permit:", permitId)
    alert("تم الموافقة على التصريح")
  }

  const handleReject = async (permitId: string) => {
    const reason = prompt("سبب الرفض:")
    if (reason) {
      // TODO: تنفيذ الرفض
      console.log("Rejecting permit:", permitId, "Reason:", reason)
      alert("تم رفض التصريح")
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-3">إدارة تصاريح الأعمال</h1>
          <p className="text-lg text-gray-600">مراجعة والموافقة على طلبات التصاريح</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            الكل ({permits.length})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            قيد المراجعة ({permits.filter(p => p.status === "pending").length})
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            onClick={() => setFilter("approved")}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            موافق عليها ({permits.filter(p => p.status === "approved").length})
          </Button>
          <Button
            variant={filter === "rejected" ? "default" : "outline"}
            onClick={() => setFilter("rejected")}
            className="gap-2"
          >
            <XCircle className="w-4 h-4" />
            مرفوضة ({permits.filter(p => p.status === "rejected").length})
          </Button>
        </div>

        {/* Permits List */}
        {filteredPermits.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">لا توجد تصاريح</h3>
            <p className="text-gray-500">لم يتم تقديم أي طلبات تصريح بعد</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredPermits.map((permit) => (
              <Card key={permit.permitId} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{permit.siteName}</h3>
                      {getStatusBadge(permit.status)}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>المنطقة: {permit.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span>الكود: {permit.siteCode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>من {permit.startDate} إلى {permit.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>المقاول: {permit.contractorName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPermit(permit)}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      عرض
                    </Button>
                    {permit.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white gap-2"
                          onClick={() => handleApprove(permit.permitId)}
                        >
                          <CheckCircle className="w-4 h-4" />
                          موافقة
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(permit.permitId)}
                          className="gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {permit.workers.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      العمال المرافقين: {permit.workers.length}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {permit.workers.map((worker, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {worker.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Permit Details Modal */}
        {selectedPermit && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPermit(null)}
          >
            <Card 
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">تفاصيل التصريح</h2>
                  {getStatusBadge(selectedPermit.status)}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* بيانات الموقع */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">بيانات الموقع</h3>
                  <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">اسم الموقع</p>
                      <p className="font-bold">{selectedPermit.siteName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">كود الموقع</p>
                      <p className="font-bold">{selectedPermit.siteCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المنطقة</p>
                      <p className="font-bold">{selectedPermit.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مرحلة العمل</p>
                      <p className="font-bold">{selectedPermit.workPhase}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">تاريخ البداية</p>
                      <p className="font-bold">{selectedPermit.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">تاريخ النهاية</p>
                      <p className="font-bold">{selectedPermit.endDate}</p>
                    </div>
                  </div>
                </div>

                {/* بيانات المقاول */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">بيانات المقاول</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-lg mb-2">{selectedPermit.contractorName}</p>
                    {selectedPermit.contractorNationalId && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">صورة الرقم القومي:</p>
                        <div className="relative w-full h-48 bg-white rounded-lg overflow-hidden">
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
                    <h3 className="text-xl font-bold mb-3 text-primary">العمال المرافقين</h3>
                    <div className="space-y-3">
                      {selectedPermit.workers.map((worker, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-bold mb-2">{idx + 1}. {worker.name}</p>
                          <div className="relative w-full h-48 bg-white rounded-lg overflow-hidden">
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
                  <h3 className="text-xl font-bold mb-3 text-primary">المهندس المسؤول</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-lg">{selectedPermit.engineerName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="font-mono">{selectedPermit.engineerPhone}</span>
                    </div>
                  </div>
                </div>

                {/* ملاحظات */}
                {selectedPermit.notes && (
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-primary">ملاحظات</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{selectedPermit.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  {selectedPermit.status === "pending" && (
                    <>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                        onClick={() => {
                          handleApprove(selectedPermit.permitId)
                          setSelectedPermit(null)
                        }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        الموافقة على التصريح
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1 gap-2"
                        onClick={() => {
                          handleReject(selectedPermit.permitId)
                          setSelectedPermit(null)
                        }}
                      >
                        <XCircle className="w-5 h-5" />
                        رفض التصريح
                      </Button>
                    </>
                  )}
                  {selectedPermit.status === "approved" && (
                    <>
                      <Button className="flex-1 gap-2">
                        <Printer className="w-5 h-5" />
                        طباعة التصريح
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="w-5 h-5" />
                        تحميل PDF
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPermit(null)}
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
  )
}
