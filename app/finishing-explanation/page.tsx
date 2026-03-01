"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Droplets, ExternalLink, Grid3X3, DoorOpen, Paintbrush, Square, Building2, Mountain } from "lucide-react"

const finishingVideos = [
  {
    id: "plumbing-electrical",
    name: "بنود السباكة",
    icon: Droplets,
    videos: [
      {
        title: "إزاي تضمن إن شغل الكهرباء في مشروعك يكون دقيق ومستمر بدون مفاجآت؟ ⚡",
        url: "https://www.youtube.com/watch?v=H7jwhnslpBY"
      },
      {
        title: "إيه اللي يخلي SmartLight اختيارنا الأول في أعمال الكهرباء؟ 🤔⚡",
        url: "https://www.youtube.com/watch?v=0IAFbV3yTdg"
      },
      {
        title: "هل فكرت في يوم عن المخاطر اللي ممكن تسببها لو ركبت كهرباء التكييف والسخان غلط؟ ⚡",
        url: "https://www.youtube.com/watch?v=NzPMqee0JQ0"
      },
      {
        title: "هل فكرت قبل كده ليه بطلنا نستخدم مواسير الزهر في السباكة ؟ 👍",
        url: "https://www.youtube.com/watch?v=baoqNj1Jy-0"
      },
      {
        title: "لو عايز تعرف إزاي تبدأ تأسيس كهرباء الساوند سيستم وكهرباء المطبخ من البداية بطريقة صحيحة؟",
        url: "https://www.youtube.com/watch?v=FfasPKAKkkQ"
      },
      {
        title: "ازاي تخلي سلم الفيلا ينور اول ما تدوس عليه وازاي بيتم التأسيس ليه؟ 👌",
        url: "https://www.youtube.com/watch?v=BrQwChi8XoU"
      },
      {
        title: "لو مش عايز تلاقي نفسك بتكسر في الحيطة عشان توصّل التليفزيون بعد التشطيب؟ أعرف الأساس الصح من الأول⚡",
        url: "https://www.youtube.com/watch?v=lhb8RVwU2KI"
      },
      {
        title: "عارف إن أي غلطة في تركيب بؤوج الكهرباء ممكن تسبب مشاكل كتير في التشطيب ؟! 🤔",
        url: "https://www.youtube.com/watch?v=TH8vCtFN-_0"
      },
      {
        title: "لو عايز تفهم تأسيسات الكهرباء صح وتعرف الفرق بين لوحة الكهرباء وأجهزة السمارت ⚡",
        url: "https://www.youtube.com/watch?v=ei9kxOzfYgU"
      },
      {
        title: "شرح مجموعة التليفزيون ✨",
        url: "https://www.youtube.com/watch?v=zhRx5yzHn2c"
      },
      {
        title: "استخدامات القواطع ✨",
        url: "https://www.youtube.com/watch?v=7mtudRd7w_A"
      },
      {
        title: "طريقة تأسيس مجموعة البوتجاز ✨",
        url: "https://www.youtube.com/watch?v=wAMXTWYnFZ8"
      },
      {
        title: "تأسيس نظام الـ Smart✨",
        url: "https://www.youtube.com/watch?v=oqKFbjc9heU"
      },
      {
        title: "تأسيس الـ LED Profile في السقف ✨",
        url: "https://www.youtube.com/watch?v=k2rBEykuXUM"
      },
      {
        title: "تأسيسات الكهرباء في الموقع✨",
        url: "https://www.youtube.com/watch?v=verTPi5UdXY"
      },
      {
        title: "تأسيس كهرباء نقط المطبخ ✨",
        url: "https://www.youtube.com/watch?v=mfoTUPF5rqk"
      },
      {
        title: "تأسيس الكهرباء مجموعة البوتجاز✨",
        url: "https://www.youtube.com/watch?v=2_POdZXTxyM"
      },
      {
        title: "تأسيس الكهرباء لــ Magnetec Track✨",
        url: "https://www.youtube.com/watch?v=Zrywiw3C9RA"
      },
      {
        title: "تأسيس الكهرباء للوزر المضئ الجزء الثالث✨",
        url: "https://www.youtube.com/watch?v=Kocghe2_arU"
      },
      {
        title: "تأسيس الكهرباء للوزر المضئ الجزء الثاني✨",
        url: "https://www.youtube.com/watch?v=-biFY2OKDT4"
      },
      {
        title: "تأسيس الكهرباء للوزر المضئ ✨",
        url: "https://www.youtube.com/watch?v=5Fn_Xy1wVvU"
      },
      {
        title: "تعديل لتأسيس الكهرباء في المطبخ✨",
        url: "https://www.youtube.com/watch?v=8bgYOCD-Lb4"
      },
      {
        title: "نصيحة مهمة لو هتعمل خوارنق جوة الكابينة الشاور ✨",
        url: "https://www.youtube.com/watch?v=tYETZaWjsSI"
      },
      {
        title: "خطوات تنفيذ تأسيس الكهرباء الجزء الثاني✨",
        url: "https://www.youtube.com/watch?v=_w3uUHv_ufU"
      },
      {
        title: "خطوات تنفيذ تأسيس الكهرباء الجزء الاول✨",
        url: "https://www.youtube.com/watch?v=Kl-lxBd1r4A"
      },
      {
        title: "خطوات ظبط منسوب نقاط الكهرباء الجزء الثاني✨",
        url: "https://www.youtube.com/watch?v=aiL5SLShSvI"
      },
      {
        title: "خطوات ظبط منسوب نقاط الكهرباء الجزء الاول✨",
        url: "https://www.youtube.com/watch?v=48JAZK0VT5A"
      },
      {
        title: "خطوات تأسيس مجموعة التليفزيون الجزء الثاني ✨",
        url: "https://www.youtube.com/watch?v=FcCYgwoMhKs"
      },
    ],
  },
  {
    id: "porcelain",
    name: "شرح بند البورسلين",
    icon: Grid3X3,
    videos: [
      {
        title: "طريقة تركيب البورسلين ✨",
        url: "https://www.youtube.com/watch?v=4gcCKM1UtNY"
      },
      {
        title: "طريقة تركيب البورسلين 60*120✨",
        url: "https://www.youtube.com/watch?v=Ky12g41WZTw"
      },
      {
        title: "ادوات المستخدمة في تركيب البورسلين وقوة التحمل لكل نوع ✨",
        url: "https://www.youtube.com/watch?v=iRikQzJK2vs"
      },
      {
        title: "طريقة تقسيط وميول البورسلين ✨",
        url: "https://www.youtube.com/watch?v=lFkeq-O5KY8"
      },
      {
        title: "تركيب البورسلين بمادة سوداء ✨",
        url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
      },
    ],
  },
  {
    id: "wood",
    name: "شرح بند الأخشاب",
    icon: DoorOpen,
    videos: [
      {
        title: "طريقة تركيب البورسلين ✨",
        url: "https://www.youtube.com/watch?v=4gcCKM1UtNY"
      },
      {
        title: "طريقة تركيب البورسلين 60*120✨",
        url: "https://www.youtube.com/watch?v=Ky12g41WZTw"
      },
      {
        title: "ادوات المستخدمة في تركيب البورسلين وقوة التحمل لكل نوع ✨",
        url: "https://www.youtube.com/watch?v=iRikQzJK2vs"
      },
      {
        title: "طريقة تقسيط وميول البورسلين ✨",
        url: "https://www.youtube.com/watch?v=lFkeq-O5KY8"
      },
      {
        title: "تركيب البورسلين بمادة سوداء ✨",
        url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
      },
    ],
  },
  {
    id: "plastering",
    name: "شرح بند المحارة",
    icon: Paintbrush,
    videos: [
      {
        title: "المقاول الشاطر رزق وطول ما انت بتحب شغلك هتعرف تبدع فيه 👌❤️",
        url: "https://www.youtube.com/watch?v=7pMHEqnAd4o"
      },
      {
        title: "هل في مقاسات لازم تلتزم بيها في تأميم الأبواب؟",
        url: "https://www.youtube.com/watch?v=fyd4A0WpnlA"
      },
      {
        title: "ازاي بيتم حساب بؤوج المحارة ✨",
        url: "https://www.youtube.com/watch?v=NmMNlk1BGGo"
      },
      {
        title: "نصيحة مهمة بخصوص المونة بتاعت المحارة✨",
        url: "https://www.youtube.com/watch?v=bey4_chgR_M"
      },
    ],
  },
  {
    id: "securit",
    name: "شرح بند السيكوريت",
    icon: Square,
    videos: [
      {
        title: "أحدث القطاعات الموجودة في السوق دلوقتي ولازم تبقى عارفها وانت بتشطب شقتك 👌❤️",
        url: "https://www.youtube.com/watch?v=TNBrx54LXaM"
      },
      {
        title: "انواع الاكسسوارات والزجاج المستخدم في الكابينة الشاور ✨",
        url: "https://www.youtube.com/watch?v=rLFy16fcpHs"
      },
      {
        title: "خطوات تركيب زجاج الكابينة الشاور ,, ✨",
        url: "https://www.youtube.com/watch?v=c2MeCeDmIjQ"
      },
    ],
  },
  {
    id: "futuristic",
    name: "شرح بند الفيوتك",
    icon: Building2,
    videos: [
      {
        title: "خطوات تركيب الفيوتيك !✨",
        url: "https://www.youtube.com/watch?v=FC03lO03Xx4"
      },
    ],
  },
  {
    id: "insulation",
    name: "شرح بند العزل",
    icon: Mountain,
    videos: [
      {
        title: "نصايح مهمة في اعمال الرووف ✨",
        url: "https://www.youtube.com/watch?v=Vn99LL__Qyg"
      },
      {
        title: "شرح اعمال العزل الحراري للروف ✨",
        url: "https://www.youtube.com/watch?v=1f8T10qY62"
      },
    ],
  },
  {
    id: "swimming-pool",
    name: "شرح بند حمام السباحة",
    icon: Droplets,
    videos: [
      {
        title: "شاهد جميع فيديوهات حمام السباحة 🏊",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bZhnuLWMhZopQLxp7qx9AQo"
      },
    ],
  },
  {
    id: "pvc",
    name: "شرح بند الـ PVC",
    icon: Square,
    videos: [
      {
        title: "شاهد جميع فيديوهات الـ PVC 📺",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bb_SdjpETUloOHG4ANWTf4d"
      },
    ],
  },
  {
    id: "aluminum",
    name: "شرح بند الالموتال",
    icon: Building2,
    videos: [
      {
        title: "شاهد جميع فيديوهات الالموتال 🪟",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bYgk3VOUDqCzFfvLaZmur27"
      },
    ],
  },
  {
    id: "plumbing-playlist",
    name: "شرح بند السباكة - Playlist",
    icon: Droplets,
    videos: [
      {
        title: "شاهد جميع فيديوهات السباكة 🚰",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bZVKYksUSx-g4NgAM-QB5lR"
      },
    ],
  },
  {
    id: "painting",
    name: "شرح بند الدهان",
    icon: Paintbrush,
    videos: [
      {
        title: "شاهد جميع فيديوهات الدهان 🎨",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bZXyI9LhBfLIunAKCMmQxRQ"
      },
    ],
  },
  {
    id: "marble",
    name: "شرح بند الرخام",
    icon: Mountain,
    videos: [
      {
        title: "شاهد جميع فيديوهات الرخام 💎",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0baABHJjgc7v_Do3DTdXFHEj"
      },
    ],
  },
  {
    id: "gypsum",
    name: "شرح بند الجبس بورد",
    icon: Square,
    videos: [
      {
        title: "شاهد جميع فيديوهات الجبس بورد 📐",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bbDU0oAl9zvmBl64gpxYCmI"
      },
    ],
  },
  {
    id: "air-conditioning",
    name: "شرح بند التكييفات",
    icon: Building2,
    videos: [
      {
        title: "شاهد جميع فيديوهات التكييفات ❄️",
        url: "https://www.youtube.com/playlist?list=PLiXKKlCpt0bZutAVKKPT5FtajWBPegnE5"
      },
    ],
  },
]

