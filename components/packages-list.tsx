"use client"

import { useState, type MouseEvent } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Crown, Eye, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// الباقات مرتبة من الأقل للأعلى بتصميم احترافي فاخر
const packages = [
  {
    id: "economic",
    name: "ECONOMIC PACKAGE",
    nameAr: "الباقة الاقتصادية",
    color: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
    borderColor: "border-gray-400",
    textColor: "text-gray-800",
    bgColor: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    glowColor: "shadow-gray-400/50",
    order: 1,
    icon: "💼",
    image: "/images/package-economic-details.jpg",
    detailImage: "/images/package-economic-details.jpg",
    description: "باقة اقتصادية مناسبة للميزانيات المحدودة",
  },
  {
    id: "medium",
    name: "MEDIUM PACKAGE",
    nameAr: "الباقة المتوسطة",
    color: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
    borderColor: "border-blue-500",
    textColor: "text-blue-900",
    bgColor: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
    glowColor: "shadow-blue-500/50",
    order: 2,
    icon: "🏠",
    image: "/images/package-medium-details.jpg",
    detailImage: "/images/package-medium-details.jpg",
    description: "باقة متوازنة بجودة ممتازة وسعر مناسب",
  },
  {
    id: "vip",
    name: "VIP PACKAGE",
    nameAr: "باقة في آي بي",
    color: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
    borderColor: "border-amber-500",
    textColor: "text-amber-900",
    bgColor: "bg-gradient-to-br from-amber-50 via-white to-amber-100",
    glowColor: "shadow-amber-500/60",
    order: 3,
    icon: "⭐",
    image: "/images/package-vip-details.jpg",
    detailImage: "/images/package-vip-details.jpg",
    description: "باقة راقية بخامات عالية الجودة",
  },
  {
    id: "ultra-vip",
    name: "ULTRA VIP PACKAGE",
    nameAr: "باقة ألترا في آي بي",
    color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500",
    borderColor: "border-orange-500",
    textColor: "text-orange-900",
    bgColor: "bg-gradient-to-br from-orange-50 via-white to-red-50",
    glowColor: "shadow-orange-500/60",
    order: 4,
    icon: "💎",
    image: "/images/package-ultra-vip-details.jpg",
    detailImage: "/images/package-ultra-vip-details.jpg",
    description: "أعلى مستويات الفخامة والرقي",
  },
  {
    id: "super-ultra-vip",
    name: "SUPER ULTRA VIP",
    nameAr: "باقة سوبر ألترا في آي بي",
    color: "bg-gradient-to-br from-red-500 via-rose-600 to-red-700",
    borderColor: "border-red-600",
    textColor: "text-red-900",
    bgColor: "bg-gradient-to-br from-red-50 via-white to-rose-100",
    glowColor: "shadow-red-600/70",
    premium: true,
    order: 5,
    icon: "👑",
    image: "/images/package-super-ultra-vip-details.jpg",
    detailImage: "/images/package-super-ultra-vip-details.jpg",
    description: "الباقة الملكية - لا حدود للإبداع والفخامة",
  },
  {
    id: "elite",
    name: "ELITE PACKAGE",
    nameAr: "باقة إيليت",
    color: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700",
    borderColor: "border-purple-600",
    textColor: "text-purple-900",
    bgColor: "bg-gradient-to-br from-purple-50 via-white to-indigo-100",
    glowColor: "shadow-purple-600/70",
    featured: true,
    order: 6,
    icon: "🌟",
    image: "/images/package-elite-details.jpg",
    detailImage: "/images/package-elite-details.jpg",
    description: "باقة راقية للعملاء المميزين",
  },
  {
    id: "luxury",
    name: "LUXURY PACKAGE",
    nameAr: "باقة لاكشري",
    color: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-900",
    bgColor: "bg-gradient-to-br from-yellow-50 via-white to-amber-100",
    glowColor: "shadow-yellow-500/70",
    featured: true,
    order: 7,
    icon: "✨",
    image: "/images/package-luxury-details.jpg",
    detailImage: "/images/package-luxury-details.jpg",
    description: "باقة فاخرة لمحبي الرقي والتميز",
  },
]

