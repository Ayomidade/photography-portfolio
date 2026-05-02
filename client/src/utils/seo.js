/**
 * seo.js
 *
 * Centralised SEO defaults and page-specific meta generators.
 * Import the relevant function in each page and pass to <PageMeta />.
 */

export const SITE = {
  name: "Anthony Monday Photography",
  url: "https://photography-portfolio-six-kappa.vercel.app",
  description:
    "Anthony Monday is an award-winning visual storyteller based in Lagos, Nigeria. Available for commissions, editorial, documentary and fine art photography worldwide.",
  image: "https://photography-portfolio-six-kappa.vercel.app/og-image.jpg",
  twitter: "@anthonymonday",
};

export const buildMeta = ({
  title,
  description = SITE.description,
  image = SITE.image,
  url = SITE.url,
  type = "website",
  noIndex = false,
} = {}) => ({
  title: title
    ? `${title} — Anthony Monday`
    : "Anthony Monday — Visual Storyteller",
  description: description.slice(0, 160), // Google truncates at 160 chars
  image,
  url,
  type,
  noIndex,
});
