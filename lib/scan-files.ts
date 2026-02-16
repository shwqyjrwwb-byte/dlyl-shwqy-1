import fs from 'fs'
import path from 'path'
import { prisma } from './prisma'

// Map folder names to area IDs
const areaFolderMap: Record<string, number> = {
  'منطقة القاهرة الجديدةo': 2,
  'new-cairo': 2,
  'منطقة التجمع o': 3,
  'fifth-settlement': 3,
  'عملاء وسط': 4,
  'downtown': 4,
  'منطقة اكتوبرo': 5,
  'october': 5,
  'عملاء العاصمه': 1,
  'عملاء اقاليم': 6
}

interface ScannedClient {
  name: string
  code: string
  folderName: string
  areaId: number
  files: ScannedFile[]
}

interface ScannedFile {
  name: string
  path: string
  size: number
  type: string
}

// Extract client name and code from folder name
function parseClientFolder(folderName: string): { name: string; code: string } | null {
  // Try to extract code from end (e.g., "حسام صلاح 667" -> name: "حسام صلاح", code: "667")
  const match = folderName.match(/^(.+?)\s+(\d+)$/)
  
  if (match) {
    return {
      name: match[1].trim(),
      code: match[2]
    }
  }
  
  // If no number at end, use folder name as both name and code
  return {
    name: folderName,
    code: folderName
  }
}

export async function scanPdfsFolder(): Promise<ScannedClient[]> {
  const pdfsPath = path.join(process.cwd(), 'public', 'pdfs')
  const scannedClients: ScannedClient[] = []

  try {
    const areaFolders = fs.readdirSync(pdfsPath)

    for (const areaFolder of areaFolders) {
      if (areaFolder.startsWith('.')) continue

      const areaId = areaFolderMap[areaFolder]
      if (!areaId) continue

      const areaPath = path.join(pdfsPath, areaFolder)
      const stat = fs.statSync(areaPath)
      
      if (!stat.isDirectory()) continue

      // Read client folders
      const clientFolders = fs.readdirSync(areaPath)

      for (const clientFolder of clientFolders) {
        if (clientFolder.startsWith('.') || clientFolder === 'Thumbs.db') continue

        const clientPath = path.join(areaPath, clientFolder)
        const clientStat = fs.statSync(clientPath)

        if (!clientStat.isDirectory()) continue

        // Parse client info
        const clientInfo = parseClientFolder(clientFolder)
        if (!clientInfo) continue

        // Read files in client folder
        const files = fs.readdirSync(clientPath)
        const scannedFiles: ScannedFile[] = []

        for (const file of files) {
          if (file.startsWith('.') || file === 'Thumbs.db') continue

          const filePath = path.join(clientPath, file)
          const fileStat = fs.statSync(filePath)

          if (fileStat.isFile()) {
            const ext = path.extname(file).toLowerCase()
            const fileType = getFileType(ext)

            scannedFiles.push({
              name: file,
              path: `/pdfs/${areaFolder}/${clientFolder}/${encodeURIComponent(file)}`,
              size: fileStat.size,
              type: fileType
            })
          }
        }

        if (scannedFiles.length > 0) {
          scannedClients.push({
            name: clientInfo.name,
            code: clientInfo.code,
            folderName: clientFolder,
            areaId,
            files: scannedFiles
          })
        }
      }
    }

    return scannedClients
  } catch (error) {
    console.error('Error scanning pdfs folder:', error)
    return []
  }
}

function getFileType(ext: string): string {
  switch (ext) {
    case '.pdf': return 'تأسيسات'
    case '.bdf':
    case '.bdgf': return 'ملفات BDF'
    case '.dwg':
    case '.dxf': return 'رسوم هندسية'
    case '.doc':
    case '.docx': return 'مستندات'
    case '.xls':
    case '.xlsx': return 'جداول'
    case '.jpg':
    case '.jpeg':
    case '.png': return 'صور'
    case '.zip':
    case '.rar': return 'ملفات مضغوطة'
    default: return 'ملفات أخرى'
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Determine package based on client name or default
function determinePackage(clientName: string): string {
  // You can add logic here to determine package
  // For now, default to VIP
  return 'VIP'
}

// Import clients and files to database
export async function importClientsAndFiles() {
  const clients = await scanPdfsFolder()
  let importedClients = 0
  let importedFiles = 0
  let skippedClients = 0
  let skippedFiles = 0
  let errors = 0

  for (const clientData of clients) {
    try {
      // Check if client exists
      let client = await prisma.client.findUnique({
        where: { code: clientData.code }
      })

      if (!client) {
        // Create new client
        client = await prisma.client.create({
          data: {
            name: clientData.name,
            code: clientData.code,
            package: determinePackage(clientData.name),
            areaId: clientData.areaId
          }
        })
        console.log(`✓ Created client: ${client.name} (${client.code})`)
        importedClients++
      } else {
        console.log(`→ Client exists: ${client.name} (${client.code})`)
        skippedClients++
      }

      // Import files
      for (const file of clientData.files) {
        try {
          // Check if file already exists
          const existing = await prisma.clientFile.findFirst({
            where: {
              clientId: client.id,
              name: file.name
            }
          })

          if (existing) {
            console.log(`  → File exists: ${file.name}`)
            skippedFiles++
            continue
          }

          // Create file record
          await prisma.clientFile.create({
            data: {
              name: file.name,
              url: file.path,
              size: formatFileSize(file.size),
              type: file.type,
              clientId: client.id
            }
          })

          console.log(`  ✓ Imported file: ${file.name}`)
          importedFiles++
        } catch (error) {
          console.error(`  ✗ Error importing file ${file.name}:`, error)
          errors++
        }
      }
    } catch (error) {
      console.error(`✗ Error importing client ${clientData.name}:`, error)
      errors++
    }
  }

  return {
    totalClients: clients.length,
    totalFiles: clients.reduce((sum, c) => sum + c.files.length, 0),
    importedClients,
    importedFiles,
    skippedClients,
    skippedFiles,
    errors
  }
}
