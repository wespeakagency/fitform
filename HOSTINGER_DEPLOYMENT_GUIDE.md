# FitForm Studio - Hostinger Deployment Guide

## Overview
This guide will help you deploy your FitForm React application to Hostinger hosting services.

## Prerequisites
- Hostinger account with web hosting plan
- FTP access credentials
- Domain name (optional, can use free subdomain)

## Deployment Methods

### Method 1: Static Site Deployment (Recommended)

Since this is a React application built with Vite, the easiest way is to deploy it as a static site.

#### Step 1: Build Your Application
```bash
npm run build
```

This creates a `dist/` folder with all the production-ready files:
- `index.html` - Main HTML file
- `assets/index-*.js` - JavaScript bundle
- `assets/index-*.css` - CSS styles

#### Step 2: Upload Files via FTP

1. **Connect to Hostinger via FTP**
   - FTP Host: `ftp.yourdomain.com` (replace with your domain)
   - Username: Your Hostinger FTP username
   - Password: Your Hostinger FTP password
   - Port: 21

2. **Upload Files**
   - Connect to your FTP client (FileZilla, Cyberduck, etc.)
   - Navigate to `/public_html/` directory
   - Upload all files from the `dist/` folder to `/public_html/`

#### Step 3: Configure Web Server

**For Apache (most common):**
Create or edit `.htaccess` file in `/public_html/`:

```apache
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Enable caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Handle React Router (SPA routing)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Nginx:**
If your Hostinger plan supports Nginx, add this to your server configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/your/public_html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Method 2: Using Hostinger File Manager

1. **Access File Manager**
   - Log in to Hostinger Control Panel
   - Go to "Files" > "File Manager"
   - Navigate to `public_html/`

2. **Upload Files**
   - Click "Upload" button
   - Select all files from your `dist/` folder
   - Wait for upload to complete

3. **Set Permissions**
   - Right-click on files and set permissions to 644
   - Set directory permissions to 755

## Post-Deployment Steps

### 1. Update Environment Variables
If you have environment-specific configurations, update them in your build:

```bash
# Create .env.production file
VITE_API_URL=https://your-api-domain.com
VITE_APP_URL=https://your-domain.com
```

### 2. Test Your Deployment
1. Visit your domain (e.g., `https://yourdomain.com`)
2. Check that all pages load correctly
3. Test navigation between pages
4. Verify that the Fitco integration works
5. Test theme toggle functionality

### 3. SSL Configuration
Hostinger provides free SSL certificates:
1. Go to "Security" > "SSL"
2. Enable SSL for your domain
3. Force HTTPS by adding to `.htaccess`:

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Troubleshooting

### Common Issues

**1. Blank Page After Deployment**
- Check browser console for errors
- Verify all files uploaded correctly
- Ensure `.htaccess` is configured for SPA routing

**2. 404 Errors on Page Refresh**
- Verify `.htaccess` rewrite rules are correct
- Ensure `index.html` is in the root directory

**3. Assets Not Loading**
- Check file paths in `index.html`
- Verify CSS and JS files are in the correct location

**4. Fitco Integration Not Working**
- Verify the Fitco script is loading
- Check browser console for script errors
- Ensure the establishment ID is correct

### Performance Optimization

**Enable Gzip Compression**
Already included in `.htaccess` configuration above.

**Optimize Images**
- Compress images before uploading
- Use WebP format when possible
- Implement lazy loading for images

**Cache Configuration**
- Browser caching enabled in `.htaccess`
- Consider using a CDN for better performance

## Maintenance

### Updating Your Site
1. Make changes to your local project
2. Run `npm run build`
3. Upload new files to replace old ones
4. Test the updated site

### Monitoring
- Use Hostinger's uptime monitoring
- Check Google Analytics for traffic
- Monitor page load times

## Support
- Hostinger Help Center: https://www.hostinger.com/tutorials/
- React/Vite Documentation: https://vitejs.dev/guide/
- FitForm Support: Contact your development team

## Contact
For technical support with this deployment:
- Check the browser console for specific error messages
- Verify all configuration files are correctly uploaded
- Ensure your Hostinger plan supports the required features