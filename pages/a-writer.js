import Page from "../layouts/page";
import PostList from "../components/postList";
import withApollo from "../lib/withApollo";

export default withApollo(() =>
  <Page title="a writer">
    <PostList />
  </Page>
);