export default function FinishingExplanationPage() {
  const [selected, setSelected] = useState(finishingVideos[0].id)
  const selectedCategory = finishingVideos.find((c) => c.id === selected)

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader
        title="شرح بنود التشطيب"
        description="فيديوهات تعليمية شاملة لجميع بنود التشطيب"
        icon={FileText}
      />
      
      <section className="py-8 px-4" dir="rtl">
        <div className="max-w-6xl mx-auto">
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {finishingVideos.map((category) => {
              const Icon = category.icon
              const isActive = selected === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelected(category.id)}
                  className={`flex items-center gap-4 p-6 rounded-xl border-2 transition-all ${
                    isActive
                      ? "bg-primary/10 border-primary text-primary shadow-lg"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <div className={`p-3 rounded-lg ${isActive ? "bg-primary/20" : "bg-muted"}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <p className="text-sm opacity-70">{category.videos.length} فيديو</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Videos List */}
          {selectedCategory && (
            <Card className="bg-card border-2 border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const Icon = selectedCategory.icon
                  return <Icon className="w-6 h-6 text-primary" />
                })()}
                <h2 className="text-2xl font-black text-primary">{selectedCategory.name}</h2>
                <span className="mr-auto bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold">
                  {selectedCategory.videos.length} فيديو
                </span>
              </div>

              <ScrollArea className="h-[600px]" dir="rtl">
                <div className="space-y-3 pr-4">
                  {selectedCategory.videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 items-start p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-black group-hover:bg-primary group-hover:text-white transition-all">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-base leading-relaxed font-bold group-hover:text-primary transition-all">
                          {video.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <ExternalLink className="w-3 h-3" />
                          اضغط للمشاهدة على YouTube
                        </p>
                      </div>
                      <div className="flex-shrink-0 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        YouTube
                      </div>
                    </a>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}
