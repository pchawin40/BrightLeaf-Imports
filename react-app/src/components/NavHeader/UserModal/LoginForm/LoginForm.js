// src/components/NavHeader/userModal/LoginForm/LoginForm.js

// import css
import './LoginForm.css';

// import component
import FacebookLoginComponent from '../../../../facebooklogin';

// import context
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import react
import React, { useState } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { Redirect } from 'react-router-dom';

// import store
import { login } from '../../../../store/session';

// import libraries
import FB from "react-facebook-login";
import { useGoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { forgotPassword, setForgotPassword } = useNavHeader();

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  //* Google API: function to handle google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

  // function to handle login
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  // function to update email
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  // function to update password
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  // function to handle demo login
  const handleDemoLogin = async () => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  //* Facebook Login
  const handleFacebookLogin = () => {

    // response:
    // {
    //   status: 'connected',
    //     authResponse: {
    //     accessToken: '...',
    //       expiresIn: '...',
    //         signedRequest: '...',
    //           userID: '...'
    //   }
    // }
  }

  return (
    <form id="login-form" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div id="lf-email-container" className="lf-container">
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>

      <div id="lf-password-container" className="lf-container">
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
      </div>

      <button
        id="lf-submit-btn"
        className="lf-submit-btn lf-submit-btn-true"
        type='submit'
      >
        <span>
          Log In
        </span>
      </button>

      <button
        id="lf-demo-btn"
        className="lf-submit-btn lf-submit-btn-true"
        type='submit'>
        <span>
          Demo User
        </span>
      </button>

      {/* Forgot Password */}
      <section id="lf-fpw-container">
        <button
          id="lf-fpw-btn"
          type="button"
          onClick={_ => {
            setForgotPassword(true)
            
          }}
        >
          Forgot password?
        </button>
      </section>

      <div id="lf-asulb-container">
        <span className="line-span" />
        <span id="lf-asulb-container-text-span">
          or log in with
        </span>
        <span className="line-span" />
      </div>

      {/* Alternative Sign Up (API Todo) */}
      <div id="lf-asu-container">
        {/* Facebook Login API */}
        <span
          onClick={handleFacebookLogin}
        >
          <FacebookLoginComponent />
        </span>

        {/* Google Login API */}
        <span>
          <figure
            id="google-login-img-figure"
            onClick={() => handleGoogleLogin()}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
              alt="google-login"
              id="google-login-img"
            />
          </figure>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
