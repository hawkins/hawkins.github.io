import Page from "../layouts/page";

export default () =>
  <Page title="introducing himself">
    <p>
      This is my personal tech blog. Here you'll find anything from hacky
      how-to's to commentary on a range of technical topics.
    </p>

    <p>
      If you're interested to see my resume, you can download the latest version
      {" "}
      <a href="https://github.com/hawkins/resume/raw/master/resume.pdf">here</a>
      .
    </p>

    <hr />

    <p>
      I'm a passionate front-end developer with significant experience in
      React.js and its surrounding ecosystem. I'm a strong supporter of open
      source software, so I spend my free time contributing and maintaining
      several open source projects, largely with Node.js and React.js. You can
      find most of them on my GitHub profile
      <a href="http://www.github.com/hawkins" target="_blank"> @hawkins</a>!
    </p>

    <p>
      Don't forget to
      <a href="mailto:hawkinswritescode@gmail.com"> say hello</a>, I'd love to
      hear from you!
    </p>

    <hr />

    <p>
      Finally, if you're unimpressed with my personal website, I wrote this in a
      bit of spare time between more fun and exciting open source projects, and
      mostly because I was about to graduate and seek full time employment. Feel
      free to look at my other projects if you're interested to see something
      cool or where my passion really shines!
    </p>
  </Page>;
