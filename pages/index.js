import React from "react";
import Link from "next/link";
import Page from "../layouts/page";
import PostList from "../components/postList";
import withApollo from "../lib/withApollo";

export default withApollo(() => (
  <Page>
    <div className="welcome">
      <h2>Welcome!</h2>
      <p>
        Thanks for stopping by - feel free to check out the blog posts below to see what I'm up to lately.
        Or if you're interested to see some of my projects, you can check out my
        {" "}
        <Link href="/projects">projects showcase</Link>
        {" "}
        page.
      </p>
    </div>

    <PostList />
  </Page>
));
