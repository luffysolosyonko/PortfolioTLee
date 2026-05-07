# Thomas Lee Portfolio

A personal portfolio site built with Vite and React.

## Overview

This site presents Thomas Lee's profile, education, experience, projects, skills, and awards in a single-page portfolio layout.

## Features

- Hero section with profile photo toggle
- About, education, experience, projects, skills, and awards sections
- Responsive layout for desktop and mobile
- Light and dark interaction mode
- Project screenshots and external links

## Tech Stack

- React 18
- Vite
- Vanilla CSS

## Project Structure

- `src/App.jsx` - page layout and section rendering
- `src/content.js` - portfolio content, links, and data
- `src/styles.css` - visual styling and responsive layout
- `public/` - static images and assets

## Local Development

```powershell
npm install
npm run dev
```

## Production Build

```powershell
npm run build
```

## Preview the Production Build

```powershell
npm run preview
```

## Deployment

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## Customization

Most of the portfolio content can be updated in `src/content.js`. If you want to change the layout or styling, edit `src/App.jsx` and `src/styles.css`.
