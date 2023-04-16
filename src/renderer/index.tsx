import React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import { App } from './App';
import { mergeStyles } from '@fluentui/react';
import reportWebVitals from './reportWebVitals';

export default function Render(root: Element): void {
    const Root = createRoot(root)
    Root.render(<App/>);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
