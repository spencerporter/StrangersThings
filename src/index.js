import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Link} from 'react-router-dom';

import {
    Home,
    NavBar, Posts, Profile
} from "./components"
const App = () => {
    return (
        <div className="app">
            <NavBar />
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route path="/posts" component={Posts} />
                <Route path="/profile" component={Profile} />
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'));