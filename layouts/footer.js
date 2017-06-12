import React from "react";

export default () => (
  <div>
    <span>Also find Josh on </span>
    <a href="https://github.com/hawkins">GitHub</a>
    <span> or </span>
    <a href="https://twitter.com/hawkinjs">Twitter</a>
    <span>!</span>

    <style jsx>{`
      div {
        text-align: center;
        padding-top: 30px;
        padding-left: 20%;
        padding-right: 20%;
        padding-bottom: 30px;
        background-color: black;
        color: #ecf0f1;
      }
    `}</style>
  </div>
);
