const { buildSchema } = require("graphql");
const { Post, Project } = require("../lib/db");

const schema = buildSchema(`
  type Post {
    id: String!
    title: String!
    date: String!
    categories: [String]!
    link: String!
    summary: String
  }

  type Project {
    id: Int!
    title: String!
    link: String
    description: String
    motive: String
    learned: String
  }

  type Query {
    getPost(id: String!): Post
    getPosts(category: String, limit: Int): [Post]
    getProject(id: Int!): Project
    getProjects: [Project]
  }
`);

const getPost = async ({ id }) => await Post.findOne({ id });
const getPosts = async ({ category }) => {
  let posts;
  if (category) posts = await Post.find({ categories: category });
  else posts = await Post.find();
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
};

const getProject = async ({ id }) => await Project.findOne({ id });
const getProjects = async () => {
  let projects = await Project.find();
  projects.sort((a, b) => b.id - a.id);
  return projects;
};

module.exports = {
  schema,
  root: { getPost, getPosts, getProject, getProjects }
};
