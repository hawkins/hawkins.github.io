import Link from "next/link";

const Greeting = () => (
  <div>
    <h2>Hi there!</h2>
    <p>
      Thanks for stopping by - feel free to check out my{" "}
      <Link href="/a-writer">
        <a>blog</a>
      </Link>{" "}
      to see what I'm up to lately. Or if you're interested to see some of my
      projects, you can check out my{" "}
      <Link href="/an-open-source-fanatic">
        <a>projects showcase</a>
      </Link>{" "}
      page.
    </p>
  </div>
);

export default Greeting;
