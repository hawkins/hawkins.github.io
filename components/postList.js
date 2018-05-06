import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import PropTypes from "prop-types";

const PostList = ({ posts }) =>
  posts.length > 0 ? (
    <div className="posts">
      {posts.map(post => (
        <div key={post.title}>
          <Link href={post.link}>
            <a className="post">{post.title}</a>
          </Link>
          <p>
            <i>{post.date}</i>
            {` -- `}
            <i>{post.summary}</i>
          </p>
          <p>
            [
            {post.categories.map((category, index) => (
              <span key={`${category}-${post.link}`}>
                <Link href={`/writing-about?category=${category}`}>
                  <a>{category}</a>
                </Link>
                {index < post.categories.length - 1 ? ", " : null}
              </span>
            ))}
            ]
          </p>

          <style jsx>{`
            .post {
              margin-bottom: 0;
              display: block;
              font-size: 2em;
              color: black;
              font-weight: bold;
            }
            .post:hover {
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
      ))}
    </div>
  ) : null;

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired
    })
  ).isRequired
};

const middle = ({ data }) => {
  if (data.loading) {
    return <p>Loading</p>;
  }

  if (data.error) {
    return <p>{data.error.message}</p>;
  }

  return <PostList posts={data.getPosts} />;
};

const query = gql`
  query getPosts($category: String) {
    getPosts(category: $category) {
      title
      id
      categories
      date
      summary
      link
    }
  }
`;

export default graphql(query, {
  options: ({ category }) => ({ variables: { category } })
})(middle);
