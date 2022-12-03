// src/components/NavHeader/UserModal/EmailVerfication/EmailVerification.js

// import react
import { useEffect, useState } from 'react';

// import context
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import css
import './EmailVerification.css';

//? EmailVerification component
const EmailVerification = () => {

  /**
   * Controlled inputs
   */
  const [codeVerification, setCodeVerification] = useState("");
  const [codeVerificationError, setCodeVerificationError] = useState("");
  const { emailStep, setEmailStep } = useNavHeader();

  /**
   * UseEffect
   */
  useEffect(() => {
    // nothing for now
  }, [codeVerification]);

  // function to update code verification
  const updateCodeVerification = e => {
    setCodeVerification(e.target.value);
  }

  // function to verify email verification code
  const handleVerifyEmailCode = e => {
    // prevent page from refreshing
    e.preventDefault();

    // check if code is correct: (for test purpose: 1234 is the code)
    if (codeVerification === "1234") {
      setEmailStep(2);
    } else {
      setCodeVerificationError("Code entered is not correct")
    }
  }

  return (
    <form id="forgot-password-form" onSubmit={handleVerifyEmailCode}>
      <div id="fpf-email-container" className="fpf-container">
        <input
          name='email'
          type='text'
          value={codeVerification}
          onChange={updateCodeVerification}
        />
        {
          codeVerificationError
          &&
          <p id="suf-errors-container fpf">
            {
              codeVerificationError
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
          Submit Code Verification
        </span>
      </button>
    </form>
  );
};

// export default component
export default EmailVerification;
