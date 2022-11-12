// src/components/NavHeader/UserModal/ForgotPasswordForm/ForgotPassword.js

// import css
import './ForgotPasswordForm.css';

// import react
import { useState } from "react";

//? ForgotPasswordForm component
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  // function to update email
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  // function to handle create password
  const handleCreatePassword = e => {
    // prevent page from refreshing
    e.preventDefault();

    // check if email exists in database
  }

  return (
    <form id="forgot-password-form" onSubmit={handleCreatePassword}>
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
