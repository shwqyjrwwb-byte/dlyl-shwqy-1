import { NextResponse } from 'next/server'
import { getAllClients, createClient } from '@/lib/db-actions'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const areaId = searchParams.get('areaId')
    
    if (areaId) {
      const { getClientsByAreaFromDB } = await import('@/lib/db-actions')
      const clients = await getClientsByAreaFromDB(parseInt(areaId))
      return NextResponse.json(clients)
    }
    
    const clients = await getAllClients()
    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'فشل في جلب العملاء' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await createClient(data)
    
    if (result.success) {
      return NextResponse.json(result.client)
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'فشل في إنشاء العميل' }, { status: 500 })
  }
}
