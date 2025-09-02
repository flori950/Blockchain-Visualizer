# Deployment Fix Guide

## Issues Identified

The production site at `blockchain.florian-hunter.de` is showing 404 errors because it's serving an old version of the built assets. The current deployment has assets with old hashes that don't match the current build.

## Root Cause

- **Expected Assets (old):** `index-Dsb_HqR7.js`, `index-ueoYmSj_.css`
- **Current Assets (new):** `index-DUC9G1if.js`, `index-Dc1Ozxx9.css`
- **MIME Type Issue:** Server returning `text/html` instead of `application/javascript`

## Solutions

### 1. Immediate Fix - Redeploy

The GitHub Actions workflow will automatically deploy when you push to master:

```bash
git add .
git commit -m "fix: add interactive cube functionality and server configuration"
git push origin master
```

### 2. Server Configuration

Added `.htaccess` file in `public/` folder with:

- Proper MIME type settings
- SPA routing support
- Asset caching
- Compression

### 3. Verify Deployment

After deployment, check:

- `https://blockchain.florian-hunter.de/blockchain/` - Main app
- `https://blockchain.florian-hunter.de/blockchain/assets/index-DUC9G1if.js` - JS bundle
- `https://blockchain.florian-hunter.de/blockchain/assets/index-Dc1Ozxx9.css` - CSS bundle
- `https://blockchain.florian-hunter.de/blockchain/blockchain-icon.svg` - Favicon

## New Features Added

### Interactive Cube

- Click and drag the cube in the header to manually rotate it
- Mouse cursor changes to grab/grabbing
- Auto-rotation pauses during interaction
- Smooth transitions and responsive controls

### Technical Implementation

- Added React state for cube rotation tracking
- Mouse event handlers for drag functionality
- CSS improvements for better UX (cursor states, user-select: none)
- Maintained accessibility and performance

## Build Information

Latest build output:

- `index.html`: 0.81 kB
- `index-Dc1Ozxx9.css`: 24.21 kB
- `index-DUC9G1if.js`: 295.91 kB
- All tests passing (24/24)
- Code formatting compliant

## Next Steps

1. Push the changes to trigger automatic deployment
2. Wait for GitHub Actions to complete
3. Verify the new assets are served correctly
4. Test the interactive cube functionality in production
