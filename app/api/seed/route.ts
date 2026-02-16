import { NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/db-actions'

export async function POST() {
  try {
    const result = await seedDatabase()
    
    if (result.success) {
      return NextResponse.json({ message: result.message })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'فشل في نقل البيانات' }, { status: 500 })
  }
}
