import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import PropTypes from "prop-types";

const ProjectList = ({ projects }) =>
  projects.length > 0 ? (
    <div className="projects">
      {projects.map(project => (
        <div key={project.title}>
          {project.link ? (
            <Link href={project.link}>
              <a>
                <h1>{project.title}</h1>
              </a>
            </Link>
          ) : (
            <h1>{project.title}</h1>
          )}

          <p dangerouslySetInnerHTML={{ __html: project.description }} />
          <p dangerouslySetInnerHTML={{ __html: project.motive }} />
          <blockquote dangerouslySetInnerHTML={{ __html: project.learned }} />

          <style jsx>{`
            h1 {
              color: black;
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
            blockquote {
              color: #ecf0f1;
            }
            blockquote:before {
              color: #ff0080;
              content: open-quote;
              vertical-align: -0.3em;
              font-size: 5em;
              line-height: 0.1em;
              margin-right: 0.1em;
            }
            blockquote:after {
              content: close-quote;
              color: transparent;
            }
            blockquote {
              background: black;
              border-left: 4px solid #ff0080;
              border-bottom: 4px solid #ff0080;
              padding: 12px;
              quotes: "“" "”" "‘" "’";
            }
            blockquote a {
              text-shadow: none;
            }
            blockquote br {
              display: block;
              margin-top: 0.5em;
              content: " ";
            }
          `}</style>
        </div>
      ))}
    </div>
  ) : null;

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      learned: PropTypes.string.isRequired,
      motive: PropTypes.string.isRequired
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

  return <ProjectList projects={data.getProjects} />;
};

const query = gql`
  query getProjects {
    getProjects {
      title
      link
      description
      motive
      learned
    }
  }
`;

export default graphql(query)(middle);
