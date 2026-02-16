"use server"

import { prisma } from './prisma'
import type { Client, ClientFile } from './clients-data'

// Get all clients
export async function getAllClients() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        files: true
      }
    })
    return clients
  } catch (error) {
    console.error('Error fetching clients:', error)
    return []
  }
}

// Get client by ID
export async function getClientByIdFromDB(id: string) {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        files: true
      }
    })
    return client
  } catch (error) {
    console.error('Error fetching client:', error)
    return null
  }
}

// Get clients by area
export async function getClientsByAreaFromDB(areaId: number) {
  try {
    const clients = await prisma.client.findMany({
      where: { areaId },
      include: {
        files: true
      }
    })
    return clients
  } catch (error) {
    console.error('Error fetching clients by area:', error)
    return []
  }
}

// Create new client
export async function createClient(data: {
  name: string
  code: string
  package: string
  areaId: number
}) {
  try {
    const client = await prisma.client.create({
      data
    })
    return { success: true, client }
  } catch (error) {
    console.error('Error creating client:', error)
    return { success: false, error: 'فشل في إنشاء العميل' }
  }
}

// Update client
export async function updateClient(id: string, data: {
  name?: string
  code?: string
  package?: string
  areaId?: number
}) {
  try {
    const client = await prisma.client.update({
      where: { id },
      data
    })
    return { success: true, client }
  } catch (error) {
    console.error('Error updating client:', error)
    return { success: false, error: 'فشل في تحديث العميل' }
  }
}

// Delete client
export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting client:', error)
    return { success: false, error: 'فشل في حذف العميل' }
  }
}

// Add file to client
export async function addFileToClient(clientId: string, fileData: {
  name: string
  url: string
  size: string
  type: string
}) {
  try {
    const file = await prisma.clientFile.create({
      data: {
        ...fileData,
        clientId
      }
    })
    return { success: true, file }
  } catch (error) {
    console.error('Error adding file:', error)
    return { success: false, error: 'فشل في إضافة الملف' }
  }
}

// Delete file
export async function deleteFile(fileId: string) {
  try {
    await prisma.clientFile.delete({
      where: { id: fileId }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting file:', error)
    return { success: false, error: 'فشل في حذف الملف' }
  }
}

// Seed database with existing clients
export async function seedDatabase() {
  try {
    // Import existing clients data
    const { newCairoClients, fifthSettlementClients, downtownClients, octoberClients } = await import('./clients-data')
    
    const allClients = [
      ...newCairoClients,
      ...fifthSettlementClients,
      ...downtownClients,
      ...octoberClients
    ]

    for (const client of allClients) {
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
      }
    }

    return { success: true, message: 'تم نقل البيانات بنجاح' }
  } catch (error) {
    console.error('Error seeding database:', error)
    return { success: false, error: 'فشل في نقل البيانات' }
  }
}
