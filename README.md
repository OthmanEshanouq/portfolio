# Vibe Coder Portfolio

A modern, responsive portfolio site that pulls your GitHub repositories (OthmanEshanouq) into the Projects section.

**Important:** The main site (with Balatro) is a **Vite + React** app. **Do not** open `index.html` by double‑clicking it — the app will not run. You must use the dev server (see below).

**Two ways to run:**

1. **React + Balatro (OGL) hero** — WebGL shader background in the hero section:
   ```bash
   npm install
   npm run dev
   ```
   Then **open the URL shown in the terminal** (e.g. `http://localhost:5173`). Do not open `index.html` directly in the browser. Build for production: `npm run build` (output in `dist/`).

2. **Vanilla (no build)** — Open `index.vanilla.html` in a browser or serve the folder (e.g. `npx serve .`) and open the vanilla version. Uses `index.vanilla.html`, `css/style.css`, and `js/main.js` (no Balatro).

## Project structure

```
portfolio/
├── index.html          # Single-page site (Hero, About, Skills, Projects, Contact)
├── css/
│   └── style.css       # Custom styles (smooth scroll, card hover, etc.)
├── js/
│   └── main.js         # Mobile nav, smooth scroll, GitHub API fetch for projects
├── assets/
│   └── projects/       # Optional: add screenshot images named <repo-name>.png
└── README.md           # This file
```

## How to customize content

### 1. Hero (name and role)
- **File:** `index.html`
- **Find:** The `<section id="hero">` block.
- **Edit:** The `<h1>` (your name), the role line (“vibe coder”), and the tagline paragraph.

### 2. About
- **File:** `index.html`
- **Find:** `<section id="about">`.
- **Edit:** Replace the placeholder `div` with your photo:  
  `<img src="assets/profile.jpg" alt="Your Name" class="w-48 h-48 rounded-full ..." />`  
  Then update the two `<p>` blocks with your bio and links (GitHub, LinkedIn, etc.).

### 3. Skills
- **File:** `index.html`
- **Find:** `<section id="skills">` and the grid of skill items.
- **Edit:** Add/remove skill `<div>` blocks. Change the label (e.g. “HTML”) and the bar width (`style="width:90%"`) to match your level.

### 4. Projects
- **Automatic:** Repos are loaded from GitHub user **OthmanEshanouq** via `js/main.js`.
- **Change GitHub user:** In `js/main.js`, set `var GITHUB_USER = 'YourUsername';`.
- **Thumbnails:** Add images in `assets/projects/` named exactly like the repo:  
  `repo-name.png` (e.g. `my-app.png` for repo `my-app`).  
  If a file is missing, a gradient placeholder with the repo name is shown.
- **Live links:** If a repo has a “homepage” URL set in GitHub, the “Live” link appears automatically.

### 5. Contact
- **File:** `index.html`
- **Find:** `<section id="contact">`.
- **Edit:** Replace `your.email@example.com` with your email and add/update links (GitHub, LinkedIn, etc.).

### 6. SEO and favicon
- **File:** `index.html`
- **Find:** `<head>`.
- **Edit:** `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta name="author">`, and Open Graph `og:title` / `og:description`.
- **Favicon:** Replace the current `<link rel="icon" ...>` with:  
  `<link rel="icon" href="assets/favicon.ico" type="image/x-icon">`  
  and add your `favicon.ico` (or `.png`) in the `assets/` folder.

---

## Deploy to GitHub Pages

### Option A: Deploy from this repo (recommended)

1. Create a new repository on GitHub (e.g. `portfolio` or `username.github.io`).
2. Push this project into it:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Branch: **main** (or **master**), folder: **/ (root)**.
6. Save. Your site will be at `https://YOUR_USERNAME.github.io/YOUR_REPO/` (or `https://YOUR_USERNAME.github.io/` if the repo is named `YOUR_USERNAME.github.io`).

### Option B: Use a separate branch or `/docs`

- Put the site in a `docs/` folder and in **Pages** set “Source” to **main** and **/docs**.
- Or use a `gh-pages` branch and select that branch and root.

### Base path (if repo name is not `username.github.io`)

If your site is at `https://username.github.io/portfolio/`, links and assets are relative, so they should work. If you use absolute paths like `/css/style.css`, change them to relative: `css/style.css` (already used in this project).

---

## Running locally

- Open `index.html` in a browser, or use a simple server:
  ```bash
  npx serve .
  ```
  or
  ```bash
  python -m http.server 8000
  ```
- Then visit `http://localhost:8000` (or the port shown).  
  **Note:** Loading projects from GitHub works from localhost; GitHub API allows browser requests for public repos.

---

## Tech stack

- **HTML5** – Semantic sections and comments for where to add your content.
- **Tailwind CSS** (CDN) – Layout and styling; no build step.
- **Vanilla JavaScript** – Nav toggle, smooth scroll, fetch of GitHub repos.
- **GitHub API** – Public repos for user `OthmanEshanouq` (configurable in `js/main.js`).

You can switch to Bootstrap by replacing the Tailwind script with Bootstrap CSS/JS and updating the class names in `index.html` and `css/style.css` if needed.
