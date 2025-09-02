# FTP Deployment Guide

## Overview

This project is configured to deploy automatically to your FTP server in the `/blockchain/` folder using GitHub Actions.

## Setup Instructions

### 1. GitHub Repository Secrets

You need to add the following secrets to your GitHub repository:

Go to your repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

- `FTP_SERVER`: Your FTP server hostname (e.g., `ftp.yourserver.com`)
- `FTP_USERNAME`: Your FTP username
- `FTP_PASSWORD`: Your FTP password

### 2. Server Configuration

The deployment is configured to upload files to the `/blockchain/` folder on your server.

Make sure:

- The `/blockchain/` folder exists on your server
- Your FTP user has write permissions to this folder
- The folder is accessible via web browser

### 3. Deployment Process

When you push to the `main` branch:

1. **Build Process**:
   - Installs dependencies
   - Runs tests to ensure quality
   - Builds the production bundle

2. **Deploy Process**:
   - Uploads the built files to `/blockchain/` folder
   - Overwrites existing files
   - Preserves folder structure

### 4. Manual Deployment

You can also deploy manually:

```bash
# Build the project
npm run build

# Upload the contents of the 'dist' folder to your FTP server's /blockchain/ directory
```

### 5. URL Configuration

The project is configured with base path `/blockchain/` so it will work correctly when accessed at:
`https://yourserver.com/blockchain/`

Update the `homepage` field in `package.json` with your actual server URL.

## Troubleshooting

### Common Issues

1. **FTP Connection Failed**: Check your server, username, and password in GitHub secrets
2. **Permission Denied**: Ensure your FTP user has write access to the `/blockchain/` folder
3. **404 Not Found**: Verify the `/blockchain/` folder exists and is web-accessible
4. **Assets Not Loading**: Check that the `base` path in `vite.config.ts` matches your folder structure

### Testing the Deployment

1. Access `https://yourserver.com/blockchain/` in your browser
2. Verify all features work correctly
3. Check browser console for any asset loading errors

## Security Notes

- Never commit FTP credentials to your repository
- Use strong passwords for FTP access
- Consider using SFTP instead of FTP for better security
- Regularly update your FTP credentials
