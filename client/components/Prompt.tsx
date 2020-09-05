import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export const Prompt: React.FC = () => {
  const prompt: any = useSelector((state: AppState) => state.promptData);
  // const prompt = {
  //   title: 'Linked List Cycle',
  //   text:
  //     'Given a linked list, determine if it has a cycle in it. To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connectss to. If pos is -1, then there is no cucle in the linked list.',
  // };

  return (
    <div className='PromptContainer'>
      <h3>{prompt.title}</h3>
      <p>{prompt.text}</p>
    </div>
  );
};
