const fs = require('fs');
const report = {
  meta: {
    reportType: "Competitor Analysis",
    location: "Logan",
    generatedDate: "2025-11-09",
    totalCompetitors: 5
  },
  competitors: [
    {
      rank: 1,
      name: "South QLD Restoration",
      website: "southqldrestoration.com.au",
      reviews: { google: 125, rating: 4.8 },
      strengths: ["30+ years experience", "125 reviews", "Multiple Logan pages"],
      weaknesses: ["No Master certification", "Slow response time"]
    },
    {
      rank: 2,
      name: "Emergency Damage Restoration",
      website: "emergencydamagerestoration.com.au",
      reviews: { total: "237+", rating: 4.9 },
      strengths: ["Highest reviews", "Extensive Logan coverage"],
      weaknesses: ["No certifications", "Generic branding"]
    },
    {
      rank: 3,
      name: "Disaster Recovery Brisbane",
      website: "disasterrecovery.com.au",
      certifications: ["IICRC Master Restorer"],
      strengths: ["Only Master Restorer", "60-90 min response", "Direct insurance billing"],
      weaknesses: ["No GMB", "No reviews", "No case studies"]
    }
  ]
};

fs.writeFileSync('competitor-analysis-logan.json', JSON.stringify(report, null, 2));
console.log('Report created');
