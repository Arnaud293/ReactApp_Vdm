import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { auth, db } from '../utils/firebase.config';
import CommentCard from './CommentCard';

const CommentPost = ({post}) => {

    const [user, setUser] = useState(null);
    const theComment = useRef();

    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
    });
    
    const handleComment = (e) => {
        e.preventDefault();

        let data = [];
        if(post.comments === null){
          data = [
                {
                    commentAuthor: user.displayName,
                    text : theComment.current.value,
                }
            ];

        } else {
            data = [
                ...post.comments,
                {
                commentAuthor: user.displayName,
                text : theComment.current.value,
                }
            ]
        }
        

        updateDoc(doc(db, "posts", post.id), {comments: data});
        theComment.current.value = '';
    }

    return (
        <div className="comment-container">
            <h5 className="comment-title">Commentaires</h5>
            {post.comments && post.comments.map((comment, index) => (
                <CommentCard key={index} comment={comment}/>
            ))}
            {user ? (
                <form onSubmit={(e) => handleComment(e)}>
                    <textarea placeholder='Ecrire un commentaire' ref={theComment}></textarea>
                    <input type="submit" value="Envoyer" />
                </form>
            ) :(
                <p>Vous devez être connecté pour poster un commentaire.</p>
            )}
        </div>
    );
};

export default CommentPost;