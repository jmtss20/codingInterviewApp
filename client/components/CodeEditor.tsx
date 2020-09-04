import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';
import { ControlledEditor } from '@monaco-editor/react';

interface Props {
  socketSendCodeUpdate: (val: any) => void;
}

export const CodeEditor: React.FC<Props> = ({ socketSendCodeUpdate }) => {
  const codeEditorData: any = useSelector((state: AppState) => state.codeEditorData);
  const [value, setValue] = useState('// Write code here');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('javascript');
  const [isEditorReady, setIsEditorReady] = useState(false);
  const languages = [
    'cpp',
    'csharp',
    'csp',
    'go',
    'java',
    'javascript',
    'kotlin',
    'php',
    'python',
    'ruby',
    'rust',
    'swift',
    'typescript',
  ];

  const handleEditorDidMount = () => setIsEditorReady(true);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const selectLanguage = (e: any) => {
    setLanguage(e.target.value);
    socketSendCodeUpdate({ value, language: e.target.value });
  };
  const handleEditorChange = (e: any, value: string) => {
    setValue(value);
    socketSendCodeUpdate({ value, language });
  };

  useEffect(() => {
    if (codeEditorData.language !== language) setLanguage(codeEditorData.language);
    setValue(codeEditorData.value);
  }, [codeEditorData]);

  return (
    // https://www.npmjs.com/package/@monaco-editor/react for details on props
    <>
      <button onClick={toggleTheme} disabled={!isEditorReady}>
        {theme} mode
      </button>
      <select disabled={!isEditorReady} value={language} onChange={selectLanguage}>
        {languages.map((lng) => (
          <option value={`${lng}`}>{lng}</option>
        ))}
      </select>
      <ControlledEditor
        height='33vh'
        width='50vw'
        value={value}
        /* @ts-ignore  */
        onChange={handleEditorChange}
        editorDidMount={handleEditorDidMount}
        language={language}
        theme={theme}
      />
    </>
  );
};