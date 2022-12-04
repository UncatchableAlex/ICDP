import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {LoginPage} from "./login";
import {ToggleTheme} from "./themes";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ToggleTheme child={<LoginPage/>}/>
    </React.StrictMode>
);
