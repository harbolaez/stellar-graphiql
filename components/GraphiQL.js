import React, { useReducer, useRef, useEffect, useState } from "react";
import Head from "next/head";
import GraphiQL from "graphiql";
import {
  parse,
  print,
  buildClientSchema,
  getIntrospectionQuery
} from "graphql";
// import GraphiQLExplorer from "graphiql-explorer";
import GraphiQLExplorer from "../patches/Explorer";
import { initialState, reducer, actions, graphQLFetcher } from "./reducer";
import { Checkbox } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";

import SearchWidget from "./SearchNav";
import ThemeSelect from "./ThemeSelect";
import { makeDefaultArg, getDefaultScalarArgValue } from "./CustomArgs";

const codemirrorVersion = require("codemirror/package.json").version;

const colors = {
  keyword: "#7cf3ff",
  // OperationName, FragmentName
  def: "#cc3932",
  // FieldName
  property: "#a5acb8",
  // FieldAlias
  qualifier: "#1C92A9",
  // ArgumentName and ObjectFieldName
  attribute: "#b58860", //FF6B6B
  number: "#F6AE2D",
  string: "#97be7b",
  // Boolean
  builtin: "#F6AE2D",
  // Enum
  string2: "#0B7FC7",
  variable: "#a87f5b",
  // Type
  atom: "#d27caf"
};

const ExplorerCheckbox = props => (
  <Checkbox style={{ paddingRight: 3 }} {...props} />
);

export default () => {
  const graphiql = useRef(GraphiQL);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    graphQLFetcher({ query: getIntrospectionQuery() }, state.url).then(
      result => {
        dispatch({
          type: actions.SCHEMA,
          payload: buildClientSchema(result.data)
        });
      }
    );
  }, [state.url]);

  const handleClickPrettifyButton = () => {
    const editor = graphiql.current.getQueryEditor();
    const currentText = editor.getValue();
    editor.setValue(print(parse(currentText)));
  };

  const handleSamplePanel = () => {
    dispatch({ type: actions.SAMPLE_PANEL, payload: !state.samplePanel });
    handleClickPrettifyButton();
  };

  const copyToEditor = value => {
    const editor = graphiql.current.getQueryEditor();
    editor.setValue(print(parse(value)));
  };

  const handleToggleExplorer = () => {
    dispatch({ type: actions.EXPLORER, payload: !state.explorerIsOpen });
  };

  const handleEditQuery = query =>
    dispatch({ type: actions.QUERY, payload: query });

  const setUrl = value => {
    dispatch({ type: actions.URL, payload: value });
  };

  return (
    <>
      <Head>
        <link
          href={`https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codemirrorVersion}/theme/drcla.css`}
          rel="stylesheet"
        />
      </Head>

      <SearchWidget url={state.url} setUrl={setUrl} />
      <section id="main-graphiql-section">
        {/* <SampleQueries
          samplePanel={state.samplePanel}
          handleSamplePanel={handleSamplePanel}
          copyToEditor={copyToEditor}
        /> */}
        {!!state.schema && (
          <GraphiQLExplorer
            checkboxUnchecked={<ExplorerCheckbox checked={false} />}
            checkboxChecked={<ExplorerCheckbox checked />}
            // arrowOpen={}
            // arrowClosed={}
            colors={colors}
            schema={state.schema}
            query={state.query}
            onEdit={handleEditQuery}
            onRunOperation={operationName =>
              graphiql.handleRunQuery(operationName)
            }
            explorerIsOpen={state.explorerIsOpen}
            onToggleExplorer={handleToggleExplorer}
            getDefaultScalarArgValue={getDefaultScalarArgValue}
            makeDefaultArg={makeDefaultArg}
            buttonProps={{ type: "primary" }}
            styles={{
              buttonStyle: {
                border: 0,
                borderRadius: 0
              },
              explorerActionsStyle: {
                display: "flex",
                padding: "15px",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }
            }}
          />
        )}
        <GraphiQL
          {...state}
          ref={graphiql}
          schema={state.schema}
          fetcher={params => graphQLFetcher(params, state.url)}
        >
          <GraphiQL.Toolbar>
            <GraphiQL.Button
              onClick={graphiql.current && graphiql.current.handleToggleHistory}
              label="History"
              title="History"
            />

            <GraphiQL.Button
              onClick={handleToggleExplorer}
              label="Explorer"
              title="Toggle Explorer"
            />

            {/* <ThemeSelect
              editorTheme={state.editorTheme}
              onThemeSelect={theme =>
                dispatch({ type: actions.THEME, payload: theme })
              }
            /> */}

            {/* <GraphiQL.Button
              onClick={handleSamplePanel}
              label="Samples"
              title="Samples"
            /> */}

            <GraphiQL.Button
              onClick={handleClickPrettifyButton}
              label="Prettify"
              title="Prettify Query"
            />

            <GraphiQL.Button
              onClick={() => {}}
              label="Add Header"
              title="Add Header"
            />
          </GraphiQL.Toolbar>
        </GraphiQL>
      </section>
    </>
  );
};
