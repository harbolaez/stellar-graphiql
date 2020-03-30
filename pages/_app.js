import React from "react";
import App from "next/app";
import Head from "next/head";

import "../node_modules/graphiql/graphiql.css";
import "../components/styles.scss";
import "../themes/graphiql-dark-mode.css";
import "../components/SearchNav/index.scss";

import "antd/dist/antd.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
