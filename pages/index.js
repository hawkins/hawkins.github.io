import React from 'react'
import Link from 'next/link'
import posts from '../posts/index'
import Index from '../layouts/index'

export default () => (
  <Index title="Hawkins Writes Code">
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
  </Index>
)
