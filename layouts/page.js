import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PropTypes from "prop-types";

const Page = ({ title, children }) => (
  <div className="page">
    <Head>
      <link
        rel="icon"
        type="image/png"
        href="/static/favicon-96x96.png"
        sizes="96x96"
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
