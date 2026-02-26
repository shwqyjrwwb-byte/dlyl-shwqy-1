"use client"

import Image from "next/image"
import { Sparkles, Award, TrendingUp } from "lucide-react"

export function PartnersMarquee() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-blue-500/30 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6 shadow-2xl">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
            <span className="text-base sm:text-lg font-black text-white tracking-wide">شركاء التميز والنجاح</span>
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 sm:mb-6 leading-tight px-4">
            نفخر بشراكتنا مع الأفضل
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold px-4">
            نتعاون مع أرقى العلامات التجارية العالمية والمحلية لتقديم أعلى معايير الجودة والتميز
          </p>
        </div>

        {/* الصورة الاحترافية */}
        <div className="relative max-w-7xl mx-auto">
          {/* إطار خارجي مضيء */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
          
          {/* الإطار الرئيسي */}
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-3 sm:p-4 md:p-6 border-4 border-blue-500/30 shadow-2xl">
            {/* زوايا مضيئة */}
            <div className="absolute top-0 left-0 w-20 sm:w-32 h-20 sm:h-32 border-t-4 border-l-4 border-blue-400 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 border-t-4 border-r-4 border-purple-400 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 sm:w-32 h-20 sm:h-32 border-b-4 border-l-4 border-purple-400 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 sm:w-32 h-20 sm:h-32 border-b-4 border-r-4 border-blue-400 rounded-br-3xl"></div>
            
            {/* الصورة */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <Image
                src="/images/شركاء النجاح .png"
                alt="شركاء النجاح - أفضل العلامات التجارية"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                priority
                quality={100}
              />
              
              {/* تأثير لامع */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* شارات جانبية */}
          <div className="absolute -right-4 sm:-right-8 top-1/4 hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-4 sm:p-6 shadow-2xl border-4 border-blue-400/50 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mb-2 mx-auto" />
              <p className="text-xs sm:text-sm font-black text-center whitespace-nowrap">شراكات عالمية</p>
            </div>
          </div>

          <div className="absolute -left-4 sm:-left-8 bottom-1/4 hidden lg:block">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-4 sm:p-6 shadow-2xl border-4 border-purple-400/50 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 mb-2 mx-auto" />
              <p className="text-xs sm:text-sm font-black text-center whitespace-nowrap">جودة مضمونة</p>
            </div>
          </div>
        </div>

        {/* إحصائيات */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:scale-105 transition-transform duration-300">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 mb-2">+50</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-bold">علامة تجارية</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:scale-105 transition-transform duration-300">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-purple-400 mb-2">100%</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-bold">جودة مضمونة</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-600/20 to-pink-700/20 backdrop-blur-xl border-2 border-pink-500/30 rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:scale-105 transition-transform duration-300 col-span-2 sm:col-span-1">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-pink-400 mb-2">+15</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-bold">سنة خبرة</p>
          </div>
        </div>
      </div>

      {/* تأثيرات إضافية */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-10 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
    </section>
  )
}

