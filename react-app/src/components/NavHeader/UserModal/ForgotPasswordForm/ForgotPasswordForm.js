// src/components/NavHeader/UserModal/ForgotPasswordForm/ForgotPassword.js

// import css
import './ForgotPasswordForm.css';

// import react
import { useState } from "react";
import { useDispatch } from 'react-redux';

// import libraries


//? ForgotPasswordForm component
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState('');
  const [showNullError, setShowNullError] = useState(false);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to send email (nodemailer)
  const sendEmail = async e => {
    // prevent page from refreshing
    e.preventDefault();

    if (email = '') {
      setShowError(false);
      setMessageFromServer('');
    } else {
      const res = await fetch('/api/auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
      });

      if (res.ok) {

        if (res.data === 'email not in db') {
          setShowError(true);
          setMessageFromServer('');
        } else if (res.data === "recovery email sent") {
          setShowError(false);
          setMessageFromServer("recovery email sent");
        }
      } else {
        console.log("error from sendEmail: ", res);
      }
    }
  }

  // function to update email
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form id="forgot-password-form" onSubmit={sendEmail}>
      {/* email empty: provide message cannot be empty */}
      {
        showNullError && (
          <div>
            <p> The email address cannot be null</p>
          </div>
        )
      }

      {
        showError && (
          <div>
            <p>
              That email address isn't recognized. Please try again or register for a new account.
            </p>
            {/* // TODO: to insert button for register */}
          </div>
        )
      }

      {
        messageFromServer === "recovery email sent" && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )
      }

      <div id="fpf-email-container" className="fpf-container">
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>

      <button
        id="fpf-submit-btn"
        className="fpf-submit-btn fpf-submit-btn-true"
        type='submit'
      >
        <span>
          Create Password
        </span>
      </button>
    </form>
  );
};

// export default component
export default ForgotPasswordForm;
