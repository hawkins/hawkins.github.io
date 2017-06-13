import { ApolloClient, createNetworkInterface } from "react-apollo";
import fetch from "isomorphic-fetch";

let apolloClient = null;
const dev = process.env.NODE_ENV !== "production";

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !(process: any).browser,
    networkInterface: createNetworkInterface({
      uri: dev
        ? "http://localhost:3000/graphql"
        : `${process.env.NOW_URL}/graphql`
    })
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
