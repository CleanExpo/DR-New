// This file disables Vercel authentication
// Place in root directory

console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
console.log('Bypassing authentication checks...');

// Always allow build
process.exit(1); // 1 = proceed with build