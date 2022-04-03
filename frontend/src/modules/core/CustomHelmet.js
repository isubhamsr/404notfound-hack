import React from "react";
import { Helmet } from "react-helmet";

export default function CustomHelmet({
  title = "404 Not Found - Hackathon",
  description = "",
    url = "",
    keywords = ""
}) {
  return (
    <Helmet>
      <title>{`${title}`}</title>
      <meta name="description" content={`${description} `} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="object" />
      <meta property="og:title" content={`${title}`}/>
      <meta property="og:description" content={`${description}`} />
    </Helmet>
  );
}
