import mysql from 'mysql2/promise';

async function analyzeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'shekvetili_apartments',
    port: process.env.DB_PORT || 3306
  });

  try {
    // Get all tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('=== ALL TABLES IN DATABASE ===\n');
    
    const tableNames = tables.map(row => Object.values(row)[0]);
    
    // Categorize tables
    const shekvetiliTables = tableNames.filter(t => !t.startsWith('krtsanisi_'));
    const krtsanisiTables = tableNames.filter(t => t.startsWith('krtsanisi_'));
    
    console.log('SHEKVETILI TABLES:');
    shekvetiliTables.forEach(t => console.log(`  - ${t}`));
    
    console.log('\nKRTSANISI TABLES:');
    krtsanisiTables.forEach(t => console.log(`  - ${t}`));
    
    // Analyze structure of key tables
    console.log('\n=== TABLE STRUCTURES ===\n');
    
    // Check apartments tables
    if (shekvetiliTables.includes('apartments')) {
      console.log('SHEKVETILI apartments table:');
      const [cols] = await connection.execute('DESCRIBE apartments');
      cols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`));
    }
    
    if (krtsanisiTables.includes('krtsanisi_apartments')) {
      console.log('\nKRTSANISI apartments table:');
      const [cols] = await connection.execute('DESCRIBE krtsanisi_apartments');
      cols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`));
    }
    
    // Check blocks tables
    if (shekvetiliTables.includes('blocks')) {
      console.log('\nSHEKVETILI blocks table:');
      const [cols] = await connection.execute('DESCRIBE blocks');
      cols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`));
    }
    
    if (krtsanisiTables.includes('krtsanisi_blocks')) {
      console.log('\nKRTSANISI blocks table:');
      const [cols] = await connection.execute('DESCRIBE krtsanisi_blocks');
      cols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`));
    }
    
    // Get sample data counts
    console.log('\n=== DATA COUNTS ===\n');
    
    for (const table of [...shekvetiliTables, ...krtsanisiTables]) {
      try {
        const [count] = await connection.execute(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`${table}: ${count[0].count} records`);
      } catch (e) {
        console.log(`${table}: Error counting records`);
      }
    }
    
  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await connection.end();
  }
}

analyzeDatabase();