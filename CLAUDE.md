# CLAUDE.md - Quick Click Reviews Landing Page

This repository contains the main marketing landing page for quickclickreviews.us

## Project Context
Quick Click Reviews is a live production service that helps businesses get more Google reviews by:
1. Detecting satisfied customers from Gmail conversations using AI
2. Generating personalized review drafts
3. Making it effortless for customers to leave reviews (copy & paste)

The main application is deployed at:
- Dashboard: https://dashboard.quickclickreviews.us (for businesses)
- Review Pages: https://review.quickclickreviews.us (for customers)

This landing page will live at https://quickclickreviews.us to explain the service.

## Deployment
Using GitHub Pages (free, simple, fast):
1. Static HTML/CSS/JS in repository
2. CNAME file pointing to quickclickreviews.us
3. DNS configured to point to GitHub Pages servers

## Design Philosophy
- **Minimal and modern**: Clean, uncluttered, lots of whitespace
- **One core message**: We lower the "activation energy" for leaving reviews
- **Convenience is king**: Transform 5-minute task into 10-second action
- **Performance-first**: <200KB total, loads instantly

## Development
```bash
# Clone the repo
git clone [repo-url]
cd quick-click-landing

# For local development (if using simple HTML)
python3 -m http.server 8000
# or
npx serve

# Deploy (just push to main)
git add .
git commit -m "Update landing page"
git push origin main
```

## Current Status
- Project initialized: November 10, 2025
- Planning phase (see LANDING_PLAN.md)
- Next step: Build minimal HTML/CSS implementation

## Tech Stack Decision
Keeping it simple:
- Pure HTML/CSS (no framework)
- Minimal vanilla JavaScript if needed
- No build process
- GitHub Pages for hosting

## Related Repositories
- Main application: https://github.com/adsorce/quick-click-reviews