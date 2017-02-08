import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'

export default class Index extends Component {
  render() {
    return (
      <div className="page">
        <Head>
          <title>{ this.props.title }</title>
        </Head>
        <Header />

        { this.props.children }
        <Footer />
        <style jsx>{`
        div.page {
          margin: auto;
          max-width: 60%;
        }
        `}</style>
      </div>
    )
  }
}
