// src/components/auth/SignUpForm.js

// import css
import './SignUpForm.css';

// import react-redux
import { useSelector, useDispatch } from 'react-redux'

// improt react
import { useEffect, useRef, useState } from 'react';

// import react-router-dom
import { Redirect } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';

// import libraries
import ReCAPTCHA from "react-google-recaptcha";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length > 0) {
      errors.map(error => {
        if (error.email) {
          setEmailError(error.email);
        }
      });
    }
  }, [errors]);

  const captchaRef = useRef();

  const onSignUp = async (e) => {
    // prevent page from refreshing
    e.preventDefault();

    // encapsulate captcha ref capsule
    const token = captchaRef.current.getValue();
    setValidToken(false);

    // reset captcha ref
    captchaRef.current.reset();

    // reset errors
    setErrors([]);
    setPasswordError("");

    // check if password matches
    if (password === repeatPassword) {
      const data = await dispatch(sessionActions.signUp(email, password));

      if (data) {
        setErrors(data)
      }
    } else {
      setPasswordError("Password do not match. Please try again.")
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id="sign-up-form" onSubmit={onSignUp}>
      {/* <div id="suf-errors-container">
        {Object.values(errors).map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div id="suf-email-container" className="suf-container">
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
        {/* if email have error, display email error here */}
        {
          emailError
          &&
          <p id="suf-errors-container">
            {
              emailError
            }
          </p>
        }
      </div>
      <div id="suf-pw-container" className="suf-container">
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div id="suf-rpw-container" className="suf-container">
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        {/* if password have error, display password error here */}
        {
          passwordError
          &&
          <p id="suf-errors-container">
            {
              passwordError
            }
          </p>
        }
      </div>

      {/* ReCaptcha Verification */}
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        ref={captchaRef}
        onChange={_ => setValidToken(true)}
      />

      {
        validToken
          ?
          <button
            id="suf-submit-btn"
            className="suf-submit-btn-true"
            type='submit'>
            <span>
              Sign Up
            </span>
          </button>
          :
          <button
            id="suf-submit-btn"
            className="suf-submit-btn-false"
            type='button'>
            <span>
              Sign Up
            </span>
          </button>
      }

      <button
        id="suf-submit-btn"
        className="suf-submit-btn-true"
        type='submit'>
        <span>
          Demo User
        </span>
      </button>

      {/* Alternative Sign Up Line Break */}
      <div id="suf-asulb-container">
        <span>
          or sign up with
        </span>
      </div>

      {/* Alternative Sign Up (API Todo) */}
      <div id="suf-asu-container">
        <span>
          F
        </span>
        <span>
          G
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
