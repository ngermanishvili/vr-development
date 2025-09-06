const fs = require('fs').promises;
const path = require('path');

async function fixFloorNamingCorrectly() {
    console.log('🔧 Fixing floor naming with correct convention...');
    
    // Read the extracted data
    const dataPath = '/Users/samxara/VR/vr-development/public/krtsanisi/data/extracted_data.json';
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    
    const floorsDir = '/Users/samxara/VR/vr-development/public/krtsanisi/floors';
    
    // Get all current files
    const files = await fs.readdir(floorsDir);
    
    // First, let's understand the building groupings from the URLs
    const buildingMappings = {
        '10': '18-21',   // Building 10 contains buildings 18, 19, 20, 21
        '11': '22-25',   // Building 11 contains buildings 22, 23, 24, 25
        '283': '14-17',  // Building 283 contains buildings 14, 15, 16, 17
        '288': '10-13',  // Building 288 contains buildings 10, 11, 12, 13
        '289': 'phase3', // Building 289 is phase 3
        '435': '26-30',  // Building 435 contains buildings 26, 27, 28, 29, 30
        '2212': '31-35', // Building 2212 contains buildings 31, 32, 33, 34, 35
    };
    
    let renameCount = 0;
    const renameOperations = [];
    
    // Process each floor from the data
    for (const floor of data.floors) {
        // Extract building ID and floor info from URL
        const buildingIdMatch = floor.url.match(/b_id=(\d+)/);
        const floorIdMatch = floor.url.match(/f_id=(\d+)/);
        const floorTitleMatch = floor.url.match(/f_title=([^&]+)/);
        
        if (!buildingIdMatch || !floorIdMatch) continue;
        
        const buildingId = buildingIdMatch[1];
        const floorId = floorIdMatch[1];
        let floorNumber = floorTitleMatch ? decodeURIComponent(floorTitleMatch[1]) : '';
        
        // Clean up floor number (remove non-numeric characters except for negative)
        if (floor.title.includes('პარკინგი') || floorNumber.includes('-1')) {
            floorNumber = 'parking_minus1';
        } else if (floorNumber === '0' || floor.title.includes('0')) {
            floorNumber = '0';
        } else {
            // Extract just the number from the floor title
            const numMatch = floorNumber.match(/\d+/);
            floorNumber = numMatch ? numMatch[0] : floorNumber;
        }
        
        // Get the building group name
        const buildingGroup = buildingMappings[buildingId] || buildingId;
        
        // Find the current filename (try multiple patterns)
        let currentFile = null;
        
        // Pattern 1: building_{id}_floor_{number}_id_{floorId}.jpg
        let possibleFile = `building_${buildingId}_floor_${floorNumber}_id_${floorId}.jpg`;
        if (files.includes(possibleFile)) {
            currentFile = possibleFile;
        }
        
        // Pattern 2: Try with floor title number
        if (!currentFile && floor.title) {
            const titleNum = floor.title.match(/\d+/);
            if (titleNum) {
                possibleFile = `building_${buildingId}_floor_${titleNum[0]}_id_${floorId}.jpg`;
                if (files.includes(possibleFile)) {
                    currentFile = possibleFile;
                }
            }
        }
        
        // Pattern 3: Check for floor_0 variants
        if (!currentFile) {
            possibleFile = `building_${buildingId}_floor_0_id_${floorId}.jpg`;
            if (files.includes(possibleFile)) {
                currentFile = possibleFile;
            }
        }
        
        if (currentFile) {
            // Create new filename with proper naming convention
            const newFilename = `buildings_${buildingGroup}_floor_${floorNumber}_fid_${floorId}.jpg`;
            
            renameOperations.push({
                old: currentFile,
                new: newFilename,
                buildingId,
                buildingGroup,
                floorNumber,
                floorId,
                floorTitle: floor.title,
                url: floor.url
            });
        }
    }
    
    // Execute all rename operations
    for (const op of renameOperations) {
        const oldPath = path.join(floorsDir, op.old);
        const newPath = path.join(floorsDir, op.new);
        
        try {
            await fs.rename(oldPath, newPath);
            console.log(`✅ ${op.old} → ${op.new}`);
            renameCount++;
        } catch (error) {
            console.error(`❌ Failed to rename ${op.old}: ${error.message}`);
        }
    }
    
    // Save the rename log
    await fs.writeFile(
        path.join(floorsDir, '../data/final_naming_log.json'),
        JSON.stringify(renameOperations, null, 2)
    );
    
    console.log(`\n✅ Renaming complete!`);
    console.log(`📊 Successfully renamed: ${renameCount} files`);
    console.log(`📝 Naming convention: buildings_{GROUP}_floor_{NUMBER}_fid_{FLOOR_ID}.jpg`);
    console.log(`\nBuilding Groups:`);
    Object.entries(buildingMappings).forEach(([id, group]) => {
        console.log(`  Building ${id} = Buildings ${group}`);
    });
}

// Run the fix
fixFloorNamingCorrectly().catch(console.error);