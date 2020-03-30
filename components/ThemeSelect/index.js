import React, { Fragment } from "react";
import GraphiQL from "graphiql";

const { Select, SelectOption } = GraphiQL;
export default ({ editorTheme, onThemeSelect }) => {
  console.log("===editorTheme", editorTheme);
  return (
    <Select onSelect={onThemeSelect}>
      <SelectOption
        label="Default Theme"
        selected={!editorTheme}
        value={undefined}
      />
      <SelectOption
        label="Dracula"
        selected={editorTheme === "dracula"}
        value="dracula"
      />
      <SelectOption
        label="Oceanic Next"
        selected={editorTheme === "oceanic-next"}
        value="oceanic-next"
      />
      <SelectOption
        label="Paraiso Dark"
        selected={editorTheme === "paraiso-dark"}
        value="paraiso-dark"
      />
      <SelectOption
        label="Solarized Dark"
        selected={editorTheme === "solarized dark"}
        value="solarized dark"
      />
      <SelectOption
        label="Solarized Light"
        selected={editorTheme === "solarized light"}
        value="solarized light"
      />
    </Select>
  );
};
