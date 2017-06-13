import Page from "../layouts/page";
import ProjectList from "../components/projectList";
import withApollo from "../lib/withApollo";

export default withApollo(() => (
  <Page title="Projects">
    <p>
      I spend a large portion of my free time learning new technologies for software engineering.
      Occasionally, this leads to a public project or application I push out to the public.
      You can check out some of my favorites here.
    </p>
    <h2>Projects</h2>
    <ProjectList />
  </Page>
));
