import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, resetAllAuthForms } from './../../redux/User/user.actions';

import { withRouter } from 'react-router-dom';
import './styles.scss';
import Button from './../forms/Button';
import { signInWithGoogle } from './../../firebase/utils.js';

import FormInput from './../forms/FormInput';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(currentUser) {
            resetForm();
            props.history.push('/');
        }
    }, [currentUser])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));
    }
    
        return (
            <div className="signin">
                <div className="wrap">
                    <h2>
                        Login
                    </h2>
    
                    <div className="formWrap">
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={e => setEmail(e.target.value)}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={e => setPassword(e.target.value)}
                            />

                            <Button type="submit">Login</Button>

                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

export default withRouter(SignIn);