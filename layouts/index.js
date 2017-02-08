import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'

export default class Index extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>{ this.props.title }</title>
        </Head>
        <Header />

        <div className="welcome">
          <h2>Welcome!</h2>
          <p>
            Thanks for stopping by - feel free to check out the blog posts below to see what I'm up to lately. Or if you're interested to see some of my projects, you can check out <Link href="/projects">projects showcase</Link> page.
          </p>
        </div>

        { this.props.children }
        <Footer />
      </div>
    )
  }
}
