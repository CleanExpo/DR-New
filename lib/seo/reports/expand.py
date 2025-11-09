import json

report = {
    "meta": {
        "reportType": "Competitor Analysis",
        "location": "Logan, QLD",
        "date": "2025-11-09",
        "competitors": 5
    },
    "summary": {
        "marketLeader": "South QLD Restoration (125 reviews, 4.8 rating)",
        "reviewLeader": "Emergency Damage (237+ reviews, 4.9 rating)",
        "credentialLeader": "Disaster Recovery Brisbane (IICRC Master Restorer)",
        "keyOpportunity": "Only Master Restorer in market - major differentiator",
        "criticalGap": "Google My Business required immediately"
    },
    "competitors": [
        {
            "rank": 1,
            "name": "South QLD Restoration",
            "website": "southqldrestoration.com.au",
            "reviews": 125,
            "rating": 4.8,
            "founded": 1993,
            "contact": "1300 762 021",
            "certifications": ["IICRC", "ACRA", "RIA"],
            "loganPages": 4,
            "strengths": ["30+ years experience", "125 reviews at 4.8", "Multiple Logan pages", "Family-owned"],
            "weaknesses": ["No Master certification", "Slow response time", "Diluted brand"]
        },
        {
            "rank": 2,
            "name": "Emergency Damage Restoration",
            "website": "emergencydamagerestoration.com.au",
            "reviews": 237,
            "rating": 4.9,
            "contact": "0488 525 275",
            "certifications": [],
            "loganPages": 5,
            "strengths": ["Highest reviews (237+)", "Best rating (4.9)", "Extensive Logan coverage"],
            "weaknesses": ["No certifications", "Vague response times", "Generic brand"]
        },
        {
            "rank": 3,
            "name": "Disaster Recovery Brisbane",
            "website": "disasterrecovery.com.au",
            "operator": "Phill McGurk",
            "contact": "1300 309 361",
            "reviews": 0,
            "certifications": ["IICRC Master Restorer", "IICRC WRT", "IICRC FSRT", "IICRC AMRT"],
            "responseTime": {"logan": "90 minutes"},
            "strengths": ["Only Master Restorer", "60-90 min response", "Direct insurance billing", "Strong SEO"],
            "weaknesses": ["No GMB", "No reviews", "No case studies", "No blog"]
        },
        {
            "rank": 4,
            "name": "AllAces",
            "website": "allaces.com.au",
            "yearsInBusiness": "35+",
            "strengths": ["35+ years", "Multi-state", "Government contracts"],
            "weaknesses": ["No Logan pages", "National focus", "Too corporate"]
        },
        {
            "rank": 5,
            "name": "Ever Ready Solutions",
            "website": "everreadysolutions.com.au",
            "strengths": ["Logan page", "Real estate focus"],
            "weaknesses": ["Limited content", "No IICRC", "No reviews"]
        }
    ],
    "keywordOpportunities": [
        {"keyword": "IICRC Master Restorer Logan", "difficulty": "Very Low", "opportunity": "Critical"},
        {"keyword": "water damage Shailer Park", "difficulty": "Low", "opportunity": "High"},
        {"keyword": "water damage Springwood", "difficulty": "Low", "opportunity": "High"},
        {"keyword": "commercial water damage Logan", "difficulty": "Low", "opportunity": "High"},
        {"keyword": "fire damage restoration Logan", "difficulty": "Medium", "opportunity": "High"}
    ],
    "contentGaps": [
        {"type": "Google My Business", "priority": "CRITICAL", "action": "Create today"},
        {"type": "Customer Reviews", "priority": "CRITICAL", "target": "50 in 90 days"},
        {"type": "Suburb Pages", "priority": "High", "missing": ["Springwood", "Shailer Park", "Woodridge"]},
        {"type": "Master Restorer Content", "priority": "High", "action": "Education page"},
        {"type": "Case Studies", "priority": "High", "target": "3-5 projects"}
    ],
    "actions": {
        "immediate": ["Create GMB listing", "Add 3 suburb pages", "Master Restorer content", "Schema markup", "Certification badges"],
        "shortTerm": ["Collect reviews (target 50)", "Expand FAQ", "Create case studies", "Insurance guide", "Citations"],
        "longTerm": ["Launch blog", "Video content", "Commercial division", "Complete suburb coverage"]
    },
    "strategy": {
        "positioning": "Premium certified provider - Master Restorer difference",
        "differentiators": ["Only Master Restorer in Logan", "60-90 min response", "Direct insurance billing", "Local expertise"],
        "winningFormula": ["Lead with credentials", "Build reviews to 100+", "Dominate local search", "Educate market", "Emphasize speed"]
    }
}

with open('competitor-analysis-logan.json', 'w') as f:
    json.dump(report, f, indent=2)

print("Report created successfully")
