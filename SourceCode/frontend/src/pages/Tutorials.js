import React from 'react';
import { Container } from 'semantic-ui-react';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';
import TutorialUpload from './../components/TutorialUpload';
import { useAuth } from '../context/AuthContext';

const Tutorials = () => {
    const { user } = useAuth();

    return (
        <div>
            <HeaderBar />
            <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
                <h1>Add Tutorials</h1>
                {user && <TutorialUpload />}
            </Container>
            <FooterComponent />
        </div>
    );
};

export default Tutorials;