import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

const Typefaces = dynamic(import("../lib/typefaces"), { ssr: false });

export default ({ title, children }) =>
  <div className="page">
    <Typefaces />
    <Head>
      <link
        rel="icon"
        type="image/png"
        href="/static/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
      />
      <title>
        {title ? "Josh Hawkins is " + title : "Josh Hawkins is..."}
      </title>
      <style>{`

        body {
          padding: 0;
          margin: 0;
          height: 100%;
          background-color: black;
          font-family: -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          word-spacing: 0.1px;
          letter-spacing: 1px;
        }
        .Open_Sans body {
          font-family: "Open Sans";
          letter-spacing: 0;
          word-spacing: 0;
        }
        pre {
          margin: 10px;
          border: 1px solid #ff0080;
          overflow-x: auto;
        }
        .Lucida_Console pre *, .Lucida_Console code {
          font-family: Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace,
            serif !important;
        }
        a {
          color: #ff0080;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: bold;
        }
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

    <div className="content">
      {children}
    </div>

    <Footer />
  </div>;
