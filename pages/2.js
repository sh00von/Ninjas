import Head from "next/head";
import dynamic from "next/dynamic";

// Dynamically import the WorldMap component to avoid SSR issues with D3
const WorldMap = dynamic(() => import("../components/WorldMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>World Map Visualization</title>
        <meta name="description" content="A world map visualization with zoom and pan features." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          World Map Visualization
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WorldMap />
        </div>
      </main>
    </div>
  );
}
