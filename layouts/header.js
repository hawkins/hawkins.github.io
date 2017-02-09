import React from 'react'
import Link from 'next/link'

export default () => (
  <div className="header">
    <Link href="/"><h1>Hawkins Writes Code</h1></Link>
    <div className="nav">
      <Link href="/about">
        <a className="link">About</a>
      </Link>
      <Link href="/projects">
        <a className="link">Project Showcases</a>
      </Link>
    </div>
    <style jsx>{`
      h1 {
        color: #ecf0f1;
      }
      a.link:nth-child(n+2) {
        padding-left: 1em;
      }
      div.nav {
        text-align: right;
      }
      h1 {
        margin-bottom: 20px;
      }
      div.header {
        padding-left: 20%;
        padding-right: 20%;
        padding-top: 30px;
        padding-bottom: 10px;
        background-color: black;
      }
    `}</style>
  </div>
)
