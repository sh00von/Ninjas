import Head from "next/head";
import dynamic from "next/dynamic";
import DynamicModal from "../components/DynamicModal";
// Dynamically import the WorldMap component to avoid SSR issues with D3
const WorldMap = dynamic(() => import("../components/WorldMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>GHG Emmisions</title>
        <meta name="description" content="GHG Emmisions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <DynamicModal
        title="Usage"
        description="This interactive world map allows you to explore greenhouse gas emissions by country. You can click on a country to view its emissions data for a specific year or enable comparison mode to compare emissions across multiple countries. Use the search bar to quickly locate countries, and the zoom controls to focus on specific regions."
      />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WorldMap />
        </div>
      </main>
    </div>
  );
}
