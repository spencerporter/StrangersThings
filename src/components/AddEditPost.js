import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { BASE_URL } from "../constants";
import { getPostWithIDForEdit } from "../api"

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
        }
    })
    .catch(console.error);
}

async function editPost(token, post, postId, history){
    fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PATCH",
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
            history.push(`/posts/post/${postId}`)
        }
    })
    .catch(console.error);
}

const AddEditPost = ({token, isAdd, match}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(match.params.postId){
            getPostWithIDForEdit(token, match.params.postId, setTitle, setDescription, setPrice, setLocation, setWillDeliver);
        }
        
    },[token,match.params.postId])

    return (
        <div id="addPost" className="centered m-3">
            <h1> {(isAdd ? "Add" : "Edit")} Post</h1>
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
                if(isAdd){
                    addPost(token, post, history);
                }else{
                    editPost(token, post, match.params.postId, history);
                }
                
            }}> 
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titleInput" placeholder="Title" value={title}
                    onChange={({target: {value}}) => setTitle(value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descInput" className="form-label">Description</label>
                    <input type="text" className="form-control" id="descInput" placeholder="Description" value={description}
                    onChange={({target: {value}}) => setDescription(value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="priceInput" className="form-label">Price</label>
                    <input type="text" className="form-control" id="priceInput" placeholder="Price"  value={price}
                    onChange={({target: {value}}) => setPrice(value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="locationInput" className="form-label">Location</label>
                    <input type="text" className="form-control" id="locationInput" placeholder="Location" value={location}
                    onChange={({target: {value}}) => setLocation(value)} />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="deliverCheckbox" value={willDeliver}
                    onChange={({target: {value}}) => setWillDeliver(!willDeliver)} />
                    <label className="form-check-label" htmlFor="deliverCheckbox">
                        Will Deliver
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">{(isAdd ? "Submit" : "Save")}</button>
            </form>
        </div>)
}

export default AddEditPost;