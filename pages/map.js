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
        <title>GHG Emmisions</title>
        <meta name="description" content="GHG Emmisions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WorldMap />
        </div>
      </main>
    </div>
  );
}
