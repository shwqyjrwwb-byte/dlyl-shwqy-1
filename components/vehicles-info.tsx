"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Car, Phone, User, Calendar } from "lucide-react"
import Image from "next/image"

const vehicles = [
  {
    id: 1,
    region: "العاصمة الإدارية",
    plateNumber: "ك ر و 8352",
    image: "/images/car-capital.jpeg",
    color: "رمادي",
    phone: "01100412308",
    schedule: [
      { day: "السبت", area: "القاهرة الجديدة" },
      { day: "الأحد", area: "العاصمة" },
      { day: "الاثنين", area: "التجمع الخامس" },
      { day: "الثلاثاء", area: "القاهرة الجديدة" },
      { day: "الأربعاء", area: "العاصمة" },
      { day: "الخميس", area: "التجمع الخامس" }
    ]
  },
  {
    id: 2,
    region: "القاهرة الجديدة",
    plateNumber: "ز ق ذ 7522",
    image: "/images/car-newcairo..jpeg",
    color: "خضراء",
    phone: "01114922438",
    schedule: [
      { day: "السبت", area: "القاهرة الجديدة" },
      { day: "الأحد", area: "العاصمة" },
      { day: "الاثنين", area: "التجمع الخامس" },
      { day: "الثلاثاء", area: "القاهرة الجديدة" },
      { day: "الأربعاء", area: "العاصمة" },
      { day: "الخميس", area: "التجمع الخامس" }
    ]
  },
  {
    id: 3,
    region: "التجمع الخامس",
    plateNumber: "ز ج ع 5130",
    image: "/images/car-tagamoa.jpeg",
    color: "بيضاء 2024",
    phone: "01114922576",
    schedule: [
      { day: "السبت", area: "القاهرة الجديدة" },
      { day: "الأحد", area: "العاصمة" },
      { day: "الاثنين", area: "التجمع الخامس" },
      { day: "الثلاثاء", area: "القاهرة الجديدة" },
      { day: "الأربعاء", area: "العاصمة" },
      { day: "الخميس", area: "التجمع الخامس" }
    ]
  },
  {
    id: 4,
    region: "وسط",
    plateNumber: "أ ك ر و 8259",
    image: "/images/car-downtow.jpeg",
    color: "بيضاء 2024",
    phone: "01114922576",
    schedule: [
      { day: "السبت", area: "السبت" },
      { day: "الأحد", area: "الأحد" },
      { day: "الاثنين", area: "الاثنين" },
      { day: "الثلاثاء", area: "الثلاثاء" },
      { day: "الأربعاء", area: "الأربعاء" },
      { day: "الخميس", area: "الخميس" }
    ]
  },
  {
    id: 5,
    region: "أكتوبر",
    plateNumber: "ز ع أ 2751",
    image: "/images/car-october.jpeg",
    color: "حمراء",
    phone: "01154422084",
    schedule: [
      { day: "السبت", area: "أقاليم" },
      { day: "الأحد", area: "أكتوبر" },
      { day: "الاثنين", area: "وسط" },
      { day: "الثلاثاء", area: "أقاليم" },
      { day: "الأربعاء", area: "أكتوبر" },
      { day: "الخميس", area: "وسط" }
    ]
  },
  {
    id: 6,
    region: "الأقاليم",
    plateNumber: "ز ق ذ 2516",
    image: "/images/car-regions.jpeg",
    color: "بيضاء",
    phone: "01272705524",
    schedule: [
      { day: "السبت", area: "أقاليم" },
      { day: "الأحد", area: "أكتوبر" },
      { day: "الاثنين", area: "وسط" },
      { day: "الثلاثاء", area: "أقاليم" },
      { day: "الأربعاء", area: "أكتوبر" },
      { day: "الخميس", area: "وسط" }
    ]
  }
]

const getDayColor = (area: string) => {
  const colors: Record<string, string> = {
    "القاهرة الجديدة": "bg-yellow-500",
    "العاصمة": "bg-orange-400",
    "التجمع الخامس": "bg-blue-400",
    "السبت": "bg-gray-300",
    "الأحد": "bg-gray-300",
    "الاثنين": "bg-green-400",
    "الثلاثاء": "bg-gray-300",
    "الأربعاء": "bg-blue-400",
    "الخميس": "bg-green-400",
    "أقاليم": "bg-blue-300",
    "أكتوبر": "bg-cyan-400",
    "وسط": "bg-green-400"
  }
  return colors[area] || "bg-gray-400"
}

export function VehiclesInfo() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* صورة حركة السواقين - بالكامل */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-300 bg-white">
          <img
            src="/images/حركه السواقين.png"
            alt="حركة السواقين"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* قسم المطورين */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-amber-700">فريق التطوير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev) => (
              <Card key={dev.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  {dev.image ? (
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                      <User className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{dev.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dev.position}</p>
                  <Badge className="bg-amber-600 hover:bg-amber-700">{dev.role}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

