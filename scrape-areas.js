const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://vr.ge/portfolio/buildings/floor.php?b_id=2617&b_title=%E1%83%91%E1%83%9A%E1%83%9D%E1%83%99%E1%83%98%20B1&f_id=2618&f_title=1', {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(3000);

  const areas = await page.evaluate(() => {
    const areaElements = document.querySelectorAll('area[shape="poly"][coords]');
    const results = [];
    
    areaElements.forEach((area, index) => {
      const coords = area.getAttribute('coords');
      const href = area.getAttribute('href');
      const aId = href ? href.match(/a_id=(\d+)/)?.[1] : null;
      
      results.push({
        index: index + 1,
        apartmentId: aId,
        coords: coords,
        coordsCount: coords ? coords.split(',').length / 2 : 0
      });
    });
    
    return results;
  });

  console.log(`Total area elements found: ${areas.length}\n`);
  
  areas.forEach(area => {
    console.log(`Area #${area.index}:`);
    console.log(`  Apartment ID: ${area.apartmentId}`);
    console.log(`  Coordinates: ${area.coords}`);
    console.log(`  Number of coordinate pairs: ${area.coordsCount}`);
    console.log('---');
  });

  await browser.close();
})();