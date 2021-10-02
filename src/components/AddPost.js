import React, { useState } from "react";
import { useHistory } from "react-router";
import { BASE_URL } from "../constants";

async function addPost(token, post, history){
    fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            post: post
        })
    }).then(response => response.json())
    .then(result => {
        if(result.success){
            history.push("/posts")
        }else{
            //TODO ERROR
        }
    })
    .catch(console.error);
}

const AddPost = ({token, user}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const history = useHistory();

    return (
        <div id="addPost" className="centered m-3">
            <h1> Add a New Posts</h1>
            <form className="w-50" 
            onSubmit={(event) => {
                event.preventDefault();
                const post = {
                    title: title,
                    description: description,
                    price: price,
                    location: location, 
                    willDeliver: willDeliver
                }
                addPost(token, post, history);
            }}> 
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titleInput" placeholder="Title"
                    onChange={({target: {value}}) => setTitle(value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descInput" className="form-label">Description</label>
                    <input type="text" className="form-control" id="descInput" placeholder="Description" 
                    onChange={({target: {value}}) => setDescription(value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="priceInput" className="form-label">Price</label>
                    <input type="text" className="form-control" id="priceInput" placeholder="Price" 
                    onChange={({target: {value}}) => setPrice(value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="locationInput" className="form-label">Location</label>
                    <input type="text" className="form-control" id="locationInput" placeholder="Location" 
                    onChange={({target: {value}}) => setLocation(value)} />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="deliverCheckbox" 
                    onChange={({target: {value}}) => setWillDeliver(!willDeliver)} />
                    <label className="form-check-label" htmlFor="deliverCheckbox">
                        Will Deliver
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>)
}

export default AddPost;