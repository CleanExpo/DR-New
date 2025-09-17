# CLAUDE.local.md

This file contains local development configurations and overrides specific to this machine.
**NOT tracked in Git** - Add to .gitignore

---
**Version**: 1.0.0
**Last Updated**: January 2025
**Machine**: Windows Development Environment
**Purpose**: Local overrides and development-specific configurations

---

## 🚀 Local Development Status

### Current Sprint Focus
- [ ] SSL certificate configuration for production
- [ ] Complete remaining 8 service pages
- [ ] Performance optimization to achieve <2s load time
- [ ] Implement sticky mobile CTA
- [ ] Create location-specific landing pages

### Active Development Branches
- `main` - Production-ready code (45% complete)
- Feature branches should be created for major updates

## 💻 Local Environment Configuration

### Development URLs
- **Local Dev**: http://localhost:3000
- **Local Build**: http://localhost:3001 (production build test)
- **Staging**: Not yet configured
- **Production**: https://disasterrecovery.com.au (pending SSL)

### Local API Keys (Development Only)
```bash
# Create .env.local with these development values
OPENAI_API_KEY=your-dev-key-here
GOOGLE_MAPS_API_KEY=your-dev-key-here
GA_MEASUREMENT_ID=your-dev-id-here
```

### Windows-Specific Commands
```bash
# Clear Next.js cache on Windows
rmdir /s /q .next
rmdir /s /q node_modules\.cache

# Start all services
npm run dev

# Test production build locally
npm run build && npm run start

# Performance testing
npm run lighthouse
```

## 🛠️ Local Development Tools

### MCP Server Configuration
- **Config Location**: `.claude/mcp.json`
- **Status**: All MCP servers configured and working
- **Testing**: Use `test-all-mcps.bat` to verify

### Browser Testing
- **Primary**: Chrome (latest)
- **Secondary**: Edge, Firefox
- **Mobile**: Chrome DevTools mobile emulation

### Performance Monitoring
- **Lighthouse**: Run `npm run lighthouse` for reports
- **Bundle Analyzer**: `npm run build:analyze`
- **Custom Tests**: `scripts/performance-test.js`

## 🐛 Known Local Issues

### Windows-Specific
1. **Case Sensitivity**: Be careful with import paths
2. **Path Separators**: Use forward slashes in imports
3. **Line Endings**: Configure Git to use LF, not CRLF
4. **Node Version**: Ensure Node.js 18+ is installed

### Development Gotchas
1. **MCP Servers**: Must restart Claude after config changes
2. **Environment Variables**: Changes require dev server restart
3. **TypeScript**: Strict mode may show errors not in production
4. **Images**: Large images in public/ slow down builds

## 📝 Local Development Notes

### Recent Changes
- Company rebrand from "Disaster Recovery QLD" to "Disaster Recovery"
- Production domain will be disasterrecovery.com.au
- 45% of production checklist completed
- New NRPG initiative and education programs added

### Testing Checklist
Before pushing to main:
- [ ] Run `npm run build` successfully
- [ ] Test all forms and CTAs
- [ ] Verify mobile responsiveness
- [ ] Check page load performance (<3s locally)
- [ ] Validate SEO metadata
- [ ] Test emergency contact flows

### Local Database/Storage
- Currently no database (static site)
- Form submissions go to email (configured in production)
- Consider adding Supabase/Firebase for future features

## 🔐 Security Notes

### Sensitive Files (Never Commit)
- `.env.local` - Local environment variables
- `.env.production` - Production secrets
- `*.key` - SSL certificates
- API credentials
- Customer data exports

### Local Testing Accounts
- No user authentication currently implemented
- Admin features planned for future release

## 📊 Performance Benchmarks

### Local Targets
- **Dev Build Time**: <30 seconds
- **Production Build**: <2 minutes
- **Page Load (Dev)**: <3 seconds
- **Page Load (Prod Build)**: <2 seconds
- **Lighthouse Score**: 90+ (all categories)

### Current Performance
- **Homepage Load**: ~2.5s (needs optimization)
- **Lighthouse Performance**: 85 (target: 95+)
- **Bundle Size**: 450KB (target: <300KB)

## 🚧 Work in Progress

### Immediate Tasks
1. Complete SSL certificate setup for production
2. Finish 8 remaining service pages:
   - Water damage details
   - Fire restoration process
   - Mould remediation guide
   - Biohazard procedures
   - Storm damage response
   - Commercial services
   - Insurance claims
   - Emergency response

3. Create location landing pages for:
   - Brisbane CBD
   - Ipswich
   - Logan
   - Gold Coast
   - Sunshine Coast
   - Major suburbs (20+ pages)

### Future Enhancements
- Customer portal for claim tracking
- Real-time job status updates
- Online booking system
- Review collection automation
- Chat support enhancement
- Mobile app consideration

## 📱 Contact for Issues

### Development Team
- **Repository Issues**: Create GitHub issue
- **Urgent Issues**: Contact via company Slack
- **Production Issues**: Alert immediately

### Business Stakeholders
- **Phill McGurk**: Founder, technical requirements
- **Bronwyn McGurk**: Co-founder, business requirements

---

**Remember**: This file contains local development information only.
Do not commit sensitive data or production credentials.