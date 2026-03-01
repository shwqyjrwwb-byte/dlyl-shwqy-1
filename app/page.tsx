"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, LogIn, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PageBackgroundSlideshow } from "@/components/page-background-slideshow"

export default function HomePage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!userId || !password) {
      setError("يرجى إدخال ID وكلمة المرور")
      setIsLoading(false)
      return
    }

    // التحقق من يوزر المدير الخاص للدليل
    if (userId === "ahmed1" && password === "ahmed1") {
      localStorage.setItem("userLoggedIn", "true")
      localStorage.setItem("userId", userId)
      localStorage.setItem("employeeData", JSON.stringify({
        name: "م/ أحمد شوقي",
        position: "رئيس مجلس الإدارة",
        department: "الإدارة العليا",
        image: "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg"
      }))
      localStorage.setItem("loginTime", new Date().toISOString())

      // تسجيل المدير كأونلاين
      try {
        await fetch("/api/users/online", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            userName: "م/ أحمد شوقي",
            userPosition: "رئيس مجلس الإدارة",
          }),
        })
      } catch (error) {
        console.error("Error updating online status:", error)
      }

      router.push("/home")
      setIsLoading(false)
      return
    }

    // قاموس اليوزرات الثابتة - جميع الموظفين
    const defaultUsers: Record<string, { name: string; password: string; position: string; department: string }> = {
      "malak": { name: "ملك رؤوف", password: "482498", position: "مديرة مكتب م/ أحمد شوقي", department: "مكتب م/ أحمد شوقي" },
      "mohamed.hassan": { name: "محمد حسن", password: "511776", position: "المدير العام", department: "الإدارة العامة" },
      "mahmoud.afandina": { name: "م/ محمود عبد الغني (أفندينا)", password: "861380", position: "مدير قسم الجبس بورد والرخام", department: "مديرين البنود" },
      "mohamed.shawky": { name: "م/ محمد شوقي", password: "593311", position: "مدير قسم النجارة", department: "مديرين البنود" },
      "mohamed.naguib": { name: "م/ محمد نجيب", password: "726955", position: "مدير بند الكهرباء", department: "مديرين البنود" },
      "ahmed.abdelbaset": { name: "م/ أحمد عبد الباسط", password: "706597", position: "مدير بند السيراميك", department: "مديرين البنود" },
      "mohamed.youssef": { name: "م/ محمد يوسف", password: "766726", position: "مدير التكيفات والتوريدات", department: "مديرين البنود" },
      "ahmed.abdelghani": { name: "م/ أحمد عبد الغني", password: "706598", position: "مدير بند توريدات الكهرباء", department: "مديرين البنود" },
      "mohamed.abdelmoneam": { name: "محمد عبد المنعم", password: "800543", position: "مدير الموارد البشرية", department: "الموارد البشرية" },
      "hagar": { name: "هاجر عبد العزيز", password: "800544", position: "HR", department: "الموارد البشرية" },
      "heba.khaled": { name: "هبه خالد", password: "356988", position: "HR", department: "الموارد البشرية" },
      "abdelrahman.fayez": { name: "عبد الرحمن فايز علي", password: "448579", position: "HR", department: "الموارد البشرية" },
      "mostafa.shawky": { name: "م/ مصطفى شوقي", password: "776674", position: "Social Media Manager", department: "السوشيال ميديا" },
      "ahmed.keta": { name: "أحمد عبد الغني (كيتا)", password: "800526", position: "Deputy Manager", department: "السوشيال ميديا" },
      "ashraf.zaki": { name: "اشرف ذكي", password: "827701", position: "Producer - Photographer", department: "السوشيال ميديا" },
      "anas.atef": { name: "انس عاطف محمد", password: "340773", position: "Producer", department: "السوشيال ميديا" },
      "mahmoud.alaa": { name: "محمود علاء انصاري", password: "010618", position: "Moderator", department: "السوشيال ميديا" },
      "moamen.mostafa": { name: "مؤمن مصطفى", password: "587005", position: "Content Creator", department: "السوشيال ميديا" },
      "ahmed.hamed": { name: "احمد حامد", password: "426815", position: "مدير منطقة أكتوبر", department: "مهندسين - أكتوبر" },
      "ahmed.ragab": { name: "احمد رجب", password: "912261", position: "مهندس - أكتوبر", department: "مهندسين - أكتوبر" },
      "mohamed.obaida": { name: "محمد عبيده", password: "690947", position: "مهندس - أكتوبر", department: "مهندسين - أكتوبر" },
      "ahmed.ashraf": { name: "احمد اشرف", password: "500188", position: "مهندس - أكتوبر", department: "مهندسين - أكتوبر" },
      "mohamed.amin": { name: "محمد امين", password: "860050", position: "مهندس - أكتوبر", department: "مهندسين - أكتوبر" },
      "islam.adel": { name: "اسلام عادل", password: "044029", position: "مهندس - أكتوبر", department: "مهندسين - أكتوبر" },
      "ali.mohamed": { name: "علي", password: "997103", position: "مهندس - أكتوبر", department: "مهندسين - أكتوبر" },
      "mostafa.kamal": { name: "مصطفي كمال", password: "589130", position: "مدير منطقة القاهرة الجديدة", department: "مهندسين - القاهرة الجديدة" },
      "mostafa.eid": { name: "مصطفي عيد", password: "498820", position: "مهندس - القاهرة الجديدة", department: "مهندسين - القاهرة الجديدة" },
      "mohamed.gamal": { name: "محمد جمال", password: "864455", position: "مهندس - القاهرة الجديدة", department: "مهندسين - القاهرة الجديدة" },
      "abdelrahman.mohamed": { name: "عبدالرحمن محمد", password: "159043", position: "مهندس - القاهرة الجديدة", department: "مهندسين - القاهرة الجديدة" },
      "ahmed.elazaby": { name: "احمد العزبي", password: "273742", position: "مدير منطقة العاصمة الإدارية", department: "مهندسين - العاصمة" },
      "hussein.faid": { name: "حسين فيض الله", password: "322922", position: "مهندس - العاصمة الإدارية", department: "مهندسين - العاصمة" },
      "mohamed.ashraf": { name: "محمد اشرف", password: "492117", position: "مهندس - العاصمة الإدارية", department: "مهندسين - العاصمة" },
      "mahmoud.mohsen": { name: "محمود محسن", password: "640037", position: "مهندس - العاصمة الإدارية", department: "مهندسين - العاصمة" },
      "mohamed.maher": { name: "محمد ماهر", password: "629354", position: "مهندس - العاصمة الإدارية", department: "مهندسين - العاصمة" },
      "mohamed.medhat": { name: "محمد مدحت", password: "593094", position: "مدير منطقة التجمع الخامس", department: "مهندسين - التجمع" },
      "hossam.ghandour": { name: "حسام الغدور", password: "244495", position: "مهندس - التجمع الخامس", department: "مهندسين - التجمع" },
      "karim.samy": { name: "كريم سامي", password: "183789", position: "مهندس - التجمع الخامس", department: "مهندسين - التجمع" },
      "mohsen.abdelrazek": { name: "محسن عبدالرازق", password: "091234", position: "مهندس - التجمع الخامس", department: "مهندسين - التجمع" },
      "abdelnaby.morgan": { name: "عبدالنبي مرجان", password: "334460", position: "مهندس - التجمع الخامس", department: "مهندسين - التجمع" },
      "emad.shalaby": { name: "عماد شلبي", password: "455556", position: "مهندس - التجمع الخامس", department: "مهندسين - التجمع" },
      "mohamed.ghannam": { name: "محمد غنام", password: "003089", position: "مهندس - التجمع الخامس", department: "مهندسين - التجمع" },
      "ahmed.bassyouni": { name: "احمد بسيوني", password: "221382", position: "مدير منطقة وسط", department: "مهندسين - وسط" },
      "mohamed.gameel": { name: "محمد محمود الجميل", password: "264221", position: "مهندس - وسط", department: "مهندسين - وسط" },
      "amr.khaled": { name: "عمرو خالد", password: "107025", position: "مهندس - وسط", department: "مهندسين - وسط" },
      "abdelrahman.iraqi": { name: "عبدالرحمن العراقي", password: "074988", position: "مهندس - وسط", department: "مهندسين - وسط" },
      "bishoy": { name: "بيشوي", password: "948825", position: "مهندس - وسط", department: "مهندسين - وسط" },
      "mohamed.salah": { name: "محمد صلاح", password: "416769", position: "مدير منطقة الأقاليم", department: "مهندسين - الأقاليم" },
      "ali.mokhtar": { name: "علي مختار", password: "602018", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "ahmed.elsheikh": { name: "احمد الشيخ (السادات)", password: "277915", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "bayoumy": { name: "بيومي", password: "973235", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "shenouda": { name: "شنوده", password: "285129", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "ahmed.awad": { name: "احمد عوض", password: "936377", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "mohamed.abdelazeem": { name: "محمد عبدالعظيم", password: "020263", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "mahmoud.abouzeid": { name: "محمود ابو زيد", password: "479394", position: "مهندس - الأقاليم", department: "مهندسين - الأقاليم" },
      "mahmoud.ismail": { name: "محمود اسماعيل", password: "121549", position: "مدير الجودة", department: "الجودة" },
      "shady.mazhar": { name: "شادي مظهر", password: "704637", position: "مهندس جودة", department: "الجودة" },
      "moamen.yousry": { name: "مؤمن يسري", password: "293383", position: "مسئول الخدمات / المشتريات", department: "المعاينات" },
      "amr.abdullah": { name: "المستشار عمرو عبد الله", password: "088704", position: "مدير الإدارة القانونية", department: "الشؤون القانونية" },
      "mahmoud.gharib": { name: "محمود غريب", password: "734095", position: "شؤون قانونية", department: "الشؤون القانونية" },
      "wael.rafat": { name: "وائل رأفت أمين", password: "660739", position: "مدير الحسابات", department: "الحسابات" },
      "rady.shehata": { name: "راضي شحاته", password: "864533", position: "أمين خزينة", department: "الحسابات" },
      "mai.essam": { name: "مي عصام عبد العزيز", password: "925721", position: "محاسبة", department: "الحسابات" },
      "khaled.mohyeldin": { name: "خالد محي الدين عبد القادر", password: "296258", position: "محاسب", department: "الحسابات" },
      "khaled.atef": { name: "خالد عاطف عبد الغني محمد", password: "329792", position: "محاسب مخزن", department: "الحسابات" },
      "heba.tawfik": { name: "هبه توفيق", password: "183223", position: "مسئولة تحويلات", department: "الحسابات" },
      "karim.atef": { name: "كريم عاطف", password: "922582", position: "مسئول إضافات", department: "الحسابات" },
      "hasnaa.emad": { name: "حسناء عماد", password: "544901", position: "مسئول إضافات", department: "الحسابات" },
      "abdullah.essam": { name: "عبد الله عصام", password: "672999", position: "مسئول إضافات", department: "الحسابات" },
      "mohamed.salem": { name: "محمد سالم صلاح الدين", password: "494073", position: "مسئول إضافات", department: "الحسابات" },
      "ashraf.saber": { name: "أشرف صابر", password: "165846", position: "جودة نجارة", department: "النجارة" },
      "esraa.galal": { name: "إسراء جلال", password: "594811", position: "مسئول معرض الأثاث", department: "النجارة" },
      "heba.aboelmagd": { name: "هبه أبو المجد", password: "827704", position: "سكرتيرة", department: "النجارة" },
      "basmala.zaki": { name: "بسمله زكي عزت السعيد", password: "101122", position: "خدمة عملاء النجارة", department: "النجارة" },
      "mahmoud.hesham": { name: "محمود هشام محمود نجاتي", password: "861381", position: "محاسب قسم النجارة", department: "النجارة" },
      "abdelrahman.bahary": { name: "عبد الرحمن البحري", password: "705524", position: "سواق", department: "النجارة" },
      "hesham.magdy": { name: "هشام مجدي كمال", password: "253329", position: "محاسب قسم النجارة", department: "النجارة" },
      "ahmed.hassan": { name: "أحمد حسن مصطفى حسن عبده", password: "466551", position: "مهندس نجارة", department: "النجارة" },
      "hadeer.mahmoud": { name: "هدير محمود محمد", password: "259055", position: "تصميمات النجارة", department: "النجارة" },
      "abdelmoneam.yahya": { name: "عبد المنعم يحيى عبد المنعم", password: "788530", position: "مسئول قسم النجارة", department: "النجارة" },
      "hassan.mahmoud": { name: "حسن محمود عبد الحميد", password: "621041", position: "نجار", department: "النجارة" },
      "abdelrahman.hesham": { name: "عبد الرحمن هشام", password: "250312", position: "عامل النجارة", department: "النجارة" },
      "amr.hesham": { name: "عمرو هشام محمد", password: "148438", position: "عامل مصنع النجارة", department: "النجارة" },
      "islam.khaled": { name: "إسلام خالد", password: "679887", position: "مدير المكتب الفني", department: "المكتب الفني" },
      "yara.yousry": { name: "يارا يسري شعبان", password: "997506", position: "مهندسة مكتب فني", department: "المكتب الفني" },
      "sara.ahmed": { name: "سارة أحمد محمد أحمد", password: "101181", position: "مهندس مكتب فني", department: "المكتب الفني" },
      "kyrillos.zakaria": { name: "كيرلس زكريا غطاس عوض", password: "411913", position: "مهندس مكتب فني", department: "المكتب الفني" },
      "aya.naeem": { name: "آيه نعيم أنور محمود", password: "800548", position: "مهندس مكتب فني", department: "المكتب الفني" },
      "farah.tamer": { name: "فرح تامر محمد", password: "473346", position: "مهندس مكتب فني", department: "المكتب الفني" },
      "abdullah.reda": { name: "عبد الله رضا محمد عبد العزيز", password: "119496", position: "مهندس مكتب فني", department: "المكتب الفني" },
      "maryam.youssef": { name: "مريم يوسف", password: "593289", position: "مهندسة مكتب فني", department: "المكتب الفني" },
      "bassant.antar": { name: "بسنت عنتر", password: "864603", position: "مديرة خدمة العملاء", department: "خدمة العملاء" },
      "asmaa.mohamed": { name: "اسماء محمد عبد العليم", password: "800518", position: "خدمه عملاء العاصمة", department: "خدمة العملاء" },
      "doaa.gamal": { name: "دعاء جمال عبد المنعم", password: "841543", position: "خدمة عملاء القاهرة الجديدة", department: "خدمة العملاء" },
      "youssef.magdy": { name: "يوسف مجدي محرم", password: "119629", position: "خدمة عملاء التجمع", department: "خدمة العملاء" },
      "ayat.hamed": { name: "ايات حامد حسن علي", password: "504072", position: "خدمه عملاء", department: "خدمة العملاء" },
      "ahmed.abdelghani2": { name: "م/ أحمد عبد الغني", password: "706599", position: "مدير قسم الفرش", department: "الفرش والديكور" },
      "nada.amr": { name: "ندى عمرو محمد", password: "864759", position: "مهندسة بقسم الفرش والديكور", department: "الفرش والديكور" },
      "hossam.khaled": { name: "حسام خالد محمود", password: "883633", position: "مهندس 3d", department: "الفرش والديكور" },
      "asmaa.hussein": { name: "أسماء حسين", password: "865758", position: "مسؤولة بند التكيفات", department: "الفرش والديكور" },
      "saeed.samir": { name: "سعيد سمير عبد العزيز علي", password: "086941", position: "مسؤل بند المشتريات الكهربي", department: "الفرش والديكور" },
      "habiba.mansour": { name: "حبيبه منصور", password: "367635", position: "موظفه تعاقدات", department: "التعاقدات" },
      "rana.waheed": { name: "رنا وحيد", password: "630606", position: "موظفه تعاقدات", department: "التعاقدات" },
      "neveen.eid": { name: "نيفين عيد محمد", password: "545667", position: "موظفه تعاقدات", department: "التعاقدات" },
      "youssef.alaa": { name: "يوسف علاء محمد عبد الهادي", password: "620606", position: "موظف تعاقدات - سيلز", department: "التعاقدات" },
      "malak.khaled": { name: "ملك خالد خليل", password: "863141", position: "موظفه تعاقدات", department: "التعاقدات" },
      "hadeer.khaled": { name: "هدير خالد", password: "800534", position: "مسئولة تعاقدات", department: "التعاقدات" },
      "nada.hamed": { name: "ندى حامد سعيد حامد", password: "864748", position: "موظفة تلي سيلز", department: "تلي سيلز" },
      "mohamed.azab": { name: "محمد عزب عرب محمد السيد", password: "654499", position: "تلي سيلز", department: "تلي سيلز" },
      "fatma.rady": { name: "فاطمه راضي أحمد صادق", password: "402956", position: "تلي سيلز", department: "تلي سيلز" },
      "mohamed.yahya": { name: "محمد يحيي عبدالحميد عبد الرازق", password: "946616", position: "مسؤول قسم السيراميك", department: "السيراميك" },
      "omnia.mostafa": { name: "امنيه مصطفى", password: "800552", position: "منسق سيراميك", department: "السيراميك" },
      "mohamed.yousry": { name: "محمد يسري", password: "605351", position: "منسق سيراميك", department: "السيراميك" },
      "mohamed.saeed": { name: "محمد سعيد محمد", password: "865930", position: "مدير قسم التشغيل", department: "التشغيل" },
      "sameh.abdelsabour": { name: "م/ سامح عبد الصبور", password: "864735", position: "مدير مشاريع", department: "التشغيل" },
      "osama.hamdy": { name: "اسامة حمدي أحمد ابراهيم", password: "800523", position: "مسئول مقاولين", department: "التشغيل" },
      "ahmed.khaled": { name: "احمد خالد", password: "612784", position: "مسئول مقاولين", department: "التشغيل" },
      "hossam.ashraf": { name: "حسام اشرف فرج احمد", password: "836360", position: "مسئول البوفيه", department: "البوفيه" },
      "hanan.abbas": { name: "حنان عباس", password: "088455", position: "بوفيه", department: "البوفيه" },
      "mohamed.abdelhalim": { name: "محمد محمد عبد العليم", password: "767222", position: "مسئول معرض الكهرباء", department: "معرض الكهرباء" },
      "mahmoud.ali": { name: "محمود علي", password: "093894", position: "مسئول معرض الدهانات", department: "معرض الدهانات" },
      "ahmed.abulsoud": { name: "م/ أحمد أبو السعود", password: "444748", position: "مدير تكنولوجيا المعلومات", department: "IT" },
      "azzam": { name: "عزام", password: "108751", position: "مسؤول السيارات", department: "السيارات" },
    }

    // التحقق من اليوزرات الثابتة أولاً
    if (defaultUsers[userId] && defaultUsers[userId].password === password) {
      const user = defaultUsers[userId]
      localStorage.setItem("userLoggedIn", "true")
      localStorage.setItem("userId", userId)
      localStorage.setItem("employeeData", JSON.stringify({
        name: user.name,
        position: user.position,
        department: user.department,
        image: undefined
      }))
      localStorage.setItem("loginTime", new Date().toISOString())

      try {
        await fetch("/api/users/online", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            userName: user.name,
            userPosition: user.position,
          }),
        })
      } catch (error) {
        console.error("Error updating online status:", error)
      }

      router.push("/home")
      setIsLoading(false)
      return
    }

    // التحقق من يوزرات الموظفين من localStorage
    const employeeUsers = localStorage.getItem("employeeUsers")
    if (employeeUsers) {
      const users = JSON.parse(employeeUsers)
      const user = users.find((u: any) => u.userId === userId && u.password === password)
      
      if (user) {
        // تسجيل دخول ناجح
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("userId", userId)
        localStorage.setItem("employeeData", JSON.stringify({
          name: user.name,
          position: user.position,
          department: user.department,
          image: user.image
        }))
        localStorage.setItem("loginTime", new Date().toISOString())

        // تسجيل المستخدم كأونلاين
        try {
          await fetch("/api/users/online", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              userName: user.name,
              userPosition: user.position,
            }),
          })
        } catch (error) {
          console.error("Error updating online status:", error)
        }

        router.push("/home")
        setIsLoading(false)
        return
      }
    }

    // التحقق من اليوزرات الخاصة
    const specialUsers = localStorage.getItem("specialUsers")
    if (specialUsers) {
      const users = JSON.parse(specialUsers)
      const user = users.find((u: any) => u.userId === userId && u.password === password)
      
      if (user) {
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("userId", userId)
        localStorage.setItem("employeeData", JSON.stringify({
          name: user.name,
          position: "مستخدم خاص",
          department: "إدارة",
          image: undefined
        }))
        localStorage.setItem("loginTime", new Date().toISOString())

        router.push("/home")
        setIsLoading(false)
        return
      }
    }

    setError("ID أو كلمة المرور غير صحيحة")
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen" dir="rtl">
      {/* Background Slideshow */}
      <PageBackgroundSlideshow />

      {/* زر لوحة التحكم - في الأعلى على اليسار */}
      <div className="fixed top-8 left-8 z-50">
        <div className="relative group">
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-amber-300/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Settings className="w-8 h-8 animate-spin-slow" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black leading-tight">لوحة التحكم</p>
                <p className="text-sm text-amber-100 font-bold">Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* القائمة المنسدلة */}
          <div className="absolute top-full left-0 mt-2 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-amber-300 overflow-hidden">
              <Link href="/admin/dashboard/login?role=admin">
                <div className="px-6 py-4 hover:bg-amber-50 transition-colors cursor-pointer border-b border-gray-200">
                  <p className="font-black text-gray-900 text-lg">المدير العام</p>
                  <p className="text-sm text-gray-600">General Manager</p>
                </div>
              </Link>
              <Link href="/admin/dashboard/login?role=developer">
                <div className="px-6 py-4 hover:bg-amber-50 transition-colors cursor-pointer">
                  <p className="font-black text-gray-900 text-lg">المطور</p>
                  <p className="text-sm text-gray-600">Developer</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/placeholder-logo.png"
                  alt="شوقي جروب"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">دليل شوقي جروب</h1>
              <p className="text-amber-200 text-xl font-bold drop-shadow-md">منصة الموظفين الداخلية</p>
            </div>

            {/* Login Card */}
            <Card className="p-10 shadow-2xl border-4 border-amber-300 bg-white/95 backdrop-blur-md">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <LogIn className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">تسجيل الدخول</h2>
                <p className="text-gray-600 text-lg">مرحباً بك في دليل الموظف</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="userId" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                    <User className="w-5 h-5 text-amber-600" />
                    ID
                  </Label>
                  <Input
                    id="userId"
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="أدخل الـ ID الخاص بك"
                    className="h-14 text-xl border-2 border-gray-300 focus:border-amber-500 font-semibold text-gray-900"
                    style={{ fontSize: '1.25rem', fontWeight: '600' }}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                    <Lock className="w-5 h-5 text-amber-600" />
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="h-14 text-xl border-2 border-gray-300 focus:border-amber-500 font-semibold text-gray-900"
                    style={{ fontSize: '1.25rem', fontWeight: '600' }}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
                    <p className="text-red-700 font-bold">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-2xl font-black bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300"
                >
                  {isLoading ? "جاري التحقق..." : "دخول"}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  للحصول على بيانات الدخول، التواصل مع الإدارة
                </p>
              </div>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white text-sm mb-4 drop-shadow-lg font-bold">
                © 2026 شوقي جروب - جميع الحقوق محفوظة
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="tel:01111119528" className="text-amber-200 hover:text-amber-100 font-bold text-sm drop-shadow-md">
                  📞 01111119528
                </a>
                <span className="text-white/50">|</span>
                <a href="mailto:info@shawkygroup.com" className="text-amber-200 hover:text-amber-100 font-bold text-sm drop-shadow-md">
                  ✉️ info@shawkygroup.com
                </a>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
