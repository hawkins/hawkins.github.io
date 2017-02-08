import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import posts from '../posts/index'


export default () => (
  <div>
    <Head>
      <title>Hawkins Writes Code</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="description" content="Josh Hawkins' tech blog and home for all things software, web, and otherwise."/>
      <meta name="robots" content="all"/>
      <meta name="author" content="Josh Hawkins"/>
      <link rel="canonical" href="http://hawkins.github.io/"/>
      <link rel="stylesheet" href="../css/pixyll.css" type="text/css"/>
      <link href='//fonts.googleapis.com/css?family=Merriweather:900,900italic,300,300italic' rel='stylesheet' type='text/css'/>
      <link href='//fonts.googleapis.com/css?family=Lato:900,300' rel='stylesheet' type='text/css'/>
      <link href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"/>
      <link rel="icon" type="image/png" href="../favicon-96x96.png" sizes="96x96"/>
    </Head>
    <div className="home">
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
    </div>
  </div>
)
