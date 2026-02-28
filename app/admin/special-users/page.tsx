"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Key, Copy, Check, RefreshCw, ArrowLeft, X } from "lucide-react"
import Image from "next/image"
import { getAllDepartmentEmployees } from "@/lib/employees-data"

interface EmployeeUser {
  id: string
  name: string
  position: string
  department: string
  image?: string
  userId: string
  password: string
  createdAt: string
}

export default function UsersManagementPage() {
  const router = useRouter()
  const [users, setUsers] = useState<EmployeeUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [employeesData, setEmployeesData] = useState<any[]>([])

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const loggedIn = localStorage.getItem("dashboardLoggedIn")
    const userRole = localStorage.getItem("dashboardRole")

    if (loggedIn !== "true" || userRole !== "developer") {
      router.push("/admin/dashboard/login?role=developer")
      return
    }

    // تحميل الموظفين من الأقسام
    const employees = getAllDepartmentEmployees()
    setEmployeesData(employees)

    // تحميل اليوزرات المحفوظة
    loadUsers()
  }, [router])

  const loadUsers = () => {
    const savedUsers = localStorage.getItem("employeeUsers")
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }

  const generatePassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const generateUserId = (name: string, index: number) => {
    // توليد يوزر عشوائي بالكامل
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    
    // 4 حروف عشوائية
    let randomChars = ''
    for (let i = 0; i < 4; i++) {
      randomChars += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    // 4 أرقام عشوائية
    let randomNumbers = ''
    for (let i = 0; i < 4; i++) {
      randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    
    return `${randomChars}${randomNumbers}`
  }

  const generateAllUsers = () => {
    setIsGenerating(true)
    
    const newUsers: EmployeeUser[] = employeesData.map((emp, index) => ({
      id: Date.now().toString() + index,
      name: emp.name,
      position: emp.position,
      department: emp.department,
      image: emp.image,
      userId: generateUserId(emp.name, index),
      password: generatePassword(),
      createdAt: new Date().toISOString(),
    }))

    setUsers(newUsers)
    localStorage.setItem("employeeUsers", JSON.stringify(newUsers))
    
    setTimeout(() => {
      setIsGenerating(false)
    }, 1000)
  }

  const regeneratePassword = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.userId === userId 
        ? { ...user, password: generatePassword() }
        : user
    )
    setUsers(updatedUsers)
    localStorage.setItem("employeeUsers", JSON.stringify(updatedUsers))
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/admin/dashboard')}
              variant="outline"
              className="gap-2 h-12 px-6 bg-gray-900 border-2 border-amber-500 text-amber-500 hover:bg-amber-600 hover:text-black font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              رجوع
            </Button>
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-3 rounded-xl">
              <Users className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-amber-500">إدارة يوزرات الموظفين</h1>
              <p className="text-amber-300">إنشاء وإدارة حسابات الموظفين</p>
            </div>
          </div>

          {users.length === 0 && (
            <Button
              onClick={generateAllUsers}
              disabled={isGenerating}
              className="gap-3 h-14 px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-black text-lg"
            >
              <Key className="w-6 h-6" />
              {isGenerating ? "جاري الإنشاء..." : "إنشاء يوزرات لجميع الموظفين"}
            </Button>
          )}

          {users.length > 0 && (
            <Button
              onClick={() => {
                if (confirm('هل أنت متأكد من حذف جميع اليوزرات؟')) {
                  setUsers([])
                  localStorage.removeItem("employeeUsers")
                }
              }}
              className="gap-3 h-14 px-8 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-lg"
            >
              <X className="w-6 h-6" />
              مسح جميع اليوزرات
            </Button>
          )}
        </div>

        {users.length > 0 && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 font-bold mb-1">إجمالي اليوزرات</p>
                    <p className="text-5xl font-black text-amber-500">{users.length}</p>
                  </div>
                  <div className="bg-amber-500/20 p-4 rounded-xl">
                    <Users className="w-10 h-10 text-amber-500" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 font-bold mb-1">تم الإنشاء</p>
                    <p className="text-5xl font-black text-green-500">{users.length}</p>
                  </div>
                  <div className="bg-green-500/20 p-4 rounded-xl">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 font-bold mb-1">آخر تحديث</p>
                    <p className="text-lg font-black text-blue-500">اليوم</p>
                  </div>
                  <div className="bg-blue-500/20 p-4 rounded-xl">
                    <RefreshCw className="w-10 h-10 text-blue-500" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <Input
                  type="text"
                  placeholder="ابحث عن موظف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 h-14 text-lg bg-gray-900 border-2 border-amber-600/30 focus:border-amber-500 text-amber-100 placeholder:text-amber-700"
                />
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-amber-600/30 hover:border-amber-500 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-amber-600 text-black text-2xl font-bold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-amber-100 text-lg truncate">{user.name}</h3>
                      <p className="text-sm text-amber-600 truncate">{user.position}</p>
                      <p className="text-xs text-amber-700 truncate">{user.department}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* User ID */}
                    <div className="bg-black rounded-lg p-3 border border-amber-600/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-amber-600 font-bold">ID المستخدم</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(user.userId, `id-${user.id}`)}
                          className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                        >
                          {copiedId === `id-${user.id}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-amber-100 font-mono text-lg font-bold">{user.userId}</p>
                    </div>

                    {/* Password */}
                    <div className="bg-black rounded-lg p-3 border border-amber-600/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-amber-600 font-bold">الرقم السري</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => regeneratePassword(user.userId)}
                            className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(user.password, `pass-${user.id}`)}
                            className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                          >
                            {copiedId === `pass-${user.id}` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-amber-100 font-mono text-2xl font-black tracking-wider">{user.password}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <p className="text-amber-400 text-lg font-bold">لا توجد نتائج للبحث</p>
              </div>
            )}
          </>
        )}

        {users.length === 0 && !isGenerating && (
          <Card className="p-12 bg-gradient-to-br from-gray-900 to-black border-2 border-amber-600/30 text-center">
            <div className="bg-amber-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-amber-500 mb-3">لم يتم إنشاء يوزرات بعد</h2>
            <p className="text-amber-300 mb-6">اضغط على الزر أعلاه لإنشاء يوزرات لجميع الموظفين تلقائياً</p>
          </Card>
        )}
      </div>
    </div>
  )
}
