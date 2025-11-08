const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = ['app/claim', 'app/get-help', 'app/pricing', 'app/locations/new-farm', 'app/locations/toowong', 'app/locations/karalee', 'app/locations/brookwater', 'app/locations/springfield-lakes'];
dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

console.log('All directories created successfully');
