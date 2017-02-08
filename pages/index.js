import React from 'react'
import Link from 'next/link'
import posts from '../posts/index'
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
            <Link href={`${post.date}/${post.file}`} className="post-link">
              <h1 className="post-title">
                { post.title }
              </h1>
            </Link>
            <p className="post-meta">{ post.date }</p>
            <p className="post-summary">
              { post.summary }
            </p>
          </div>
        ))}
      </div>
    :
      null
    }
  </Page>
)
