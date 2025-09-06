const fs = require('fs').promises;
const path = require('path');

async function fixFloorNaming() {
    console.log('🔧 Fixing floor image naming...');
    
    // Read the extracted data
    const dataPath = '/Users/samxara/VR/vr-development/public/krtsanisi/data/extracted_data.json';
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    
    const floorsDir = '/Users/samxara/VR/vr-development/public/krtsanisi/floors';
    const files = await fs.readdir(floorsDir);
    
    let renameCount = 0;
    const renameLog = [];
    
    // Process each floor
    for (let i = 0; i < data.floors.length; i++) {
        const floor = data.floors[i];
        
        // Extract actual building ID and floor ID from URL
        const buildingIdMatch = floor.url.match(/b_id=(\d+)/);
        const floorIdMatch = floor.url.match(/f_id=(\d+)/);
        
        const actualBuildingId = buildingIdMatch ? buildingIdMatch[1] : floor.buildingId;
        const actualFloorId = floorIdMatch ? floorIdMatch[1] : floor.floorId;
        
        // Extract floor number from title
        const floorNumber = floor.title.match(/\d+/) ? floor.title.match(/\d+/)[0] : 
                          (floor.title.includes('პარკინგი') ? '-1' : '0');
        
        // Old and new filenames
        const oldFilename = `building_unknown_${i < 16 ? '0' : i < 32 ? '1' : i < 48 ? '2' : i < 64 ? '3' : i < 68 ? '4' : i < 86 ? '5' : '6'}_floor_unknown_${i % 16 < 18 ? i % 16 : i % 18}_id_unknown_${i % 16 < 18 ? i % 16 : i % 18}.jpg`;
        const newFilename = `building_${actualBuildingId}_floor_${floorNumber}_id_${actualFloorId}.jpg`;
        
        const oldPath = path.join(floorsDir, oldFilename);
        const newPath = path.join(floorsDir, newFilename);
        
        try {
            // Check if old file exists
            await fs.access(oldPath);
            
            // Rename the file
            await fs.rename(oldPath, newPath);
            console.log(`✅ Renamed: ${oldFilename} → ${newFilename}`);
            renameCount++;
            
            renameLog.push({
                success: true,
                oldFilename,
                newFilename,
                buildingId: actualBuildingId,
                floorId: actualFloorId,
                floorNumber,
                floorTitle: floor.title,
                url: floor.url
            });
        } catch (error) {
            console.error(`❌ Failed to rename ${oldFilename}:`, error.message);
            renameLog.push({
                success: false,
                oldFilename,
                error: error.message
            });
        }
    }
    
    // Save rename log
    await fs.writeFile(
        path.join(floorsDir, '../data/rename_log.json'),
        JSON.stringify(renameLog, null, 2)
    );
    
    console.log(`\n✅ Renaming complete!`);
    console.log(`📊 Successfully renamed: ${renameCount} files`);
    
    // Create SQL update statements for database
    const sqlStatements = [];
    const coordinatesData = [];
    
    for (const floor of data.floors) {
        const buildingIdMatch = floor.url.match(/b_id=(\d+)/);
        const floorIdMatch = floor.url.match(/f_id=(\d+)/);
        
        if (floorIdMatch && floor.coordinates.length > 0) {
            const floorId = floorIdMatch[1];
            
            // Extract all apartment coordinates
            const coords = floor.coordinates.map(c => c.coords).join('|');
            
            sqlStatements.push(
                `UPDATE krtsanisi_floors SET coords = '${coords}' WHERE floor_id = '${floorId}';`
            );
            
            coordinatesData.push({
                floorId,
                buildingId: buildingIdMatch ? buildingIdMatch[1] : null,
                floorTitle: floor.title,
                coordinateCount: floor.coordinates.length,
                coordinates: floor.coordinates
            });
        }
    }
    
    // Save SQL update file
    await fs.writeFile(
        path.join(floorsDir, '../data/update_floor_coords.sql'),
        sqlStatements.join('\n')
    );
    
    // Save coordinates summary
    await fs.writeFile(
        path.join(floorsDir, '../data/floor_coordinates_final.json'),
        JSON.stringify(coordinatesData, null, 2)
    );
    
    console.log(`💾 SQL update statements saved: ${sqlStatements.length} floors with coordinates`);
    console.log(`📊 Coordinates data saved for database import`);
}

// Run the fix
fixFloorNaming().catch(console.error);