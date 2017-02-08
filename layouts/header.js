import React from 'react'
import Link from 'next/link'

export default () => (
  <div className="header">
    <Link href="/"><h1>Hawkins Writes Code</h1></Link>
    <div className="nav links">
      <Link href="/about">About</Link>
      <Link href="/projects">Project Showcases</Link>
    </div>
  </div>
)
