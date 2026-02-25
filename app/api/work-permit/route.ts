import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // استخراج البيانات
    const permitData = {
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      siteName: formData.get("siteName") as string,
      siteCode: formData.get("siteCode") as string,
      region: formData.get("region") as string,
      contractorName: formData.get("contractorName") as string,
      engineerName: formData.get("engineerName") as string,
      engineerPhone: formData.get("engineerPhone") as string,
      workPhase: formData.get("workPhase") as string,
      notes: formData.get("notes") as string,
      status: "pending", // حالة الطلب: pending, approved, rejected
      submittedAt: new Date().toISOString(),
      workers: [] as Array<{ name: string; nationalIdPath: string }>,
    }

    // إنشاء مجلد للتصريح
    const permitId = `permit_${Date.now()}`
    const uploadsDir = join(process.cwd(), "public", "uploads", "work-permits", permitId)
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // حفظ صورة الرقم القومي للمقاول
    const contractorId = formData.get("contractorNationalId") as File
    if (contractorId) {
      const bytes = await contractorId.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const contractorIdPath = join(uploadsDir, `contractor_id.${contractorId.name.split('.').pop()}`)
      await writeFile(contractorIdPath, buffer)
      permitData.contractorNationalId = `/uploads/work-permits/${permitId}/contractor_id.${contractorId.name.split('.').pop()}`
    }

    // حفظ بيانات العمال وصورهم
    let workerIndex = 0
    while (formData.has(`worker_${workerIndex}_name`)) {
      const workerName = formData.get(`worker_${workerIndex}_name`) as string
      const workerIdFile = formData.get(`worker_${workerIndex}_id`) as File
      
      if (workerName && workerIdFile) {
        const bytes = await workerIdFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const workerIdPath = join(uploadsDir, `worker_${workerIndex}_id.${workerIdFile.name.split('.').pop()}`)
        await writeFile(workerIdPath, buffer)
        
        permitData.workers.push({
          name: workerName,
          nationalIdPath: `/uploads/work-permits/${permitId}/worker_${workerIndex}_id.${workerIdFile.name.split('.').pop()}`,
        })
      }
      
      workerIndex++
    }

    // حفظ بيانات التصريح في ملف JSON
    const permitJsonPath = join(uploadsDir, "permit_data.json")
    await writeFile(permitJsonPath, JSON.stringify(permitData, null, 2))

    // TODO: حفظ في قاعدة البيانات بدلاً من الملف
    // await db.workPermits.create({ data: permitData })

    return NextResponse.json({
      success: true,
      message: "تم إرسال طلب التصريح بنجاح",
      permitId,
    })
  } catch (error) {
    console.error("Error processing work permit:", error)
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    )
  }
}

// GET: جلب جميع التصاريح
export async function GET() {
  try {
    // TODO: جلب من قاعدة البيانات
    // const permits = await db.workPermits.findMany()
    
    return NextResponse.json({
      success: true,
      permits: [],
      message: "سيتم تطبيق قاعدة البيانات قريباً",
    })
  } catch (error) {
    console.error("Error fetching permits:", error)
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء جلب التصاريح" },
      { status: 500 }
    )
  }
}
