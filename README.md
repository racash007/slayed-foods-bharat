# Slayd Foods Bharat website

Static React + TypeScript website for Slayd Foods Bharat, with separate Snaxzastic and Crespology brand pages. Distributor enquiries embed the company's Google Form on the page. The website itself has no backend, database, staff login, or file storage.

## Run locally

Requirements: Node.js 20 or newer and pnpm 10 or newer.

```sh
pnpm install
pnpm dev
```

## Configure the distributor form

Copy `.env.example` to `.env.local` and set `VITE_DISTRIBUTOR_GOOGLE_FORM_URL` to the Google Forms embed URL (the responder URL with `?embedded=true`). Restart the development server or rebuild after changing the value. If the variable is unset, the site uses the confirmed SFB embed URL in `src/config.ts`.

Google Forms receives and stores submitted responses under the form owner's Google account. Configure the form's access, consent, response handling, and any file-upload question there. File-upload questions can require respondents to sign in to Google and store uploads in the owner's Drive.

`VITE_SITE_URL` in `.env.example` is reserved for the approved website address used by the selected static hosting provider. The project sources do not contain a confirmed production domain. DNS and hosting must be pointed at the final static build by whoever controls that domain.

## Build

```sh
pnpm build
```

The generated static site is in `dist/`. Deploy that directory to the chosen static host and configure the approved domain there.

## Content notes

Product names and front-facing pack images come from the supplied product image archive. The supplied Slayd Foods logo is used in the header and footer. Taglines and the two-brand relationship follow the brief and strategy presentation. Packaging is shown as supplied; confirm that the artwork is approved for public use. No extra nutrition or manufacturing claims, testimonials, retailer availability, company history, legal details, or policies have been invented.

## Required client inputs before launch

- Verify the live Google Form, its questions, consent wording, and response access.
- Approved domain name and the DNS/hosting account that controls it.
- Company legal and policy details.
- Final approval for product names, packaging artwork, logo usage and page copy.

## Contact and future files

The Contact page and footer link to the supplied phone number, sales email, and Instagram profile. To add more approved product, brand, or downloadable files later, see [ASSETS.md](./ASSETS.md). The site does not support visitor uploads.


