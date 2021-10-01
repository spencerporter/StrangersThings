import React, { useState , useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route , Link} from 'react-router-dom';
import { getUser } from './api';

import {
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
        console.log(token);
        if(token){
            setToken(token);
            getUser(token, setUser);
            console.log(user);
        }
    }, [])

    return (
        <div className="app">
            <BrowserRouter>
                <NavBar />
                <Route exact path="/" render={(routeProps) => <Home user={user} />} />
                <Route path="/posts" component={Posts} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" render={(routeProps) => <LogIn setToken={setToken} setUser={setUser} {...routeProps}/>}  />
                <Route path="/register" render={(routeProps) => <LogIn setToken={setToken} setUser={setUser} {...routeProps}/>}  />
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'));