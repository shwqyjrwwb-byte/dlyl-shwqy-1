import { PrismaClient } from '@prisma/client'
import {
  newCairoClients,
  fifthSettlementClients,
  downtownClients,
  octoberClients,
  sheikhZayedClients
} from '../lib/clients-data'

const prisma = new PrismaClient()

async function main() {
  console.log('بدء استيراد البيانات...')

  const allClients = [
    ...sheikhZayedClients,
    ...newCairoClients,
    ...fifthSettlementClients,
    ...downtownClients,
    ...octoberClients
  ]

  let importedCount = 0
  let skippedCount = 0

  for (const client of allClients) {
    try {
      // Check if client already exists
      const existing = await prisma.client.findUnique({
        where: { code: client.code }
      })

      if (!existing) {
        // Create client
        const newClient = await prisma.client.create({
          data: {
            name: client.name,
            code: client.code,
            package: client.package,
            areaId: client.areaId
          }
        })

        // Add files
        for (const file of client.files) {
          await prisma.clientFile.create({
            data: {
              name: file.name,
              url: file.url,
              size: file.size,
              type: file.type,
              uploadedAt: file.uploadedAt,
              clientId: newClient.id
            }
          })
        }

        importedCount++
        console.log(`✓ تم استيراد: ${client.name}`)
      } else {
        skippedCount++
        console.log(`- تم تخطي: ${client.name} (موجود مسبقاً)`)
      }
    } catch (error) {
      console.error(`✗ خطأ في استيراد ${client.name}:`, error)
    }
  }

  console.log('\n=== النتيجة ===')
  console.log(`تم الاستيراد: ${importedCount}`)
  console.log(`تم التخطي: ${skippedCount}`)
  console.log(`الإجمالي: ${allClients.length}`)
}

main()
  .catch((e) => {
    console.error('خطأ في تنفيذ السكريبت:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
