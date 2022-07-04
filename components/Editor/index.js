import React from "react";
import { Editor as DraftEditor } from "draft-js";
import "draft-js/dist/Draft.css";
import myBlockStyleFn from "../Editor/myBlockStyleFn";

const Editor = ({
  editorState,
  setEditorState,
  handleKeyCommand,
  editorRef,
  readOnly,
}) => {
  return (
    <DraftEditor
      readOnly={readOnly}
      ref={editorRef}
      placeholder="Enter some text..."
      blockStyleFn={myBlockStyleFn}
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
    />
  );
};

export default Editor;
