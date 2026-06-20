# Cloudflare Pages Deployment

## Prerequisites
- GitHub account with this repo pushed
- Cloudflare account (free tier works)
- Web3Forms access key (free at https://web3forms.com)

## Steps

### 1. Get Web3Forms key
1. Go to https://web3forms.com
2. Enter your email — receive access key in seconds
3. Replace `YOUR_ACCESS_KEY_HERE` in `src/pages/contact.astro` with the real key

### 2. Download resume PDF
1. Go to https://emilybackes.design/resume — inspect the iframe src for the PDF URL
2. Download the PDF and save as `public/resume.pdf`

### 3. Push to GitHub
```bash
git add -A
git commit -m "Initial Astro port"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 4. Connect to Cloudflare Pages
1. Go to dash.cloudflare.com -> Workers & Pages -> Create -> Pages
2. Connect to Git -> select this repo
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Environment variables:
   - `NODE_VERSION` = `22`
5. Click Save and Deploy

### 5. Add custom domain
1. In Pages -> Custom domains -> Add domain
2. Enter `emilybackes.design`
3. Update DNS at your registrar to point to Cloudflare Pages

### 6. DNS cutover from Webflow
Only after verifying the site works on the `.pages.dev` preview URL:
- Update nameservers or CNAME at your domain registrar
- Webflow site remains live until DNS propagates

## Post-deploy checklist
- [ ] Test all 27 pages on the live URL
- [ ] Submit sitemap: https://emilybackes.design/sitemap-index.xml to Google Search Console
- [ ] Set up 301 redirect from old Webflow URLs if needed
- [ ] Test contact form with a real submission
