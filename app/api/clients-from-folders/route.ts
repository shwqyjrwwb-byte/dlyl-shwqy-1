import { NextResponse } from 'next/server'
import { scanClientsFromFolders, getClientsByAreaFromFolders } from '@/lib/scan-clients-folders'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const areaId = searchParams.get('areaId')

    if (areaId) {
      const clients = getClientsByAreaFromFolders(parseInt(areaId))
      return NextResponse.json({ success: true, clients })
    }

    const allClients = scanClientsFromFolders()
    return NextResponse.json({ success: true, clients: allClients })
  } catch (error) {
    console.error('Error fetching clients from folders:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch clients' }, { status: 500 })
  }
}
