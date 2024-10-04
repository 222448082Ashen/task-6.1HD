import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/home');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <HeaderBar />
      <Container className="login-form">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Message negative>{error}</Message>}
          <Button type="submit">Login</Button>
        </Form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default Login;