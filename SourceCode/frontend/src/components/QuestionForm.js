import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import ImageUpload from './ImageUpload';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [code, setCode] = useState('');
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageUrl !== '') {
        const done = await addDoc(collection(db, 'questions'), {
          title,
          content,
          code,
          imageUrl,
          createdAt: new Date(),
        });
        if (done) {
          window.alert('Post successfully Added!');
          setTitle('');
          setContent('');
          setCode('');
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
        placeholder='Start your question with how, what, why, etc.'
        label='Title'
        maxLength={100}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Form.TextArea
        label='Description'
        placeholder='Describe your problem'
        maxLength={500}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Form.Field>
        <label>Code</label>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />
      </Form.Field>
      <Form.Checkbox
        label='Preview'
        checked={preview}
        onChange={() => setPreview(!preview)}
      />
      {preview && (
        <div>
          <h3>Preview:</h3>
          <ReactMarkdown>{content}</ReactMarkdown>
          <pre><code>{code}</code></pre>
        </div>
      )}
      <ImageUpload onImageUpload={setImageUrl} />
      <Form.Input label='Tags' placeholder='Add up to 3 tags' />
      <Form.Button onClick={handleSubmit} primary>Post</Form.Button>
    </Form>
  );
};

export default QuestionForm;