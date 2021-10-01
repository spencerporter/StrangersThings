import React, {useState} from "react";
import { BrowserRouter , Route , Link, useHistory} from 'react-router-dom';

import { login, register } from "../api";

const LogIn = ({setToken , match}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsSame, setPasswordsSame] = useState(false);

    const history = useHistory();

    return(
        <form className="m-3 w-50" 
            onSubmit={(event) => {
                event.preventDefault();
 
                if(match.url === "/register"){
                    console.log("Register: ",username, password, confirmPassword)
                    //TODO: Check Confirm Password
                    register(username, password, setToken)
                    history.push("/");
                }else {
                    console.log("Login: ",username, password)
                    login(username, password, setToken)
                    history.push("/");
                }
            }}
        >
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username (min 5 Characters)</label>
                <input type="text" className="form-control" id="usernameInput" placeholder="Username..." minLength="5"
                    onChange={({target: {value}}) => setUsername(value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password (min 5 Characters)</label>
                <input type="password" className="form-control" id="passwordInput" placeholder="Password..." minLength="5"
                    onChange={({target: {value}}) => setPassword(value)}/>
            </div>
            {(match.url === "/register" ? 
                <div className="mb-3">
                    <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password (min 5 Characters)</label>
                    <div className="input-group has-validation">
                        <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password..." minLength="5"
                            onChange={
                                ({target: {value}}) => {
                                    setConfirmPassword(value)
                                    setPasswordsSame(password === confirmPassword)
                                }
                        }/>
                        {/* TODO: Fix this vvv */}
                        {/* {(passwordsSame === true ? 
                            <div className="valid-feedback">
                                Looks good!
                            </div> 
                            : 
                            <div id="validationServerPasswordFeedback" className="invalid-feedback">
                                Passwords must be the same.
                            </div>
                        )} */}
                    </div>
                </div>
            : null)}
            <button type="submit" className="btn btn-primary">Login</button>
            <div className="mb-3">                
                {(match.url === "/register" ?
                    <Link to="/login">Already a user? Login Here! </Link> 
                    :
                    <Link to="/register">Not a User? Register Here! </Link>
                )}
            </div>
        </form>
    )
}

export default LogIn;