import React from "react";
import { Editor as DraftEditor, EditorState } from "draft-js";
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
      blockStyleFn={myBlockStyleFn}
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
    />
  );
};

export default Editor;
