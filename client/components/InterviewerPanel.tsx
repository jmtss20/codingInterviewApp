import React, { useState } from 'react';

interface Props {
  socketSendPromptUpdate: (prompt: any) => void;
  socketToggleSessionStatus: (bool: boolean) => void;
  socketSentNotesUpdate: (text: string) => void;
}

export const InterviewerPanel: React.FC<Props> = ({ socketSendPromptUpdate, socketToggleSessionStatus, socketSentNotesUpdate }) => {
  const [view, setView] = useState<string>('prompt');
  const [promptTitle, setPromptTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [notes, setNotes] = useState('');

  const handleTextInput = (e: any) => {
    if (e.target.id === 'title') setPromptTitle(e.target.value);
    if (e.target.id === 'text') setPromptText(e.target.value);
    if (e.target.id === 'notes') {
      setNotes(e.target.value);
      socketSentNotesUpdate(e.target.value);
    }
  };

  const handlePromptRelease = (e: any) => {
    socketSendPromptUpdate({ title: promptTitle, text: promptText });
    socketToggleSessionStatus(true);
  };

  const handlePromptEnd = (e: any) => {
    socketToggleSessionStatus(false);
  };

  return (
    <div className='InterviewerPanelContainer'>
      <div className='InterviewerNavBar'>
        <button onClick={() => setView('prompt')}>Prompt</button>
        <button onClick={() => setView('notes')}>Notes</button>
        <button onClick={() => setView('tools')}>Tools</button>
      </div>

      {view === 'prompt' && (
        <>
          <textarea
            id='title'
            value={promptTitle}
            placeholder='Enter prompt title'
            onChange={handleTextInput}></textarea>
          <textarea id='text' value={promptText} placeholder='Enter prompt text' onChange={handleTextInput}></textarea>
        </>
      )}

      {view === 'notes' && (
        <>
          <textarea id='notes' value={notes} placeholder='Enter notes here' onChange={handleTextInput}></textarea>
        </>
      )}

      {view === 'tools' && <></>}

      <div className='InterviewerControlPanel'>
        <button>Screenshot</button>
        <button onClick={handlePromptRelease}>Release Prompt</button>
        <button onClick={handlePromptEnd}>End</button>
      </div>
    </div>
  );
};
