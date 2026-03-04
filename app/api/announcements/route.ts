import { NextResponse } from "next/server"

export async function GET() {
  try {
    // قراءة الرسائل من localStorage في المتصفح
    // هذا API endpoint سيتم استدعاؤه من المتصفح
    return NextResponse.json({
      success: true,
      message: "استخدم localStorage مباشرة في المتصفح",
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
    const { type, content, fileData, fileName } = body

    const newAnnouncement = {
      id: Date.now().toString(),
      type, // text, voice, image, video
      content,
      fileData, // base64 data للصور والفيديوهات
      fileName,
      senderName: "م/ أحمد شوقي",
      senderTitle: "رئيس مجلس الإدارة",
      senderImage: "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg",
      createdAt: new Date().toISOString(),
    }

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
