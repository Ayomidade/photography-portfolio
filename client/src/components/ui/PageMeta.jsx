/**
 * PageMeta
 *
 * Drop this at the top of every page component.
 * Handles title, description, OG tags, Twitter card, canonical URL.
 *
 * Usage:
 * <PageMeta
 *   title='Projects'
 *   description='Visual projects by Anthony Monday'
 *   url='https://...vercel.app/projects'
 * />
 */

import { Helmet } from "react-helmet-async";
import { SITE, buildMeta } from "@/utils/seo";

const PageMeta = ({ title, description, image, url, type, noIndex }) => {
  const meta = buildMeta({ title, description, image, url, type, noIndex });

  return (
    <Helmet>
      {/* Title */}
      <title>{meta.title}</title>

      {/* Primary */}
      <meta name="description" content={meta.description} />
      <meta
        name="robots"
        content={meta.noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={meta.url} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:creator" content={SITE.twitter} />
    </Helmet>
  );
};

export default PageMeta;
