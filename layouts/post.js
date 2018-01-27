import Head from "next/head";
import PropTypes from "prop-types";
import Page from "./page";

const Post = ({ title, children, date, summary }) => (
  <Page title={`writing about ${title}`}>
    <Head>
      <meta property="og:description" content={summary} />
      <meta property="og:type" content="article" />
      <meta
        property="og:article:published_time"
        content={date.replace("/", "-")}
      />
      <meta property="og:article:author:first_name" content="Josh" />
      <meta property="og:article:author:last_name" content="Hawkins" />
      <meta property="og:article:author:username" content="@hawkinjs" />
      <meta property="og:article:author:gender" content="male" />
    </Head>

    {children}
    {/* TODO: Social media buttons */}
    {/*<span>If you enjoyed this article, please share it below! If you have your own reasons for using one style over another <i>please drop me a line or mention me on Twitter!</i></span>*/}

    <style>{`
      /*
      Monokai style - ported by Luigi Maselli - http://grigio.org
      */

      .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: black;
        color: #ddd;
      }

      .hljs-tag,
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-literal,
      .hljs-strong,
      .hljs-name {
        color: #f92672;
      }

      .hljs-code {
        color: #66d9ef;
      }

      .hljs-class .hljs-title {
        color: white;
      }

      .hljs-attribute,
      .hljs-symbol,
      .hljs-regexp,
      .hljs-link {
        color: #bf79db;
      }

      .hljs-string,
      .hljs-bullet,
      .hljs-subst,
      .hljs-title,
      .hljs-section,
      .hljs-emphasis,
      .hljs-type,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-selector-attr,
      .hljs-selector-pseudo,
      .hljs-addition,
      .hljs-variable,
      .hljs-template-tag,
      .hljs-template-variable {
        color: #a6e22e;
      }

      .hljs-comment,
      .hljs-quote,
      .hljs-deletion,
      .hljs-meta {
        color: #75715e;
      }

      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-literal,
      .hljs-doctag,
      .hljs-title,
      .hljs-section,
      .hljs-type,
      .hljs-selector-id {
        font-weight: bold;
      }
    `}</style>
  </Page>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Post;
