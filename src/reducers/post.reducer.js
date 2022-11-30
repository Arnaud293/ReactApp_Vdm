import { GET_POSTS, ADD_POST } from "../actions/post.action";

const initialeState = {};

export default function postReducer(state = initialeState, action){
    switch(action.type){

        case GET_POSTS :
            return action.payload;
        case ADD_POST :
            return [action.payload, ...state ]
        default :
             return state;
    }
}; 