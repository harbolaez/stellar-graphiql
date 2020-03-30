export const actions = {
  SAMPLE_PANEL: "SAMPLE_PANEL",
  EXPLORER: "EXPLORER",
  QUERY: "QUERY",
  SCHEMA: "SCHEMA",
  THEME: "THEME",
  URL: "URL"
};

export const initialState = {
  // // `fetcher` must be provided in order for GraphiQL to operate
  // fetcher: graphQLFetcher,

  // GraphQL artifacts
  query: "",
  variables: "",
  response: "",
  docExplorerOpen: false,

  // GraphQL Schema
  // If `undefined` is provided, an introspection query is executed
  // using the fetcher.
  schema: undefined,

  // Useful to determine which operation to run
  // when there are multiple of them.
  operationName: null,
  storage: null,
  defaultQuery: null,

  // custom states
  samplePanel: false,
  explorerIsOpen: true,
  editorTheme: "",
  url: "https://api.spacex.land/graphql",

  // GraphiQL automatically fills in leaf nodes when the query
  // does not provide them. Change this if your GraphQL Definitions
  // should behave differently than what's defined here:
  // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
  getDefaultFieldNames: null
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SAMPLE_PANEL:
      return { ...state, samplePanel: payload };
    case actions.EXPLORER:
      return { ...state, explorerIsOpen: payload };
    case actions.QUERY:
      return { ...state, query: payload };
    case actions.SCHEMA:
      return { ...state, schema: payload };
    case actions.THEME:
      return { ...state, editorTheme: payload };
    case actions.URL:
      return { ...state, url: payload };
    default:
      return state;
  }
};

export function graphQLFetcher(graphQLParams, url) {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}
