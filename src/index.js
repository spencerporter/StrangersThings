import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Link} from 'react-router-dom';

import {
    Home,
    NavBar, Posts
} from "./components"
const App = () => {
    return (
        <div className="app">
            <NavBar />
            <BrowserRouter>
                <Route path="/posts" component={Posts} />

                <Route exact path="/" component={Home} />
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'));