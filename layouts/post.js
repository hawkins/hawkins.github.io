import React, { Component } from 'react'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default class Post extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>{ this.props.title }</title>
        </Head>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}
