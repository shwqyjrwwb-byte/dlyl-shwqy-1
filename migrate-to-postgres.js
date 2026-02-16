// سكريبت لتحويل البيانات من SQLite إلى PostgreSQL
const { PrismaClient: SQLitePrisma } = require('@prisma/client');
const { PrismaClient: PostgresPrisma } = require('@prisma/client');

async function migrateData() {
  console.log('🔄 بدء نقل البيانات من SQLite إلى PostgreSQL...\n');

  // الاتصال بـ SQLite (قاعدة البيانات المحلية)
  const sqlite = new SQLitePrisma({
    datasources: {
      db: {
        url: 'file:./prisma/dev.db'
      }
    }
  });

  // الاتصال بـ PostgreSQL (قاعدة البيانات على Vercel)
  const postgres = new PostgresPrisma({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    // 1. نقل العملاء (Clients)
    console.log('📋 نقل بيانات العملاء...');
    const clients = await sqlite.client.findMany({
      include: {
        files: true
      }
    });
    
    console.log(`   وجدنا ${clients.length} عميل`);

    for (const client of clients) {
      const { files, ...clientData } = client;
      
      // إنشاء العميل
      await postgres.client.create({
        data: {
          ...clientData,
          files: {
            create: files.map(file => ({
              id: file.id,
              name: file.name,
              url: file.url,
              size: file.size,
              type: file.type,
              uploadedAt: file.uploadedAt
            }))
          }
        }
      });
      
      console.log(`   ✅ تم نقل: ${client.name}`);
    }

    console.log('\n✅ تم نقل جميع البيانات بنجاح!');
    console.log(`📊 الإحصائيات:`);
    console.log(`   - العملاء: ${clients.length}`);
    console.log(`   - الملفات: ${clients.reduce((sum, c) => sum + c.files.length, 0)}`);

  } catch (error) {
    console.error('❌ حدث خطأ:', error.message);
    throw error;
  } finally {
    await sqlite.$disconnect();
    await postgres.$disconnect();
  }
}

// تشغيل السكريبت
migrateData()
  .then(() => {
    console.log('\n🎉 انتهى النقل بنجاح!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 فشل النقل:', error);
    process.exit(1);
  });
