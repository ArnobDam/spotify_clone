import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

const SignupForm = () => {

    const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
            .catch(async (res) => {
            let data;
            try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
            } catch {
            data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
    <form className="signupForm" onSubmit={handleSubmit}>
        <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label id="signupLabel">
            Email
        </label>
            <input
            id ="signupInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        
        <label id="signupLabel">
            Username
        </label>
            <input
            id ="signupInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        
        <label id="signupLabel">
            Password
        </label>
            <input
            id ="signupInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        
        <label id="signupLabel">
            Confirm Password
        </label>
            <input
            id ="signupInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        
        <button type="submit">Sign Up</button>
    </form>
    )
};

export default SignupForm;