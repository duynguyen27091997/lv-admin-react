import React from 'react';
import './App.scss';
import Header from "./layout/Header";
import Aside from "./layout/Aside";
import Main from "./layout/Main";
function App() {
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <Main/>
        </div>
    );
}

export default App;
