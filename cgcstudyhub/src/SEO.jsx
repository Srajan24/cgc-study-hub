import { Helmet, HelmetProvider } from '@vuer-ai/react-helmet-async';
import { useLocation } from "react-router-dom";
import seoConfig from "./Constants/SeoConfig"; // 👈 we’ll create this next

export default function SEO() {
  const location = useLocation();
  const meta = seoConfig[location.pathname] || seoConfig.default;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Helmet>
  );
}
