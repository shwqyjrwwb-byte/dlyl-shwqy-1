import { NextResponse } from "next/server"

// تخزين مؤقت للرسائل (في الإنتاج يجب استخدام قاعدة بيانات)
let announcements: any[] = []

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      announcements: announcements.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في جلب الرسائل" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, content, fileUrl, fileName } = body

    const newAnnouncement = {
      id: Date.now().toString(),
      type, // text, voice, image, video
      content,
      fileUrl,
      fileName,
      senderName: "م/ أحمد شوقي",
      senderTitle: "رئيس مجلس الإدارة",
      senderImage: "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg",
      createdAt: new Date().toISOString(),
    }

    announcements.push(newAnnouncement)

    return NextResponse.json({
      success: true,
      announcement: newAnnouncement,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في إرسال الرسالة" },
      { status: 500 }
    )
  }
}
