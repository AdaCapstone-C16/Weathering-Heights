import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import '../components/stylesheets/PopUps.css';
import '../components/stylesheets/Signup.css';

export default function Signup() {
    const emailRef = useRef();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    async function handleSubmit(event) {
        event.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            console.log(error)
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            let name = (fNameRef.current.value + ' ' + lNameRef.current.value).toUpperCase()
            await signup(emailRef.current.value, passwordRef.current.value, name)
            // console.log('This user is now signed up', currentUser.uid, currentUser.displayName)
            navigate("/my-profile")
        } catch (error){
            setError('Failed to create an account')
            console.log(error)
        } 
        setLoading(false)
        
    }

    return (
    <section>
        <Card id="signup-card">
            <Card.Body>
                <h2 className='popup-header text-center mb-4'> Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='fname'>
                        <Form.Label className="popup-label">First Name</Form.Label>
                        <Form.Control className="form-field" type="text" ref={fNameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='lname'>
                        <Form.Label className="popup-label">Last Name</Form.Label>
                        <Form.Control className="form-field" type="text" ref={lNameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='email'>
                        <Form.Label className="popup-label">Email</Form.Label>
                        <Form.Control className="form-field" type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label className="popup-label">Password</Form.Label>
                        <Form.Control className="form-field" type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label className="popup-label">Password Confirmation</Form.Label>
                        <Form.Control className="form-field" type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} id="signup-button" className="w-100 text-center mt-2" type="submit">Sign Up</Button>
                </Form>

                <div className="w-100 text-center mt-2">
                    Already have an account? <Link className="popup-link" to='/login'>Login</Link>
                </div>
            </Card.Body>
        </Card>
        
    </section>
    
    )
}