import React from "react";
import { SITE_URL } from "../../config/site.ts";

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image = "/williams-warm-grey.jpg",
  noindex = false,
}) => {
  const origin = SITE_URL.replace(/\/$/, "");
  const canonicalUrl = `${origin}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${origin}${image}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
};
