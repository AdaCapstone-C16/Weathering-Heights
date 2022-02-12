import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link,} from 'react-router-dom';
import '../components/stylesheets/PopUps.css';
import '../components/stylesheets/ForgotPassword.css';

export default function ForgotPassword() {
    const emailRef = useRef();
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const [loading, setLoading] = useState(false)
    
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch (error) {
            console.log(error)
            setError('Failed to reset password')

        }
        setLoading(false)
    }
    
return (
    <section>
        <Card id="reset-password-card">
            <Card.Body>
                <h2 className='popup-header text-center mb-4'> Password Reset</h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {/* {JSON.stringify(currentUser.uid)} */}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label className="popup-label">Email</Form.Label>
                        <Form.Control className="form-field" type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>    
                    <Button disabled={loading} id="password-reset-button" className="popup-label w-100 text-center mt-2" type="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link className="popup-link" to='/login'>Login</Link>
                </div>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link className="popup-link" to='/signup'>Signup</Link>
                </div>
            </Card.Body>
        </Card>
        
    </section>
    
    )
}