import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Comment } from 'semantic-ui-react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

const SecureMessaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
  
    if (!user) {
      alert('You must be logged in to send a message');
      return;
    }
  
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      createdAt: new Date(),
      userId: user.uid,
      userName: user.displayName || user.email
    });
  
    setNewMessage('');
  };
  

  return (
    <div>
      <HeaderBar />
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <h1>Secure Messaging</h1>
        <Comment.Group>
          {messages.map(message => (
            <Comment key={message.id}>
              <Comment.Content>
                <Comment.Author as='a'>{message.userName}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.createdAt.toDate().toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
        <Form onSubmit={handleSubmit}>
          <Form.TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
          />
          <Button type='submit' content='Send' labelPosition='left' icon='edit' primary />
        </Form>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default SecureMessaging;