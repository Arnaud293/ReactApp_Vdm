import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";

export const getPosts = () => {
    return (dispatch) => {
        return getDocs(collection(db, "posts"))
        .then((res) => {
            dispatch({
                type: GET_POSTS,
                payload: res.docs.map((doc) => ({...doc.data(), id:doc.id}))
            })
            ;
        }).catch(error => console.log(error));
    }
};

export const addPost = (data) => {
    return(dispatch) => {
        return addDoc(collection(db, "posts"), data)
        .then(() => {
            dispatch({
                type : ADD_POST,
                payload : data
            })
        })
        .catch(error => console.log(error))
        ;
    }
}