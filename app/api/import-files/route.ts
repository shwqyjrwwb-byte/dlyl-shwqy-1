import { NextResponse } from 'next/server'
import { importClientsAndFiles } from '../../../lib/scan-files'

export async function POST() {
  try {
    const result = await importClientsAndFiles()
    
    return NextResponse.json({
      success: true,
      message: `تم استيراد ${result.importedClients} عميل و ${result.importedFiles} ملف بنجاح`,
      ...result
    })
  } catch (error) {
    console.error('Error importing:', error)
    return NextResponse.json(
      { error: 'فشل في الاستيراد' },
      { status: 500 }
    )
  }
}
