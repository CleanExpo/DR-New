const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.$queryRaw`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
  ORDER BY table_name
`
.then(tables => {
  console.log(`Found ${tables.length} tables:`);
  tables.forEach(t => console.log('- ' + t.table_name));
})
.catch(err => console.error('Error:', err.message))
.finally(() => prisma.$disconnect());
