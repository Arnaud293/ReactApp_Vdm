import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../utils/firebase.config';
import Delete from './Delete';

const Post = ({post, user}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editMessage, setEditMessage] = useState(null);

    const handleEdit = () => {
        setIsEditing(false);

        if(editMessage){
        updateDoc(doc(db, "posts", post.id), {message : editMessage})
        }
    }

    const dateFormater = (date) =>{
        let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));
        
        if(days === 0){
            return "aujourd'hui";
        }
        else if(days === 1){
            return "il y a 1 jour"
        }
        else{
            return 'il y a ' + days + " jours"
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                <div className="left-part">
                    <div className="title">
                        <span>{post.author[0]}</span>
                        <h2>{post.author}</h2>
                    </div>
                    <h5>Posté {dateFormater(post.date)}</h5>
                </div>
                {post.authorId === user?.uid && (
                <div className="right-part">
                    <span onClick={() => setIsEditing(!isEditing)}><i className="fa-solid fa-pen-to-square"></i></span>
                    <Delete postId={post.id} />
                </div>
                )}
            </div>
            {isEditing ? (
                <>
                <textarea autoFocus value={editMessage ? editMessage : post.message} onChange={(e) => setEditMessage(e.target.value)}></textarea>
                <button className="edit-btn" onClick={() => handleEdit()}>Valider</button>
                </>
            ) :(
            <p>{editMessage ? editMessage : post.message}</p>
            )}
        </div>
        
    );
};

export default Post;