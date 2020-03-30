import Head from "next/head";
import GraphiQL from "../components/GraphiQL";

const Home = () => (
  <div className="container">
    <Head>
      <title>Stellar GraphiQL</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>

    <GraphiQL />
  </div>
);

export default Home;