export function PackagesList() {
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[0] | null>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleDialogClose = () => {
    setSelectedPackage(null)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1))
    if (zoom <= 1.25) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* عنوان القسم */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">باقات التشطيب</h2>
          <p className="text-muted-foreground">اختر الباقة المناسبة لك - مرتبة من الاقتصادية إلى الفاخرة</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:${pkg.glowColor} border-4 ${pkg.borderColor} bg-white rounded-2xl transform hover:-translate-y-2`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {/* تأثير الإضاءة */}
              <div className={`absolute inset-0 ${pkg.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* رقم الترتيب مع أيقونة */}
              <div className={`absolute top-4 left-4 z-10 w-14 h-14 rounded-2xl ${pkg.color} flex flex-col items-center justify-center text-white font-black text-xl shadow-2xl border-3 border-white backdrop-blur-sm`}>
                <span className="text-2xl">{pkg.icon}</span>
                <span className="text-xs font-bold mt-0.5">{pkg.order}</span>
              </div>
              
              {pkg.premium && (
                <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-600 to-rose-700 text-white border-2 border-white shadow-2xl px-4 py-2 text-sm font-bold animate-pulse">
                  <Crown className="h-5 w-5 ml-1" />
                  الباقة الملكية
                </Badge>
              )}
              {pkg.featured && !pkg.premium && (
                <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-2 border-white shadow-2xl px-4 py-2 text-sm font-bold">
                  <Star className="h-5 w-5 ml-1" />
                  الأكثر طلباً
                </Badge>
              )}

              {/* صورة الباقة */}
              <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.nameAr}
                  className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                  style={{ maxHeight: "500px" }}
                />
                
                {/* طبقة hover فاخرة */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center`}>
                  <Button
                    variant="secondary"
                    className={`bg-white text-foreground hover:bg-white/95 shadow-2xl px-8 py-4 text-lg font-bold rounded-xl transform scale-90 group-hover:scale-100 transition-transform duration-300 ${pkg.borderColor} border-2`}
                  >
                    <Eye className="h-6 w-6 ml-2" />
                    عرض التفاصيل
                  </Button>
                </div>
              </div>
              
              {/* اسم الباقة بتصميم فاخر */}
              <div className={`p-6 text-center ${pkg.bgColor} border-t-4 ${pkg.borderColor} relative overflow-hidden`}>
                <div className={`absolute inset-0 ${pkg.color} opacity-5`}></div>
                <h3 className={`font-black text-xl ${pkg.textColor} relative z-10 tracking-wide`}>{pkg.nameAr}</h3>
                <p className={`text-sm ${pkg.textColor} opacity-70 mt-2 relative z-10 font-semibold`}>{pkg.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPackage} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-6xl w-full max-h-[95vh] overflow-hidden bg-zinc-900 border-zinc-700 p-0">
          <DialogHeader className="sticky top-0 z-20 bg-zinc-900/98 backdrop-blur-md border-b border-zinc-700 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <DialogTitle className={`text-xl font-bold ${selectedPackage?.textColor}`}>
                {selectedPackage?.nameAr} - {selectedPackage?.name}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-700 text-white"
                    onClick={handleZoomOut}
                    disabled={zoom <= 1}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-semibold text-white min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-700 text-white"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-700 text-white"
                    onClick={handleResetZoom}
                    disabled={zoom === 1}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>

          {selectedPackage && (
            <div 
              className="relative h-[calc(95vh-88px)] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-auto flex items-start justify-center p-6"
              style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="relative w-full max-w-4xl mx-auto"
                style={{ 
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: "top center",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
              >
                {/* إطار الصورة */}
                <div className={`rounded-2xl overflow-hidden border-4 ${selectedPackage.borderColor} shadow-2xl bg-zinc-950`}>
                  <img
                    src={selectedPackage.detailImage || selectedPackage.image || "/placeholder.svg"}
                    alt={`${selectedPackage.nameAr} - تفاصيل الباقة`}
                    className="w-full h-auto object-contain select-none"
                    style={{ 
                      maxHeight: "calc(95vh - 150px)",
                      backgroundColor: "#0a0a0a"
                    }}
                    draggable={false}
                  />
                </div>
                
                {/* شريط معلومات الباقة */}
                <div className={`mt-4 p-4 rounded-xl ${selectedPackage.bgColor} border-2 ${selectedPackage.borderColor} text-center`}>
                  <h3 className={`text-lg font-bold ${selectedPackage.textColor}`}>{selectedPackage.nameAr}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedPackage.description}</p>
                </div>
              </div>

              {zoom > 1 && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl text-white text-sm px-6 py-3 rounded-full border-2 border-white/40 shadow-2xl z-10">
                  اسحب الصورة للتنقل
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
