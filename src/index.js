import React, { useState , useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route } from 'react-router-dom';
import { getUser } from './api';

import {
    AddPost,
    Home,
    LogIn,
    NavBar, Posts, Profile
} from "./components"
const App = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        username: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            setToken(token);
            getUser(token, setUser);
        }
    }, [])

    return (
        <div className="app">
            <BrowserRouter>
                <NavBar token={token} setToken={setToken}/>
                <Route exact path="/" render={(routeProps) => <Home token={token} user={user} />} />
                <Route exact path="/posts" render={(routeProps) => <Posts token={token} user={user} />}/>
                <Route path="/profile" render={(routeProps) => <Profile user={user} />} />
                <Route path="/login" render={(routeProps) => <LogIn setToken={setToken} setUser={setUser} {...routeProps}/>}  />
                <Route path="/register" render={(routeProps) => <LogIn setToken={setToken} setUser={setUser} {...routeProps}/>}  />
                <Route path="/posts/add" render={(routeProps) => <AddPost token={token} user={user} {...routeProps}/>}  />
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'));