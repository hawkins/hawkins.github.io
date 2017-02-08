import React from 'react'

const posts = {
  0: {
    date: new Date().toISOString(),
    id: 0,
    title: 'Post 0',
    summary: 'The inception'
  }
}

export default ({ url: { query: { id } } }) => {
  const post = posts[id];

  return (
    <div>
      <span>{id}</span>
        <div className="post py3">
          <h1 className="post-title">
            { post.title }
          </h1>
          <p className="post-meta">{ post.date }</p>
          <p className="post-summary">
            { post.summary }
          </p>
        </div>
    </div>
  )
}
