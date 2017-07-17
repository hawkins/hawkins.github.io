import Link from "next/link";
import Page from "../layouts/page";
import Greeting from "../components/greeting";

export default () =>
  <Page>
    <Greeting />

    <h2>If you didn't already know, Josh Hawkins is:</h2>
    <ul>
      <li>
        <Link prefetch href="/an-open-source-fanatic">
          <a>an open source fanatic and developer</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/a-writer"><a>a writer</a></Link>
      </li>
      <li>
        available for hire! Be sure to
        {" "}
        <Link prefetch href="mailto:hawkinswritescode@gmail.com">
          <a>get in contact</a>
        </Link>
        {" "}
        with me if you'd like to team up to build amazing things.
      </li>
    </ul>

    <style jsx>{`
      li:before {
        content: "... ";
      }
      li {
        list-style: none;
        padding-top: 10px;
      }
    `}</style>
  </Page>;
