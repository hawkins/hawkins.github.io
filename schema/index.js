const { buildSchema } = require("graphql");
const requireDirectory = require("require-directory");

const schema = buildSchema(`
  type Post {
    id: String!
    title: String!
    date: String!
    categories: [String]!
    link: String!
    summary: String
  }

  type Query {
    getPost(id: String!): Post
    getPosts(category: String, limit: Int): [Post]
  }
`);

const getPost = args => require(`../posts/${args.id}`);
const getPosts = ({ limit, category }) => {
  const tree = requireDirectory(module, "../posts");
  let posts = Object.keys(tree).map(key => {
    tree[key].id = key;
    return tree[key];
  });

  if (category)
    posts = posts.filter(post => post.categories.indexOf(category) !== -1);
  posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (limit) posts = posts.slice(0, limit);

  return posts;
};

module.exports = {
  schema,
  root: { getPost, getPosts }
};
