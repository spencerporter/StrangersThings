import React, { useEffect, useState }from "react";
import { Link , useHistory } from "react-router-dom";
import { fetchPosts , fetchPostsWithToken , deletePostWithID, postMessage } from "../api";
import { Toast, ToastContainer } from "react-bootstrap";

async function getPosts(token, setPosts, setDisplayPosts){
    if(token){
        const posts = await fetchPostsWithToken(token)
        setPosts(posts);
        setDisplayPosts(posts);
    }else{
        const posts = await fetchPosts();
        setPosts(posts);
        setDisplayPosts(posts);
    }
}

async function deletePost(postID, token, setPosts, setDisplayPosts, setShowDeleteAlert){
    await deletePostWithID(token, postID)
    getPosts(token,setPosts, setDisplayPosts);
    setShowDeleteAlert(true);
}

async function sendMessage(message, postID, token, setPosts, setDisplayPosts, setShowCommentAlert){
    await postMessage(message,postID,token);
    getPosts(token, setPosts, setDisplayPosts);
    setShowCommentAlert(true);
}


function postMatches(post, text) {
    if(post.description.toLowerCase().includes(text)) return true;
    if(post.author.username.toLowerCase().includes(text)) return true;
    if(post.location.toLowerCase().includes(text)) return true;
    if(post.price.toLowerCase().includes(text)) return true;
    if(post.title.toLowerCase().includes(text)) return true;

    return false;
}

const Posts = ({token}) => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [displayPosts, setDisplayPosts] = useState([]);
    const [showCommentAlert, setShowCommentAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getPosts(token, setPosts, setDisplayPosts);
    }, [token]);

    return (
        <div id="posts" className="centered w-75">
            {(showCommentAlert ? 
                <ToastContainer className="pos-fix p-3" position="top-end">
                    <Toast className="d-inline-block m-1" onClose={() => setShowCommentAlert(false)}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Message Sent</strong>
                        </Toast.Header>
                        <Toast.Body >
                            Your Message has been sent!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            : null)}
            {(showDeleteAlert ? 
                <ToastContainer className="pos-fix p-3" position="top-end">
                    <Toast className="d-inline-block m-1" onClose={() => setShowDeleteAlert(false)}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Post Deleted</strong>
                        </Toast.Header>
                        <Toast.Body >
                            Your Post has been deleted!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            : null)}
            <div className="horizGroup">
                <form className="d-flex w-75">
                    <input className="form-control me-2" type="search" placeholder="Search Posts" aria-label="Search"
                    onChange={({target : {value}}) => {
                        const filteredPosts = posts.filter(post => postMatches(post, value.toLowerCase()));
                        const postsToDisplay = value.length ? filteredPosts : posts;
                        setDisplayPosts(postsToDisplay)
                    }}/>
                </form>

                {(token !== "" ? <Link className="btn btn-outline-primary m-3" to="/posts/add">Add a Post</Link> : null)}
            </div>
            {displayPosts.map((post, index) => {
                return (
                    <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                        <div className="card-header bg-primary text-white">
                            {post.title}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Description: {post.description}</li>
                            <li className="list-group-item">Author: {post.author.username}</li>
                            <li className="list-group-item">Location: {post.location}</li>
                            <li className="list-group-item">Price: {post.price}</li>
                            {post.willDeliver ? <li className="list-group-item">Will Deliver</li> : <li className="list-group-item">Will NOT Deliver</li>}
                            {post.isAuthor ? 
                                <div className="horizGroup">
                                    <button type="button" className="btn btn-outline-danger w-25 m-3" onClick={() => {deletePost(post._id,token,setPosts, setDisplayPosts, setShowDeleteAlert)}}>Delete</button>
                                    <button type="button" className="btn btn-outline-primary w-25 m-3" 
                                    onClick={() => {history.push(`/posts/post/${post._id}`)}}>View Post</button>
                                </div>
                            :
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                const message = comments[post._id];
                                sendMessage(message,post._id,token, setPosts, setDisplayPosts,setShowCommentAlert);
                                comments[post._id] = ""
                            }}>
                                <div className="m-3">
                                    <label htmlFor="messageTextArea" className="form-label">Message the Author</label>
                                    <textarea className="form-control" id="messageTextArea" rows="3" value={comments[post._id]} onChange={({target : {value}}) => {
                                        let newComments = comments;
                                        newComments[post._id] = value;
                                        setComments(newComments);
                                    }}></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-primary w-25 m-3">Send Message</button>
                            </form>
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;