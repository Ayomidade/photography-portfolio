// SEO.jsx - For Visual Artist & Documentary Photographer
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  ogImage,
  keywords,
  projectType, // "documentary", "fine-art", "exhibition"
  location, // For documentary project location context
  year, // For project year
}) => {
  // Base site identity
  const siteTitle = "Anthony Monday | Visual Artist & Documentary Photographer";
  const artistName = "Anthony Monday";

  // Dynamic title construction
  let fullTitle = siteTitle;
  if (title) {
    fullTitle =
      projectType === "documentary"
        ? `${title} - Documentary Project | ${artistName}`
        : `${title} | ${artistName}`;
  }

  // Dynamic description with documentary context
  let metaDescription =
    description ||
    "Visual artist and documentary photographer exploring human geography, cultural identity, and unmediated storytelling through long-form photographic essays and visual anthropology.";

  if (projectType === "documentary" && location) {
    metaDescription = `${metaDescription} ${title} documents ${location}${year ? ` (${year})` : ""}.`;
  }

  // Keywords tailored for documentary/visual art
  const metaKeywords =
    keywords ||
    "documentary photographer, visual artist, fine art documentary, photo essay, visual anthropology, cultural documentary, long-term projects, street photography, social documentary";

  // Default OG image (documentary-focused)
  const imageUrl =
    ogImage ||
    "https://photography-portfolio-six-kappa.vercel.app/og-documentary.jpg";

  return (
    <Helmet>
      {/* Core SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta
        property="og:type"
        content={projectType === "exhibition" ? "event" : "website"}
      />
      {projectType === "exhibition" && location && (
        <meta property="og:location" content={location} />
      )}

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Article-specific (for photo essays / project pages) */}
      {projectType === "documentary" && (
        <>
          <meta property="article:tag" content="Documentary Photography" />
          <meta property="article:tag" content="Photo Essay" />
          {year && (
            <meta property="article:published_time" content={`${year}-01-01`} />
          )}
        </>
      )}
    </Helmet>
  );
};

export default SEO;
