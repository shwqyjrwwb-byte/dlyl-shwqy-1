"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Section {
  id: string
  title: string
  description: string
  image: string
  href: string
}

interface SectionCardProps {
  section: Section
}

export function SectionCard({ section }: SectionCardProps) {
  return (
    <Link href={section.href}>
      <Card className="group relative overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 h-48 sm:h-56 md:h-64 cursor-pointer hover:scale-[1.02] sm:hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={section.image || "/placeholder.svg"} 
            alt={section.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            priority={section.id === "contacts" || section.id === "packages"}
          />
        </div>

        {/* Content - Empty for hover effect only */}
        <div className="relative h-full" />
      </Card>
    </Link>
  )
}
