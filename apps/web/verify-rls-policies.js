const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyRLSPolicies() {
  const result = await prisma.$queryRaw`
    SELECT
      tablename,
      policyname
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname
  `;

  console.log(`\n✅ Found ${result.length} RLS policies\n`);

  // Group by table
  const byTable = {};
  result.forEach(r => {
    if (!byTable[r.tablename]) {
      byTable[r.tablename] = [];
    }
    byTable[r.tablename].push(r.policyname);
  });

  const tableCount = Object.keys(byTable).length;
  console.log(`📊 Policies applied to ${tableCount} tables:\n`);

  Object.keys(byTable).sort().forEach(table => {
    console.log(`   ${table}: ${byTable[table].length} policies`);
  });

  console.log(`\n📈 Summary:`);
  console.log(`   Total policies: ${result.length}`);
  console.log(`   Total tables: ${tableCount}`);
  console.log(`   Average per table: ${(result.length / tableCount).toFixed(1)} policies`);
  console.log(`\n   Expected: 4 policies per table (select, insert, update, delete)`);

  if (tableCount > 0 && result.length === tableCount * 4) {
    console.log(`\n✅ RLS policy coverage is COMPLETE!`);
  } else if (result.length > 0) {
    console.log(`\n⚠️  RLS policies partially applied`);
  } else {
    console.log(`\n❌ No RLS policies found`);
  }

  await prisma.$disconnect();
}

verifyRLSPolicies().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
