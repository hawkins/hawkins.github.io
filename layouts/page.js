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
          <style>{`
          html,
          body {
            padding: 0;
            margin: 0;
            height: 100%;
            background-color: black;
          }
          * {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
          }
          pre {
            margin: 10px;
            padding: 10px;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
            border: 1px solid #ff0080;
            overflow-x: auto;
          }
          a {
            color: #ff0080;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          `}</style>
          <title>{ this.props.title }</title>
        </Head>
        <Header />

        <div className="content">
          { this.props.children }
        </div>
        <style global>{`
          .content {
            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 20%;
            padding-right: 20%;
          }
          .content,
          .content * {
            background-color: #ecf0f1;
          }
        `}</style>

        <Footer />
      </div>
    )
  }
}
