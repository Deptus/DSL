import React from 'react';
import "./css/App.css"
import { MCAuthMS } from 'auth/MinecraftAuth';

export function App(): JSX.Element {
  return (
      <button onClick={MCAuthMS}> MCAuth </button>
  );
};
