import React from 'react';

const CreatePost = ({uid, displayName}) => {

    console.log(uid, displayName);
    return (
        <div className="new-post-modal">
            <form>
                <textarea placeholder='Message'></textarea>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default CreatePost;