import React from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

const PricingPlans = () => {
    const navigate = useNavigate();

    const handleSubscribe = (plan) => {
        navigate('/payment', { state: { plan } });
    };

    return (
        <div>
            <HeaderBar />
            <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
                <h1>Choose Your Plan</h1>
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Card.Header>Free Plan</Card.Header>
                            <Card.Meta>$0/month</Card.Meta>
                            <Card.Description>
                                <ul>
                                    <li>Basic features</li>
                                    <li>Limited posts</li>
                                    <li>Standard support</li>
                                </ul>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button basic color='green' onClick={() => handleSubscribe('free')}>
                                Current Plan
                            </Button>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>Premium Plan</Card.Header>
                            <Card.Meta>$9.99/month</Card.Meta>
                            <Card.Description>
                                <ul>
                                    <li>Advanced features</li>
                                    <li>Unlimited posts</li>
                                    <li>Priority support</li>
                                    <li>Custom themes</li>
                                    <li>Analytics dashboard</li>
                                </ul>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color='blue' onClick={() => handleSubscribe('premium')}>
                                Subscribe
                            </Button>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Container>
            <FooterComponent />
        </div>
    );
};

export default PricingPlans;