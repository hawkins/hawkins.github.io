import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'

export default class Page extends Component {
  render() {
    return (
      <div className="page">
        <Head>
          <link rel="icon" type="image/png" href="/static/favicon-96x96.png" sizes="96x96" />
          <style>{`
          html,
          body {
            padding: 0;
            margin: 0;
            height: 100%;
            background-color: black;
          }
          pre {
            margin: 10px;
            border: 1px solid #ff0080;
            overflow-x: auto;
          }
          * {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
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
            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 20%;
            padding-right: 20%;
          }
          .content {
            background-color: #ecf0f1;
          }
          `}</style>
          <title>{ this.props.title }</title>
        </Head>
        <Header />

        <div className="content">
          { this.props.children }
        </div>

        <Footer />
      </div>
    )
  }
}
