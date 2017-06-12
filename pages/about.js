import Page from "../layouts/page";

export default () => (
  <Page title="About Me">
    <p>
      This is my personal tech blog.
      Here you'll find anything from hacky how-to's to commentary on a range of technical topics.
    </p>
    <p>
      I'm an aspiring front-end developer with significant experience in React.js and its surrounding ecosystem.
      I develop a number of projects in my free time, largely with Node.js and React.js.
      You can find most of them on my GitHub profile
      {" "}
      <a href="http://www.github.com/hawkins" target="_blank">@hawkins</a>
      !
    </p>

    <p>
      Don't forget to
      {" "}
      <a href="mailto:hawkinswritescode@gmail.com">say hello</a>
      , I'd love to hear from you!
    </p>
  </Page>
);
