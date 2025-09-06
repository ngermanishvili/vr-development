const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function extractKrtsanisiData() {
    const browser = await chromium.launch({ 
        headless: false, // Keep visible for debugging
        timeout: 60000 
    });
    const page = await browser.newPage();
    
    // Set longer timeout for page operations
    page.setDefaultTimeout(60000);
    
    console.log('🎯 Starting Krtsanisi data extraction...');
    
    // Step 1: Visit portfolio page and extract building URLs
    console.log('📍 Visiting portfolio page...');
    await page.goto('https://vr.ge/portfolio/buildings/?id=6', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    
    // Wait for page to be ready
    await page.waitForTimeout(3000);
    
    // Extract all building links
    const buildingLinks = await page.evaluate(() => {
        const links = [];
        // Look for building links - adjust selector based on actual page structure
        const buildingElements = document.querySelectorAll('area[href*="building.php"]');
        buildingElements.forEach(element => {
            const href = element.getAttribute('href');
            const coords = element.getAttribute('coords');
            if (href && coords) {
                links.push({
                    url: href.startsWith('http') ? href : `https://vr.ge/portfolio/buildings/${href}`,
                    coords: coords,
                    title: element.getAttribute('title') || element.getAttribute('alt') || ''
                });
            }
        });
        
        // Also check for JavaScript-based links
        const jsLinks = document.querySelectorAll('a[href*="building.php"]');
        jsLinks.forEach(element => {
            const href = element.getAttribute('href');
            if (href) {
                links.push({
                    url: href.startsWith('http') ? href : `https://vr.ge/portfolio/buildings/${href}`,
                    coords: '',
                    title: element.textContent.trim()
                });
            }
        });
        
        return links;
    });
    
    console.log(`🏢 Found ${buildingLinks.length} building links`);
    buildingLinks.forEach((link, i) => console.log(`${i+1}. ${link.title} - ${link.url}`));
    
    const allData = {
        buildings: [],
        floors: [],
        coordinates: []
    };
    
    // Step 2: Visit each building page
    for (let i = 0; i < buildingLinks.length; i++) {
        const buildingLink = buildingLinks[i];
        console.log(`\n🏗️ Processing building ${i+1}/${buildingLinks.length}: ${buildingLink.title}`);
        
        try {
            await page.goto(buildingLink.url, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });
            await page.waitForTimeout(2000);
            
            // Extract building info and floor data
            const buildingData = await page.evaluate(() => {
                const data = {
                    title: document.title || '',
                    buildingImage: '',
                    floors: [],
                    coordinates: []
                };
                
                // Find main building image
                const mainImg = document.querySelector('img[src*="uploads/images"]');
                if (mainImg) {
                    data.buildingImage = mainImg.src;
                }
                
                // Extract floor links
                const floorElements = document.querySelectorAll('a[href*="floor.php"], area[href*="floor.php"]');
                floorElements.forEach(element => {
                    const href = element.getAttribute('href');
                    const coords = element.getAttribute('coords');
                    const title = element.getAttribute('title') || element.textContent.trim();
                    
                    if (href) {
                        data.floors.push({
                            url: href.startsWith('http') ? href : `https://vr.ge/portfolio/buildings/${href}`,
                            coords: coords || '',
                            title: title,
                            floorNumber: title.match(/\\d+/) ? title.match(/\\d+/)[0] : ''
                        });
                    }
                });
                
                // Look for image map coordinates
                const areas = document.querySelectorAll('area[coords]');
                areas.forEach(area => {
                    data.coordinates.push({
                        coords: area.getAttribute('coords'),
                        title: area.getAttribute('title') || area.getAttribute('alt') || '',
                        href: area.getAttribute('href') || ''
                    });
                });
                
                return data;
            });
            
            // Extract building ID from URL
            const buildingIdMatch = buildingLink.url.match(/b_id=(\\d+)/);
            const buildingId = buildingIdMatch ? buildingIdMatch[1] : `unknown_${i}`;
            
            console.log(`  📊 Found ${buildingData.floors.length} floors`);
            console.log(`  🎯 Found ${buildingData.coordinates.length} coordinate areas`);
            
            allData.buildings.push({
                id: buildingId,
                title: buildingData.title,
                url: buildingLink.url,
                image: buildingData.buildingImage,
                buildingCoords: buildingLink.coords,
                floors: buildingData.floors,
                coordinates: buildingData.coordinates
            });
            
            // Step 3: Visit each floor page for this building
            for (let j = 0; j < buildingData.floors.length; j++) {
                const floorData = buildingData.floors[j];
                console.log(`    🌊 Processing floor ${j+1}/${buildingData.floors.length}: ${floorData.title}`);
                
                try {
                    await page.goto(floorData.url, {
                        waitUntil: 'domcontentloaded',
                        timeout: 30000
                    });
                    await page.waitForTimeout(1500);
                    
                    // Extract floor plan image and apartment data
                    const floorDetails = await page.evaluate(() => {
                        const details = {
                            floorImage: '',
                            apartments: [],
                            coordinates: []
                        };
                        
                        // Find main floor plan image
                        const floorImg = document.querySelector('img[src*="uploads/images"]:not([src*="nophoto"])');
                        if (floorImg) {
                            details.floorImage = floorImg.src;
                        }
                        
                        // Extract apartment coordinates
                        const apartmentAreas = document.querySelectorAll('area[coords]');
                        apartmentAreas.forEach(area => {
                            details.coordinates.push({
                                coords: area.getAttribute('coords'),
                                title: area.getAttribute('title') || area.getAttribute('alt') || '',
                                href: area.getAttribute('href') || ''
                            });
                        });
                        
                        // Look for apartment listings
                        const apartmentElements = document.querySelectorAll('[class*="apartment"], [id*="apartment"]');
                        apartmentElements.forEach(element => {
                            const apartmentText = element.textContent || '';
                            const apartmentMatch = apartmentText.match(/apartment\\s*(\\d+)/i);
                            if (apartmentMatch) {
                                details.apartments.push({
                                    number: apartmentMatch[1],
                                    text: apartmentText.trim()
                                });
                            }
                        });
                        
                        return details;
                    });
                    
                    // Extract floor ID from URL
                    const floorIdMatch = floorData.url.match(/f_id=(\\d+)/);
                    const floorId = floorIdMatch ? floorIdMatch[1] : `unknown_${j}`;
                    
                    allData.floors.push({
                        buildingId: buildingId,
                        floorId: floorId,
                        floorNumber: floorData.floorNumber,
                        title: floorData.title,
                        url: floorData.url,
                        image: floorDetails.floorImage,
                        floorCoords: floorData.coords,
                        apartments: floorDetails.apartments,
                        coordinates: floorDetails.coordinates
                    });
                    
                    console.log(`      🎯 Found ${floorDetails.coordinates.length} apartment coordinates`);
                    
                } catch (error) {
                    console.error(`    ❌ Error processing floor ${floorData.title}:`, error.message);
                }
                
                // Small delay between requests
                await page.waitForTimeout(500);
            }
            
        } catch (error) {
            console.error(`❌ Error processing building ${buildingLink.title}:`, error.message);
        }
        
        // Delay between buildings
        await page.waitForTimeout(1000);
    }
    
    await browser.close();
    
    // Step 4: Save all extracted data
    console.log('\\n💾 Saving extracted data...');
    
    const outputPath = '/Users/samxara/VR/vr-development/public/krtsanisi/data';
    await fs.mkdir(outputPath, { recursive: true });
    
    await fs.writeFile(
        path.join(outputPath, 'extracted_data.json'), 
        JSON.stringify(allData, null, 2)
    );
    
    console.log(`\\n✅ Extraction complete!`);
    console.log(`📊 Buildings processed: ${allData.buildings.length}`);
    console.log(`🌊 Floors processed: ${allData.floors.length}`);
    console.log(`💾 Data saved to: ${outputPath}/extracted_data.json`);
    
    return allData;
}

// Run the extraction
extractKrtsanisiData().catch(console.error);