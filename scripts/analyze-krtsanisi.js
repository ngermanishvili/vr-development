import mysql from 'mysql2/promise';

async function analyzeKrtsanisi() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'shekvetili_apartments',
    port: process.env.DB_PORT || 3306
  });

  try {
    console.log('=== KRTSANISI TABLE STRUCTURES ===\n');
    
    // krtsanisi_projects structure
    console.log('krtsanisi_projects:');
    const [projectCols] = await connection.execute('DESCRIBE krtsanisi_projects');
    projectCols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''}`));
    
    // krtsanisi_buildings structure
    console.log('\nkrtsanisi_buildings:');
    const [buildingCols] = await connection.execute('DESCRIBE krtsanisi_buildings');
    buildingCols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''}`));
    
    // krtsanisi_blocks structure (already shown)
    console.log('\nkrtsanisi_blocks:');
    const [blockCols] = await connection.execute('DESCRIBE krtsanisi_blocks');
    blockCols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''}`));
    
    // krtsanisi_portfolio_polygons structure
    console.log('\nkrtsanisi_portfolio_polygons:');
    const [polyCols] = await connection.execute('DESCRIBE krtsanisi_portfolio_polygons');
    polyCols.forEach(col => console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''}`));
    
    // Sample data from each table
    console.log('\n=== SAMPLE DATA ===\n');
    
    console.log('krtsanisi_projects sample:');
    const [projects] = await connection.execute('SELECT * FROM krtsanisi_projects LIMIT 2');
    console.log(projects);
    
    console.log('\nkrtsanisi_buildings sample (first 3):');
    const [buildings] = await connection.execute('SELECT id, project_id, building_id, building_name FROM krtsanisi_buildings LIMIT 3');
    console.log(buildings);
    
    console.log('\nkrtsanisi_blocks sample (first 3):');
    const [blocks] = await connection.execute('SELECT id, building_id, block_number, block_name FROM krtsanisi_blocks LIMIT 3');
    console.log(blocks);
    
    console.log('\nkrtsanisi_portfolio_polygons sample (first 2):');
    const [polygons] = await connection.execute('SELECT id, project_id, area_id, building_name, navigation_type FROM krtsanisi_portfolio_polygons LIMIT 2');
    console.log(polygons);
    
  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await connection.end();
  }
}

analyzeKrtsanisi();