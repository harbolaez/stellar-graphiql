import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "antd";
import { parse, print } from "graphql";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/comment/comment";
import "codemirror/addon/lint/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import "codemirror/addon/display/autorefresh";
const CodeMirror = dynamic(() => import("codemirror"), { ssr: false });

// import './styles.scss';

function Query({ code, copyToEditor }) {
  const node = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    editor.current = CodeMirror(node.current, {
      value: print(parse(code)),
      tabSize: 2,
      mode: "graphql",
      theme: "material",
      matchBrackets: true,
      showCursorWhenSelecting: true,
      readOnly: true,
      autoRefresh: true
    });
  }, []);

  return (
    <div className="query-editor" ref={node}>
      <Button
        variant="contained"
        color="primary"
        className="copy-button"
        onClick={() => copyToEditor(editor.current.getValue())}
      >
        Copy to Console
      </Button>
    </div>
  );
}

Query.defaultProps = {
  code: `
    {
      __schema {
        queryType {
          name
          description
        }
      }
    }
  `
};

export default Query;
