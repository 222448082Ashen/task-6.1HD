import React, { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();
    setResponseText('');
    try {
      const response = await fetch('http://localhost:3001/subscribeService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const result = await response.text();
      setResponseText(result);
    } catch (error) {
      setResponseText('Please try again later !');
    }
  }

  return (
    <div style={{ margin: '0 80px 20px 80px' }}>
      <h2>Sign Up For Our Daily Insider</h2>
      <Form id='newsletterForm' onSubmit={handleSubscribe}>
        <Input
          id='emailInput'
          placeholder='Enter your email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'tag',
            content: 'Subscribe',
            type: 'submit'
          }}
          actionPosition='right'
        />
      </Form>
      {responseText && <div style={{ marginTop: '15px' }} >{responseText}</div>}
    </div>
  );
}

export default NewsletterSection;