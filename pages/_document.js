import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Explore global greenhouse gas emissions with our interactive world map." />
        <meta name="keywords" content="Greenhouse Gas, Emissions, Climate Change, World Map, Environment" />
    <title>Climate Ninjas</title>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Global Greenhouse Gas Emissions Map" />
        <meta property="og:description" content="Explore global greenhouse gas emissions with our interactive world map." />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:url" content="https://www.yourwebsite.com/" />
        <meta property="og:site_name" content="Your Website Name" />

        {/* Favicon */}
        <link rel="icon" href="/logo.jpg" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
