import React from 'react';
import { Input, Button, Menu } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HeaderBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <Menu secondary style={{ /* ... existing styles ... */ }}>
            <Menu.Item header as={"h3"}>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                    DEV@Deakin
                </Link>
            </Menu.Item>
            <Menu.Menu style={{ padding: '10px 10px' }} position='right'>
                <Input style={{ margin: '0 5px' }} action={{ icon: 'search' }} size='small' placeholder='Search any item...' />
                <Link to="/plans">
                    <Button style={{ margin: '0 5px' }} size='small'>Plans</Button>
                </Link>
                <Link to="/find-questions">
                    <Button style={{ margin: '0 5px' }} size='small'>Questions</Button>
                </Link>
                {user ? (
                    <>
                        <Link to="/tutorials">
                            <Button style={{ margin: '0 5px' }} size='small'>Tutorials</Button>
                        </Link>
                        <Link to="/new-post">
                            <Button style={{ margin: '0 5px' }} size='small'>Post</Button>
                        </Link>
                        <Link to="/messaging">
                            <Button style={{ margin: '0 5px' }} size='small'>Messages</Button>
                        </Link>
                        <Button style={{ margin: '0 5px' }} onClick={handleLogout} primary size='small'>Logout</Button>
                    </>
                ) : (
                    <Link to="/login">
                        <Button style={{ margin: '0 5px' }} primary size='small'>Login</Button>
                    </Link>
                )}
            </Menu.Menu>
        </Menu>
    );
}

export default HeaderBar;