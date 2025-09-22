// Health check script for all pages
const pagesToTest = [
  "/",
  "/about",
  "/services",
  "/services/water-damage",
  "/services/fire-damage",
  "/services/mould-remediation",
  "/services/commercial",
  "/contact",
  "/demo/workflow",
  "/demo/forms",
  "/pitch",
  "/pitch/investor",
  "/pitch/client",
  "/pitch/contractor",
  "/emergency",
  "/emergency-guide",
  "/insurance",
  "/technology",
  "/technology/ai",
  "/technology/thermal",
  "/technology/hepa",
  "/contractor-portal",
  "/client-portal",
  "/book-service",
  "/why-first",
  "/faq",
  "/privacy",
  "/terms"
];

const results = [];

async function testPage(path) {
  const baseUrl = "https://dr-new-ten.vercel.app";
  const url = baseUrl + path;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const status = response.status;
    
    return {
      path,
      url,
      status,
      ok: status >= 200 && status < 400,
      error: status >= 400 ? `HTTP ${status}` : null
    };
  } catch (error) {
    return {
      path,
      url,
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

// Test all pages
Promise.all(pagesToTest.map(testPage)).then(results => {
  const healthy = results.filter(r => r.ok);
  const broken = results.filter(r => !r.ok);
  
  console.log("HEALTH CHECK RESULTS");
  console.log("====================");
  console.log(`Total pages tested: ${results.length}`);
  console.log(`Healthy pages: ${healthy.length}`);
  console.log(`Broken pages: ${broken.length}`);
  
  if (broken.length > 0) {
    console.log("\nBROKEN PAGES:");
    broken.forEach(page => {
      console.log(`  ${page.path} - ${page.error}`);
    });
  }
  
  return results;
});