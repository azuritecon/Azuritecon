# 💎 AzuriteCon 2027 Website

Official static website starter for **AzuriteCon**, held **17–18 April 2027** at **1 Bedford St, Newtown NSW 2042**.

This website is deliberately built with plain **HTML + CSS + JavaScript** so it can be hosted directly by **GitHub Pages** for free.

## 🚀 Put it on GitHub Pages

### Option A — easiest

1. Create/sign in to a GitHub account at https://github.com/
2. Click **New repository**.
3. Give the repository a name such as `azuritecon-website`.
4. Set it to **Public**.
5. Create the repository.
6. Click **Add file → Upload files**.
7. Upload the contents of this folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `content.json`
   - `.nojekyll`
   - the complete `assets` folder
8. Commit the files.
9. In the repository, go to **Settings → Pages**.
10. Under **Build and deployment**, choose **Deploy from a branch**.
11. Select the `main` branch and `/ (root)`.
12. Click **Save**.

GitHub will then give you a website address such as:

`https://YOUR-GITHUB-USERNAME.github.io/azuritecon-website/`

## ✏️ Editing the event

Most changes can be made in `content.json`.

You can change:
- event name
- dates
- venue
- ticket prices
- Eventbrite link
- Artist Alley application link
- schedule
- FAQ
- contact email
- event description

After editing `content.json`, commit the change to GitHub. GitHub Pages will automatically publish the update.

## 🎟️ Current ticket setup

The website currently contains the supplied AzuriteCon ticket information:

- Market Entry: $8 + booking fees online / $11 on the day TEST
- Saturday Market + Panels & Performances: $15 + booking fees, online sales only
- Kids aged 12 years or under: $4, pay on the day only
- Online Eventbrite sales end Thursday, 15 April 2027

The Eventbrite button currently uses a placeholder URL until the real Eventbrite event page exists.

## 🎨 Artist Alley

The Artist Alley buttons are already connected to:

https://forms.gle/u6Lm7Ah8XPCTw22KA

## 🌐 Custom domain later

When you purchase an AzuriteCon domain, GitHub Pages can use a custom domain instead of the `github.io` address.

## 🛒 Shopify / WooCommerce later

The website is intentionally independent of the ticketing system.

When you are ready, the ticket button can point to:
- Eventbrite
- Shopify
- WooCommerce
- another ticketing platform

The visual website does not need to be rebuilt just because the ticket provider changes.

## 📁 File structure

```text
azuritecon-website/
├── index.html
├── styles.css
├── script.js
├── content.json
├── .nojekyll
├── README.md
└── assets/
    ├── logo.svg
    └── azuritecon-hero.png
```
