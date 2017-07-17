import Link from "next/link";

export default () =>
  <div>
    <h2>Hi there!</h2>
    <p>
      Thanks for stopping by - feel free to check out the blog posts below to
      see what I'm up to lately. Or if you're interested to see some of my
      projects, you can check out my
      {" "}
      <Link href="/an-open-source-fanatic">
        <a>projects showcase</a>
      </Link>
      {" "}
      page.
    </p>
  </div>;
