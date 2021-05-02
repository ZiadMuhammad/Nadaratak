import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';

import './styles.scss';


import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const Signup = props => {
    const { currentUser, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(currentUser) {
            reset();
            props.history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }
        return (
            <div className="signup">
                <div className="wrap">
                    <h2>
                        Signup
                    </h2>

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="fontWrap">
                        <form onSubmit={handleFormSubmit}>
                            <FormInput 
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full name"
                                handleChange={e => setDisplayName(e.target.value)}
                            />
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
                            <FormInput 
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                handleChange={e => setConfirmPassword(e.target.value)}
                            />
                            <Button type="submit">
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

export default withRouter(Signup);