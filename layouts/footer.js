import React from 'react'

export default () => (
  <div className="footer">
    <span>Also find Josh on </span>
    <a href="https://github.com/hawkins">GitHub</a>
    <span> or </span>
    <a href="https://twitter.com/hawkinjs">Twitter</a>
    <span>!</span>
    <style jsx>{`
      div.footer {
        text-align: center;
        padding-top: 30px;
        padding-left: 20%;
        padding-right: 20%;
        padding-bottom: 30px;
        background-color: black;
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
