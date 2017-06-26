import Link from "next/link";

export default ({ title }) =>
  <div className="header">
    <Link href="/">
      <a className="title">Josh Hawkins is...</a>
    </Link>
    {title ? <h2>{title}</h2> : null}

    <div className="nav">
      <Link href="/introducing-himself">
        <a>About Me</a>
      </Link>
      <Link href="/an-open-source-fanatic">
        <a>Projects Showcases</a>
      </Link>
    </div>

    <style jsx>{`
      h2 {
        color: #ecf0f1;
        text-indent: 40px;
      }
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
