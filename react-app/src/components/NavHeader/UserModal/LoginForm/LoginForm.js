// src/components/NavHeader/userModal/LoginForm/LoginForm.js

// import css
import './LoginForm.css';

// import component
import FacebookLoginComponent from '../FacebookLoginComponent';

// import context
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import react
import React, { useEffect, useState } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { Redirect } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';
import * as keyActions from '../../../../store/keys';

// import libraries
import { useGoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const { forgotPassword, setForgotPassword } = useNavHeader();
  const { showUserModal, setShowUserModal } = useNavHeader();
  const googleMapsAPIKey = useSelector(keyActions.getMapKey);

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    if (!googleMapsAPIKey) dispatch(keyActions.getKey());

  }, [email, password, googleMapsAPIKey, errors, emailError, passwordError]);

  //* Google API: function to handle google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokenResponse.access_token}`
        }
      });


      if (res.status >= 200 && res.status < 300) {
        const googleUserData = await res.json();

        const googleUserResponse = {
          name: googleUserData.name,
          email: googleUserData.email,
          id: googleUserData.sub,
          profile_picture: googleUserData.picture,
          login_by: "google"
        }

        dispatch(sessionActions.thunkAPILogin(googleUserResponse));

        setShowUserModal(false);
      } else {
        throw new Error(`Error fetching user data with token: ${tokenResponse.access_token}`)
      }
    }
  });

  // function to handle login
  const onLogin = async (e) => {
    // TODO: To handle log in properly
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password))
      .then(res => {
        if (res) {
          res.map(data => {
            // if email error exists
            if (data.email) {
              setEmailError(data.email);
            }

            // if password error exists
            if (data.password) {
              if (data.password === 'No such user exists.') {
                setPasswordError('');
              } else {
                setPasswordError(data.password);
              }
            }
          });
        } else {
          setShowUserModal(false)
        }
      })
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
    const data = await dispatch(sessionActions.login('marnie@aa.io', 'password'))
      .then(() => setShowUserModal(false));

    // if data is return, there is an error. set the errors
    // turn modal off on successful log in
    data ? setErrors(data) : setShowUserModal(false);
  }

  // function to handle demo administrator login
  const handleDemoAdministratorLogin = async () => {
    const data = await dispatch(sessionActions.login('demo@aa.io', 'password'))
      .then(() => setShowUserModal(false));

    // if data is return, there is an error. set the errors
    // turn modal off on successful log in
    data ? setErrors(data) : setShowUserModal(false);
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
        {/* if password have error, display password error here */}
        {
          emailError
          &&
          <p id="suf-errors-container login">
            {
              emailError
            }
          </p>
        }
      </div>

      <div id="lf-password-container" className="lf-container">
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        {/* if password have error, display password error here */}
        {
          passwordError
          &&
          <p id="suf-errors-container login">
            {
              passwordError
            }
          </p>
        }
      </div>

      {/* Check if there are length in log in */}
      {
        email.length > 0 && password.length > 0
          ?
          <button
            id="lf-submit-btn"
            className="lf-submit-btn lf-submit-btn-true"
            type='submit'
          >
            <span>
              Log In
            </span>
          </button>
          :
          <button
            id="lf-submit-btn"
            className="lf-submit-btn lf-submit-btn-false"
            type='button'
          >
            <span>
              Log In
            </span>
          </button>
      }

      <section className="demo-buttons-container">
        <button
          className="lf-submit-btn lf-submit-btn-true lf-demo-btn"
          type='button'
          onClick={handleDemoAdministratorLogin}
        >
          <span>
            Demo Administrator
          </span>
        </button>

        <button
          className="lf-submit-btn lf-submit-btn-true lf-demo-btn"
          type='button'
          onClick={handleDemoLogin}
        >
          <span>
            Demo User
          </span>
        </button>
      </section>

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
        <span>
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
