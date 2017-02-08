import React from 'react'
import Link from 'next/link'

export default () => (
  <div className="header">
    <Link href="/"><h1>Hawkins Writes Code</h1></Link>
    <div className="nav">
      <Link href="/about">About</Link>
      <Link href="/projects">Project Showcases</Link>
    </div>
    <style jsx>{`
      h1 {
        color: blue;
      }
      div.nav {
        text-align: right;
      }
      div.header {
        border-bottom: 1px solid black;
      }
    `}</style>
  </div>
)
