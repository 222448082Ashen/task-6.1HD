import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import ImageUpload from './ImageUpload';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageUrl !== '') {
        const done = await addDoc(collection(db, 'articles'), {
          title,
          content,
          imageUrl,
          createdAt: new Date(),
        });
        if (done) {
          window.alert('Post successfully Added!');
          setTitle('');
          setContent('');
          setImageUrl('');
        }
      } else {
        window.alert('Please upload an image!');
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Form>
      <Form.Input
        placeholder='Enter a descriptive title'
        label='Title'
        maxLength={100}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Form.TextArea
        label='Abstract'
        placeholder='Enter a 1-paragraph abstract'
        maxLength={500}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Form.TextArea
        label='Article Text'
        placeholder='Enter the article text'
        maxLength={500}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <ImageUpload onImageUpload={setImageUrl} />
      <Form.Input label='Tags' placeholder='Add up to 3 tags' />
      <Form.Button onClick={handleSubmit} primary>Post</Form.Button>
    </Form>
  );
};

export default ArticleForm;
