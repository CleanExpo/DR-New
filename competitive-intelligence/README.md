# DR-New Competitive Intelligence System

## Overview
Comprehensive competitive intelligence monitoring system for tracking disaster recovery competitors in Brisbane, Ipswich, and Logan markets. This system provides automated monitoring, alerting, and reporting to maintain competitive advantage.

## Key Features

### 1. Competitor Website Monitoring
- Real-time tracking of 6 key competitors
- Content change detection
- Promotion and offer alerts
- Response time claim tracking
- Technical website monitoring

### 2. SEO Ranking Tracker
- Monitor rankings for 15+ critical keywords
- Track competitor position changes
- Identify ranking opportunities
- Detect new SERP competitors
- Historical trend analysis

### 3. Content Gap Analysis
- Identify missing content topics
- Discover underserved keywords
- Analyze competitor content depth
- Generate content recommendations

### 4. Alert System
- High/Medium/Low priority alerts
- Real-time notifications for critical changes
- Competitor promotion detection
- Ranking drop warnings
- New competitor alerts

### 5. Comprehensive Reporting
- Weekly intelligence reports
- Executive summaries
- Actionable recommendations
- Performance metrics
- HTML and JSON formats

## Monitored Competitors
1. **Steamatic Brisbane** - Major franchise competitor
2. **NLR Restorations** - Local market leader
3. **Reztor Restoration** - Growing competitor
4. **MetroDry Restoration** - Specialized water damage
5. **MouldMen Brisbane** - Mould specialist
6. **Disaster Recovery QLD** - Direct competitor

## Installation

```bash
# Navigate to the competitive intelligence directory
cd "D:/DR New/competitive-intelligence"

# Install dependencies
npm install

# Verify installation
npm run help
```

## Usage

### Daily Monitoring
Run comprehensive daily monitoring sweep:
```bash
npm run monitor:daily
```

### Quick Check
Quick check of high-priority competitors:
```bash
npm run monitor:quick
```

### Continuous Monitoring
Run continuous monitoring (checks every 60 minutes):
```bash
npm run monitor:continuous
```

### Generate Reports

Weekly intelligence report:
```bash
npm run report:weekly
```

SEO performance report:
```bash
npm run report:seo
```

Content gap analysis:
```bash
npm run report:content
```

Alert summary:
```bash
npm run report:alerts
```

Comprehensive report:
```bash
npm run report:full
```

### View Dashboard
Open the competitive intelligence dashboard:
```bash
npm run dashboard
```

## Directory Structure

```
competitive-intelligence/
├── config/
│   ├── competitors.json      # Competitor configuration
│   └── alert-rules.json      # Alert thresholds
├── scripts/
│   ├── competitor-monitor.js # Website monitoring
│   ├── seo-ranking-tracker.js # SEO tracking
│   ├── content-gap-analyzer.js # Content analysis
│   ├── alert-system.js       # Alert processing
│   └── report-generator.js   # Report generation
├── data/
│   ├── seo/                  # SEO tracking data
│   └── content-gaps/         # Content analysis data
├── reports/
│   ├── weekly/              # Weekly reports
│   ├── alerts/              # Alert logs
│   └── executive/           # Executive summaries
├── dashboards/
│   └── index.html           # Web dashboard
├── logs/                    # System logs
├── run-monitoring.js        # Main orchestrator
└── package.json            # Node configuration
```

## Key Metrics Tracked

### SEO Metrics
- Keyword rankings (position tracking)
- Search visibility score
- Competitor ranking comparison
- Content gap identification
- Opportunity scoring

### Competitive Metrics
- Website change frequency
- Promotion activity
- Response time claims
- Service expansion
- Certification updates

### Business Intelligence
- Market position analysis
- Threat level assessment
- Opportunity identification
- Strategic recommendations

## Alert Priority Levels

### High Priority (Immediate Action)
- New competitor promotions
- Significant ranking drops (5+ positions)
- New market entrants
- Aggressive pricing changes

### Medium Priority (24-48 hours)
- Content updates by competitors
- Minor ranking changes
- New certifications/awards
- Service expansions

### Low Priority (Weekly Review)
- Website technical issues
- Social media activity
- Minor content changes
- Review response patterns

## Customization

### Adding Competitors
Edit `config/competitors.json`:
```json
{
  "name": "New Competitor",
  "website": "https://example.com",
  "monitoring": {
    "priority": "high",
    "checkFrequency": "daily"
  }
}
```

### Modifying Keywords
Update target keywords in `config/competitors.json`:
```json
"targetKeywords": [
  "water damage restoration brisbane",
  "new keyword here"
]
```

### Adjusting Alert Rules
Edit `config/alert-rules.json` to modify thresholds.

## Best Practices

1. **Daily Monitoring**: Run daily checks at consistent times
2. **Weekly Reviews**: Review weekly reports every Friday
3. **Alert Response**: Address high-priority alerts within 24 hours
4. **Content Planning**: Use gap analysis for content calendar
5. **SEO Optimization**: Focus on low-competition opportunities

## Troubleshooting

### Common Issues

**No data appearing:**
- Ensure Node.js is installed (v14+)
- Check internet connection
- Verify competitor websites are accessible

**Alerts not triggering:**
- Review alert-rules.json configuration
- Check threshold settings
- Verify monitoring is running

**Reports not generating:**
- Ensure data directory has content
- Check write permissions
- Verify sufficient disk space

## Support

For issues or questions:
1. Check logs in `logs/` directory
2. Review error messages in console
3. Verify configuration files
4. Run diagnostic: `npm run help`

## Security & Privacy

- Only monitors publicly available information
- Respects robots.txt
- No personal data collection
- Complies with ethical monitoring standards
- Rate-limited to avoid server overload

## Future Enhancements

Planned improvements:
- Google My Business monitoring
- Social media sentiment analysis
- Automated competitor ad tracking
- Review monitoring integration
- AI-powered insight generation
- Slack/email notifications
- API integration for SEO tools

## License

Private and confidential. For DR-New internal use only.

---

**Version:** 1.0.0
**Last Updated:** September 2024
**Maintained by:** DR-New Competitive Intelligence Team