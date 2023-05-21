import React from 'react';
import { MCAuthMS } from 'auth/MinecraftAuth';
import { MainPage } from './pages/Main';

function pageSwitch(page: number): () => JSX.Element | JSX.Element {
  switch(page) {
    case 1:
      return MainPage
  }
  return (<p>SB</p>)
}


export function App(): JSX.Element {
  return (
      pageSwitch()
  );
};
