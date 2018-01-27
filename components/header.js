import Link from "next/link";
import PropTypes from "prop-types";

const Header = ({ title }) => (
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
      .nav {
        text-align: right;
      }
      .nav > * {
        margin-left: 10px;
        white-space: nowrap;
      }
      .header {
        padding: 30px 20% 10px 20%;
        background-color: black;
      }
    `}</style>
  </div>
);

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
