import React from 'react'
import ReactMarkdown from 'react-markdown'
import Post from '../../../../layouts/post'
import content from '../../../../_posts/2016-08-22-cli-python-click'

export default () => (
  <Post title="Creating Command Line Applications in Python">
    <ReactMarkdown source={content} />
  </Post>
)
