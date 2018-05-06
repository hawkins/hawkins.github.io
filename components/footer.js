const Footer = () => (
  <div>
    <span>Also find Josh on </span>
    <a href="https://github.com/hawkins">GitHub</a>
    <span> or </span>
    <a href="https://twitter.com/hawkinjs">Twitter</a>
    <span>, or download his latest </span>
    <a href="https://hawkins-resume.now.sh">resume</a>
    <span>!</span>

    <style jsx>{`
      div {
        text-align: center;
        padding: 30px 20px;
        background-color: black;
        color: #ecf0f1;
      }
      @media (min-width: 700px) {
        div {
          padding: 30px 20%;
          background-color: black;
        }
      }
    `}</style>
  </div>
);

export default Footer;
