import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../types";
import { ControlledEditor } from "@monaco-editor/react";

interface Props {
  socketSendCodeUpdate: (val: any) => void;
}

export const CodeEditor: React.FC<Props> = ({ socketSendCodeUpdate }) => {
  const codeEditorData: any = useSelector(
    (state: AppState) => state.codeEditorData
  );
  const [dimensions, setDimensions] = useState<{ [key: string]: any }>({
    width: 500,
    height: 300,
  });
  const [value, setValue] = useState("// Write code here");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const languages = [
    "cpp",
    "csharp",
    "csp",
    "go",
    "java",
    "javascript",
    "kotlin",
    "php",
    "python",
    "ruby",
    "rust",
    "swift",
    "typescript",
  ];

  const handleEditorDidMount = () => setIsEditorReady(true);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const selectLanguage = (e: any) => {
    setLanguage(e.target.value);
    socketSendCodeUpdate({ value, language: e.target.value });
  };
  const handleEditorChange = (e: any, value: string) => {
    setValue(value);
    socketSendCodeUpdate({ value, language });
  };

  useEffect(() => {
    /* @ts-ignore  */
    const height = document.getElementsByClassName("CodeEditor")[0]
      .clientHeight;
    /* @ts-ignore  */
    const width = document.getElementsByClassName("CodeEditor")[0].clientWidth;
    setDimensions({ width, height });
  }, [isEditorReady]);

  useEffect(() => {
    if (codeEditorData.language !== language)
      setLanguage(codeEditorData.language);
    setValue(codeEditorData.value);
  }, [codeEditorData]);

  return (
    // https://www.npmjs.com/package/@monaco-editor/react for details on props
    <div className="CodeEditorContainer">
      <button onClick={toggleTheme} disabled={!isEditorReady}>
        {theme} mode
      </button>
      <select
        disabled={!isEditorReady}
        value={language}
        onChange={selectLanguage}
      >
        {languages.map((lng) => (
          <option value={`${lng}`}>{lng}</option>
        ))}
      </select>
      <div className="CodeEditor">
        <ControlledEditor
          width={dimensions.width}
          height={dimensions.height}
          value={value}
          /* @ts-ignore  */
          onChange={handleEditorChange}
          editorDidMount={handleEditorDidMount}
          language={language}
          theme={theme}
        />
      </div>
    </div>
  );
};
