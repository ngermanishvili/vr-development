const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

async function downloadImage(url, filepath) {
    const protocol = url.startsWith('https') ? https : http;
    
    return new Promise((resolve, reject) => {
        const file = require('fs').createWriteStream(filepath);
        protocol.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', reject);
    });
}

async function downloadFloorImages() {
    console.log('📥 Starting floor image downloads...');
    
    // Read the extracted data
    const dataPath = '/Users/samxara/VR/vr-development/public/krtsanisi/data/extracted_data.json';
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    
    const outputDir = '/Users/samxara/VR/vr-development/public/krtsanisi/floors';
    await fs.mkdir(outputDir, { recursive: true });
    
    let downloadCount = 0;
    let errorCount = 0;
    const downloadLog = [];
    
    // Process each floor
    for (const floor of data.floors) {
        if (!floor.image) {
            console.log(`⚠️ No image for floor ${floor.floorId} (${floor.title})`);
            continue;
        }
        
        // Find the building for this floor
        const building = data.buildings.find(b => b.id === floor.buildingId);
        if (!building) {
            console.log(`⚠️ Building not found for floor ${floor.floorId}`);
            continue;
        }
        
        // Extract building name for filename
        const buildingName = building.title.match(/\\d+\\s*-\\s*\\d+/) || 
                           building.title.match(/\\d+/) ||
                           [building.id];
        
        // Create filename with proper naming convention
        const floorNumber = floor.floorNumber || floor.title.match(/\\d+/)?.[0] || floor.floorId;
        const filename = `building_${floor.buildingId}_floor_${floorNumber}_id_${floor.floorId}.jpg`;
        const filepath = path.join(outputDir, filename);
        
        try {
            console.log(`📥 Downloading: ${filename}`);
            await downloadImage(floor.image, filepath);
            downloadCount++;
            
            downloadLog.push({
                success: true,
                filename: filename,
                floorId: floor.floorId,
                buildingId: floor.buildingId,
                floorTitle: floor.title,
                imageUrl: floor.image,
                coordinates: floor.coordinates
            });
        } catch (error) {
            console.error(`❌ Failed to download ${filename}:`, error.message);
            errorCount++;
            
            downloadLog.push({
                success: false,
                filename: filename,
                floorId: floor.floorId,
                error: error.message
            });
        }
    }
    
    // Save download log
    await fs.writeFile(
        path.join(outputDir, '../data/download_log.json'),
        JSON.stringify(downloadLog, null, 2)
    );
    
    console.log(`\n✅ Download complete!`);
    console.log(`📊 Successfully downloaded: ${downloadCount} images`);
    console.log(`❌ Failed downloads: ${errorCount}`);
    console.log(`💾 Images saved to: ${outputDir}`);
    
    // Create summary of floor coordinates for database update
    const floorCoordinates = data.floors
        .filter(f => f.coordinates && f.coordinates.length > 0)
        .map(f => ({
            floorId: f.floorId,
            buildingId: f.buildingId,
            floorNumber: f.floorNumber,
            title: f.title,
            coordinateCount: f.coordinates.length,
            coordinates: f.coordinates
        }));
    
    await fs.writeFile(
        path.join(outputDir, '../data/floor_coordinates.json'),
        JSON.stringify(floorCoordinates, null, 2)
    );
    
    console.log(`📊 Floor coordinates saved for ${floorCoordinates.length} floors`);
}

// Run the download
downloadFloorImages().catch(console.error);