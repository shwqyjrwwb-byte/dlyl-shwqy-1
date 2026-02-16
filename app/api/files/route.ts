import { NextResponse } from 'next/server'
import { addFileToClient, deleteFile } from '@/lib/db-actions'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { clientId, ...fileData } = data
    
    if (!clientId) {
      return NextResponse.json({ error: 'معرف العميل مطلوب' }, { status: 400 })
    }
    
    const result = await addFileToClient(clientId, fileData)
    
    if (result.success) {
      return NextResponse.json(result.file)
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'فشل في إضافة الملف' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get('id')
    
    if (!fileId) {
      return NextResponse.json({ error: 'معرف الملف مطلوب' }, { status: 400 })
    }
    
    const result = await deleteFile(fileId)
    
    if (result.success) {
      return NextResponse.json({ message: 'تم حذف الملف بنجاح' })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'فشل في حذف الملف' }, { status: 500 })
  }
}
