import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
      setError('');
    } catch (error) {
      setError('Failed to send password reset email.');
      setMessage('');
    }
  };

  return (
    <div>
      <HeaderBar />
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <h2>Forgot Password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Reset Password</Button>
        </Form>
        {message && <Message positive>{message}</Message>}
        {error && <Message negative>{error}</Message>}
      </Container>
      <FooterComponent />
    </div>
  );
};

export default ForgotPassword;