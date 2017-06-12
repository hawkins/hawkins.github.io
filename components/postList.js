import { gql, graphql } from "react-apollo";
import Link from "next/link";

const PostList = ({ posts }) =>
  posts.length > 0
    ? <div className="posts">
        {posts.map(post =>
          <div key={post.title}>
            <Link href={post.link}>
              <h1>{post.title}</h1>
            </Link>
            <p>
              <i>{post.date}</i>
              {` -- `}
              <i>{post.summary}</i>
            </p>
            <p>{post.categories.join(", ")}</p>

            <style jsx>{`
              h1 {
                margin-bottom: 0;
              }
              h1:hover {
                color: #ff0080;
                text-decoration: underline;
              }
              p:last-child {
                font-weight: bold;
                margin-top: 0.5em;
                padding-bottom: 20px;
              }
            `}</style>
          </div>
        )}
      </div>
    : null;

const middle = ({ data }) => {
  if (data.loading) {
    return <p>Loading</p>;
  }

  if (data.error) {
    return <p>{data.error.message}</p>;
  }

  return <PostList posts={data.getPosts} />;
};

export default graphql(gql`
  query getPosts {
    getPosts {
      title
      id
      categories
      date
      summary
      link
    }
  }
`)(middle);
