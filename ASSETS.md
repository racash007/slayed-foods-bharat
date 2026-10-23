# Adding website files

This is a static website. New files are added to the project and included in the next build; visitors cannot upload files to the website.

- Product pack images go in `public/products/`. Add the product and its public image path in `src/catalog.ts` to show it in the catalogue. The current supplied product faces are cropped from the provided pack artwork.
- Logos, brand photography, and banners go in `public/brand-assets/`. Reference them in the site with paths such as `/brand-assets/brand-logo.svg`.
- Public brochures and downloadable PDFs go in `public/downloads/`. Reference them with paths such as `/downloads/product-catalogue.pdf`.

Use approved, web-ready assets with descriptive filenames. After adding or changing files, run `pnpm build` and publish the updated `dist/` folder.
