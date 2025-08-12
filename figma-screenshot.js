const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  try {
    // Navigate to Figma
    await page.goto('https://www.figma.com/design/m0s6sY4niib1JEDzX4CQA9/Untitled?node-id=82-605&m=dev&t=EOfSYMG8AcavoLFF-1');
    
    // Wait for page to load
    await page.waitForTimeout(5000);
    
    // Take screenshot
    await page.screenshot({ path: 'figma-design.png', fullPage: true });
    
    console.log('Screenshot saved as figma-design.png');
  } catch (error) {
    console.error('Error:', error);
  }
  
  await browser.close();
})();