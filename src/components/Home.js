import React , {useEffect , useState} from "react";
import { useHistory } from "react-router";
import { getUser } from "../api";

const Home = ({token}) => {
    const history = useHistory();

    const [user, setUser] = useState({});
    
    useEffect(() => {
        if(token){
            getUser(token, setUser);
        }
    }, [token])

    if(token){
        return (
            <div className="centered m-3">
                <h1> Welcome: {user.username} </h1>
                <h2> Logged in as {user.username}</h2>
                <button type="button" className="btn btn-outline-primary" onClick={(event) =>{
                    event.preventDefault();
                    history.push("/profile");
                }}>View Profile</button>
            </div>          
        )
    }else{
        return (<div className="centered m-3">
            <h1>Welcome: Please Login to view Profile</h1>
            <button type="button" className="btn btn-outline-primary" onClick={(event) =>{
                    event.preventDefault();
                    history.push("/login");
                }}>Log In</button>
        </div>)
    }
}

export default Home;