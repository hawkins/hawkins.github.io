import Link from "next/link";

export default () =>
  <div className="header">
    <Link href="/">
      <a className="title">Hawkins Writes Code</a>
    </Link>
    <div className="nav">
      <Link href="/about">
        <a>About Me</a>
      </Link>
      <Link href="/projects">
        <a>Project Showcases</a>
      </Link>
    </div>

    <style jsx>{`
      .title {
        color: #ecf0f1;
        text-decoration: none;
        margin-bottom: 20px;
        display: block;
        font-size: 2em;
        font-weight: bold;
      }
      .title:hover {
        color: #ff0080;
        text-decoration: underline;
      }
      a:nth-child(n + 2) {
        padding-left: 1em;
      }
      div.nav {
        text-align: right;
      }
      div.header {
        padding: 30px 20% 10px 20%;
        background-color: black;
      }
    `}</style>
  </div>;
