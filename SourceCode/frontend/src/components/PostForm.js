import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';

const PostForm = () => {
    const [postType, setPostType] = useState('question');

    return (
        <Segment>
            <Form size="large" style={{ maxWidth: '90%', margin: '0 auto' }}>
                <Form.Group inline>
                    <Form.Radio
                        label='Question'
                        name='postType'
                        value='question'
                        checked={postType === 'question'}
                        onChange={() => setPostType('question')}
                    />
                    <Form.Radio
                        label='Article'
                        name='postType'
                        value='article'
                        checked={postType === 'article'}
                        onChange={() => setPostType('article')}
                    />
                </Form.Group>

                {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
            </Form>
        </Segment>
    );
};

export default PostForm;
