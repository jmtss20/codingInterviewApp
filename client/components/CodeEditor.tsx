import React, { useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';

export const CodeEditor = () => {
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

  const handleEditorChange = (e: any, value: string) => setValue(value);
  const handleEditorDidMount = () => setIsEditorReady(true);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const selectLanguage = (e: any) => setLanguage(e.target.value);

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
