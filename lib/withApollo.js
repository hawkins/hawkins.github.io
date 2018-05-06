import { ApolloProvider, getDataFromTree } from "react-apollo";
import initApollo from "./initApollo";

export default ComposedComponent => {
  return class WithApollo extends React.Component {
    static displayName = `WithApollo(${ComposedComponent.displayName})`;

    static async getInitialProps(ctx) {
      // Initial serverState with apollo (empty)
      let serverState;

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo();
      try {
        // create the url prop which is passed to every page
        const url = {
          query: ctx.query,
          asPath: ctx.asPath,
          pathname: ctx.pathname
        };

        // Run all GraphQL queries
        await getDataFromTree(
          <ComposedComponent ctx={ctx} url={url} {...composedInitialProps} />,
          {
            router: {
              asPath: ctx.asPath,
              pathname: ctx.pathname,
              query: ctx.query
            },
            client: apollo
          }
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      serverState = {
        apollo: {
          data: apollo.cache.extract()
        }
      };

      return {
        serverState,
        ...composedInitialProps
      };
    }

    constructor(props) {
      super(props);
      this.apollo = initApollo(this.props.serverState);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
