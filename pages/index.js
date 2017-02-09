import React from 'react'
import Link from 'next/link'
import posts from '../data/posts'
import Page from '../layouts/page'

export default () => (
  <Page title="Hawkins Writes Code">
    <div className="welcome">
      <h2>Welcome!</h2>
      <p>
        Thanks for stopping by - feel free to check out the blog posts below to see what I'm up to lately. Or if you're interested to see some of my projects, you can check out <Link href="/projects">projects showcase</Link> page.
      </p>
    </div>
    { posts.length > 0 ?
      <div className="posts">
        { posts.map(post => (
          <div className="post py3" key={post.title}>
            <Link href={`${post.date}/${post.file}`}>
              <h1 className="post-title"> { post.title } </h1>
            </Link>
            <p>
              <i> { post.date } </i>
              {` -- `}
              <i> { post.summary } </i>
            </p>
            <style jsx>{`
              h1 {
                margin-bottom: 0;
              }
              h1:hover {
                color: #ff0080;
                text-decoration: underline;
              }
              p {
                margin-top: 0.5em;
                padding-bottom: 20px;
              }
            `}</style>
          </div>
        ))}
      </div>
    :
      null
    }
  </Page>
)
