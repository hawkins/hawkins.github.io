import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PropTypes from "prop-types";

const HTTP_URL = "http://hawkins.is";
const HTTPS_URL = "https://hawkins.is";

const Page = ({ title, children }) => (
  <div className="page">
    <Head>
      <link
        rel="icon"
        type="image/png"
        href="/static/favicon-96x96.png"
        sizes="96x96"
      />
      <meta property="og:url" content="https://hawkins.is" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Josh Hawkins is..." />
      <meta property="og:image" content={HTTP_URL + "/static/og.jpg"} />
      <meta property="og:image:url" content={HTTP_URL + "/static/og.jpg"} />
      <meta
        property="og:image:secure_url"
        content={HTTPS_URL + "/static/og.jpg"}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:width" content="200" />
      <meta
        property="og:image:alt"
        content="Josh Hawkins performing a skateboard trick"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={HTTP_URL + "/static/og.jpg"} />
      <meta name="twitter:site" content="@hawkinjs" />
      <meta name="twitter:site:id" content="@hawkinjs" />
      <meta name="twitter:creator" content="@hawkinjs" />
      <meta name="twitter:creator:id" content="@hawkinjs" />
      <meta
        name="twitter:description"
        content={title ? "Josh Hawkins is " + title : "Josh Hawkins is..."}
      />
      <meta
        name="twitter:title"
        content={title ? "Josh Hawkins is " + title : "Josh Hawkins is..."}
      />
      <meta
        name="og:title"
        content={title ? "Josh Hawkins is " + title : "Josh Hawkins is..."}
      />
      <title>{title ? "Josh Hawkins is " + title : "Josh Hawkins is..."}</title>
      <style>{`
        body {
          padding: 0;
          margin: 0;
          height: 100%;
          background-color: black;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
        }
        pre {
          margin: 10px;
          border: 1px solid #ff0080;
          overflow-x: auto;
        }
        pre *,
        code {
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif !important;
        }
        a {
          color: #ff0080;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        h1, h2, h3, h4, h5, h6 { font-weight: bold; }

        .content {
          padding: 20px;
          background-color: #fff;
        }

        @media (min-width: 700px) {
          .content {
            padding: 20px 10%;
          }
        }

        @media (min-width: 1024px) {
          .content {
            padding: 20px 20%;
          }
        }
      `}</style>
    </Head>
    <Header title={title} />

    <div className="content">{children}</div>

    <Footer />
  </div>
);

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Page;
