import { NextResponse } from 'next/server'
import { getClientByIdFromDB, updateClient, deleteClient } from '../../../../lib/db-actions'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const client = await getClientByIdFromDB(params.id)
    
    if (!client) {
      return NextResponse.json({ error: 'العميل غير موجود' }, { status: 404 })
    }
    
    return NextResponse.json(client)
  } catch (error) {
    return NextResponse.json({ error: 'فشل في جلب بيانات العميل' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const data = await request.json()
    const result = await updateClient(params.id, data)
    
    if (result.success) {
      return NextResponse.json(result.client)
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'فشل في تحديث العميل' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const result = await deleteClient(params.id)
    
    if (result.success) {
      return NextResponse.json({ message: 'تم حذف العميل بنجاح' })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'فشل في حذف العميل' }, { status: 500 })
  }
}
