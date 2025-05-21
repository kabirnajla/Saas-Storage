# Saas-Storage

This project is built with [Next.js](https://nextjs.org) using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Main application files and pages
- `components/` — Reusable components
- `public/` — Public assets such as images
- `styles/` — CSS/SCSS files
- `README.md` — This documentation file

## Features

- Create and manage folders with a visual folder grid
- Upload images to each folder
- Select, preview, and delete images (with confirmation)
- Add and edit image details (with inline form and edit icon)
- "New Folder" box always appears at the end of the folder grid, with a dashed border and icon
- Responsive and modern UI with custom styles

## Editing the Homepage

You can edit the homepage in `app/page.tsx`. The page will auto-update as you save the file.

## Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load the [Geist](https://vercel.com/font) font.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)

## Deployment

We recommend deploying with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
