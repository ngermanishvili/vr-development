const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Playwright test for building block switching...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to the floor page
    console.log('📍 Navigating to floor page B1/2...');
    await page.goto('http://localhost:3001/floor/B1/2', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Check initial URL
    console.log('🔗 Current URL:', page.url());

    // Find and click on a different building block (B2)
    console.log('🏢 Looking for building block buttons...');
    const buildingButtons = await page.locator('[data-testid="building-button"], button:has-text("B2"), button:has-text("C1")').all();
    
    if (buildingButtons.length === 0) {
      // Try alternative selectors
      const alternativeButtons = await page.locator('button').all();
      for (const button of alternativeButtons) {
        const text = await button.textContent();
        if (text && (text.includes('B2') || text.includes('C1'))) {
          console.log(`🎯 Found building button: ${text}`);
          await button.click();
          await page.waitForTimeout(1000);
          console.log('🔗 URL after click:', page.url());
          break;
        }
      }
    } else {
      console.log(`🎯 Found ${buildingButtons.length} building buttons`);
      await buildingButtons[0].click();
      await page.waitForTimeout(1000);
      console.log('🔗 URL after click:', page.url());
    }

    // Check if image src changed
    console.log('🖼️ Checking if floor plan image updated...');
    const floorImage = await page.locator('img[alt*="Floor"][alt*="plan"]').first();
    if (await floorImage.isVisible()) {
      const imageSrc = await floorImage.getAttribute('src');
      console.log('📷 Current floor plan image:', imageSrc);
    }

    // Test floor number changes
    console.log('🏗️ Testing floor number switching...');
    const floorButtons = await page.locator('[class*="floor"], button:has-text("3"), button:has-text("4")').all();
    
    if (floorButtons.length > 0) {
      console.log(`🎯 Found ${floorButtons.length} floor buttons`);
      await floorButtons[0].click();
      await page.waitForTimeout(1000);
      console.log('🔗 URL after floor change:', page.url());
      
      const newImageSrc = await floorImage.getAttribute('src');
      console.log('📷 Floor plan image after floor change:', newImageSrc);
    }

    // Check for any loading states
    const loadingElements = await page.locator('text="loading", text="Loading", [class*="loading"]').all();
    if (loadingElements.length > 0) {
      console.log('⚠️  Found loading elements:', loadingElements.length);
      for (const element of loadingElements) {
        const text = await element.textContent();
        console.log('📝 Loading text:', text);
      }
    } else {
      console.log('✅ No loading states detected - good!');
    }

    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }

  await page.waitForTimeout(3000); // Keep browser open for manual inspection
  await browser.close();
})();