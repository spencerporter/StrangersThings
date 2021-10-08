import React, { useEffect, useState } from "react";
import { getPostWithID, deletePostWithID } from "../api";

async function deletePost(postID, token, history){
    await deletePostWithID(token, postID)
    history.push("/posts");
}

const Post = ({token, history, match}) => {
    const [post, setPost] = useState({})
    
    useEffect(() => {
        getPostWithID(token, match.params.postId, setPost);
    },[token,match.params.postId])

    if(post._id){
        return (
            <div className="centered">
                <div className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                    <div className="card-header bg-primary text-white">
                        {post.title}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Description: {post.description}</li>
                        <li className="list-group-item">Author: {post.author.username}</li>
                        <li className="list-group-item">Location: {post.location}</li>
                        <li className="list-group-item">Price: {post.price}</li>
                        {post.willDeliver ? <li className="list-group-item">Will Deliver</li> : <li className="list-group-item">Will NOT Deliver</li>}
                        <div className="horizGroup">
                            <button type="button" className="btn btn-outline-primary w-25 m-3" 
                                onClick={() => {
                                    history.push(`/posts/post/edit/${post._id}`);
                                }}>Edit Post</button>
                            <button type="button" className="btn btn-outline-danger w-25 m-3" onClick={() => {deletePost(post._id,token, history)}}>Delete</button>
                        </div>
                    </ul>
                </div>
                <div id="messages" className="centered w-100">
                    <h2>Messages Pertaining to this Post</h2>
                    {
                        post.messages.map((message, index) => {
                            return (
                                <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><h3>Post: {message.post.title}</h3></li>
                                        <li className="list-group-item">From: {message.fromUser.username}</li>
                                        <li className="list-group-item">Message: {message.content}</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }else{
        return null
    }
}

export default Post;