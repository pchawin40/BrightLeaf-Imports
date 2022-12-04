// src/components/auth/SignUpForm.js

// import component
import FacebookLoginComponent from '../FacebookLoginComponent';

// import context
import { useNavHeader } from '../../../../context/NavHeaderContext';

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
import { useGoogleLogin } from '@react-oauth/google';

const SignUpForm = () => {
  /**
   * Controlled inputs
   */
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { showUserModal, setShowUserModal } = useNavHeader();

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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

  //* ReCaptcha API
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

  // function to handle demo login
  const handleDemoLogin = async () => {
    const data = await dispatch(sessionActions.login('marnie@aa.io', 'password'));

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
    <form id="sign-up-form" onSubmit={onSignUp}>
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
            className="suf-submit-btn suf-submit-btn-true"
            type='submit'>
            <span>
              Sign Up
            </span>
          </button>
          :
          <button
            id="suf-submit-btn"
            className="suf-submit-btn suf-submit-btn-false"
            type='button'>
            <span>
              Sign Up
            </span>
          </button>
      }

      <section className="demo-buttons-container">
        <button
          id="lf-demo-btn"
          className="lf-submit-btn lf-submit-btn-true"
          type='button'
          onClick={handleDemoAdministratorLogin}
        >
          <span>
            Demo Administrator
          </span>
        </button>

        <button
          id="lf-demo-btn"
          className="lf-submit-btn lf-submit-btn-true"
          type='button'
          onClick={handleDemoLogin}
        >
          <span>
            Demo User
          </span>
        </button>
      </section>

      {/* Alternative Sign Up Line Break */}
      <div id="suf-asulb-container">
        <span className="line-span" />
        <span id="suf-asulb-container-text-span">
          or sign up with
        </span>
        <span className="line-span" />
      </div>

      {/* Alternative Sign Up (API Todo) */}
      <div id="suf-asu-container">
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

export default SignUpForm;
