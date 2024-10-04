import React from 'react';
import PostForm from '../components/PostForm';
import 'semantic-ui-css/semantic.min.css';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

const Post = () => {
    return (
        <div>
            <HeaderBar />
            <div className="ui container" style={{ margin: '20px auto' }}>
                <h2>Create a New Post</h2>
                <PostForm />
            </div>
            <FooterComponent />
        </div>
    );
};

export default Post;
