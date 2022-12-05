// src/components/NavHeader/UserModal/ForgotPasswordForm/ForgotPassword.js

// import css
import './ForgotPasswordForm.css';

// import react
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import libraries


//? ForgotPasswordForm component
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState('');
  const [showNullError, setShowNullError] = useState(false);
  const { emailStep, setEmailStep } = useNavHeader();
  const { emailToReset, setEmailToReset } = useNavHeader();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [email, emailError]);

  // function to send email (nodemailer)
  const sendEmail = async e => {
    // prevent page from refreshing
    e.preventDefault();

    if (email === '') {
      setShowError(false);
      setMessageFromServer('');
    } else {
      const res = await fetch('/api/mail/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        })
      });

      if (res.ok) {
        // alert user to check their email
        window.alert("Your passcode confirmation have been sent to your email. Please check your email to get the passcode for next screen.")

        // set email step to next: email verification
        setEmailToReset(email);
        setEmailStep(1);
      } else {
        setEmailError("Email does not exist in our database");
      }
    }
  }

  // function to update email
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  // function to load code verification

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
        {
          emailError
          &&
          <p id="suf-errors-container fpf">
            {
              emailError
            }
          </p>
        }
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
