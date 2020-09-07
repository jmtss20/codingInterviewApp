import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export const Prompt: React.FC = () => {
  const prompt: any = useSelector((state: AppState) => state.promptData);

  return (
    <div className='PromptContainer'>
      <h3>{prompt.title}</h3>
      <p>{prompt.text}</p>
    </div>
  );
};
