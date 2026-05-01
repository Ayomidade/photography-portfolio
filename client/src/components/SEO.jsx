import { Helmet } from "react-helmet-async";

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title || "Anthony Monday"}</title>
      <meta
        name="description"
        content={description || "Photography portfolio"}
      />
    </Helmet>
  );
};

export default SEO;
