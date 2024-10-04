import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'semantic-ui-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (result.error) {
            setError(result.error.message);
            setProcessing(false);
        } else {
            console.log(result.paymentMethod);
            // Simulate Payment
            setTimeout(() => {
                setProcessing(false);
                navigate('/home');
                alert('Payment successful!');
            }, 2000);
        }
    };

    return (
        <div>
            <HeaderBar />
            <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
                <h1>Payment for {location.state?.plan} Plan</h1>
                <Form onSubmit={handleSubmit}>
                    <CardElement />
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    <Button type="submit" disabled={!stripe || processing} style={{ marginTop: '20px' }}>
                        {processing ? 'Processing...' : 'Pay'}
                    </Button>
                </Form>
            </Container>
            <FooterComponent />
        </div>
    );
};

export default Payment;