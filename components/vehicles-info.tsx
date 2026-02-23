"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Car, Phone, User } from "lucide-react"
import Image from "next/image"

const vehicles = [
  {
    id: 1,
    region: "العاصمة الإدارية",
    plateNumber: "ز س د 7217",
    image: "/images/car-capital.jpg",
    color: "أزرق غامق",
    phone: "01XXXXXXXXX"
  },
  {
    id: 2,
    region: "القاهرة الجديدة",
    plateNumber: "ز ق ذ 7522",
    image: "/images/car-newcairo.jpg",
    color: "أبيض",
    phone: "01XXXXXXXXX"
  },
  {
    id: 3,
    region: "التجمع الخامس",
    plateNumber: "ز ج ع 5130",
    image: "/images/car-tagamoa.jpg",
    color: "تركواز",
    phone: "01XXXXXXXXX"
  },
  {
    id: 4,
    region: "وسط",
    plateNumber: "أ ك ر و 8259",
    image: "/images/car-downtown.jpg",
    color: "رصاصي",
    phone: "01XXXXXXXXX"
  },
  {
    id: 5,
    region: "أكتوبر",
    plateNumber: "ز ق ذ 2516",
    image: "/images/car-october.jpg",
    color: "أبيض",
    phone: "01XXXXXXXXX"
  },
  {
    id: 6,
    region: "الأقاليم",
    plateNumber: "ز ع أ 2751",
    image: "/images/car-regions.jpg",
    color: "أحمر",
    phone: "01XXXXXXXXX"
  }
]

export function VehiclesInfo() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Manager Card */}
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 p-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gold/30">
              <Image
                src="/images/azzam.jpg"
                alt="عزام"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">مدير قسم السيارات</p>
              <p className="text-2xl font-bold text-gold mb-2">عزام</p>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">01XXXXXXXXX</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-gold/50 transition-all duration-300 group">
              {/* Car Image */}
              <div className="relative h-48 overflow-hidden bg-zinc-800">
                <Image
                  src={vehicle.image}
                  alt={`سيارة ${vehicle.region}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Plate Number Badge */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center border-2 border-zinc-800">
                    <p className="text-xs text-zinc-600 font-medium mb-1">رقم اللوحة</p>
                    <p className="text-lg font-bold text-zinc-900 tracking-wider" dir="ltr">
                      {vehicle.plateNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Car Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-bold text-zinc-100">{vehicle.region}</h3>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    <Car className="w-3 h-3 ml-1" />
                    {vehicle.color}
                  </Badge>
                  
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{vehicle.phone}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Note */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6">
          <p className="text-center text-zinc-400 text-sm">
            للتواصل مع السائقين أو الاستفسار عن خط السير، يرجى التواصل مع مدير القسم
          </p>
        </Card>
      </div>
    </section>
  )
}
