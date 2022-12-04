// src/components/NavHeader/UserModal/ResetPasswordForm/ResetPasswordForm.js

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import context
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import css
import './ResetPasswordForm.css';

// import store
import * as userActions from '../../../../store/users';
import * as sessionActions from '../../../../store/session';

//? ResetPasswordForm component
const ResetPasswordForm = () => {

  /**
   * Controlled inputs
   */
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationLength, setPasswordConfirmationLength] = useState(0);
  const [passwordError, setPasswordError] = useState(null);
  const { emailToReset, setEmailToReset } = useNavHeader();

  /**
   * Selector functions
   */
  const currentUserByEmail = useSelector(userActions.getCurrentUserByEmail(emailToReset));

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    if (
      passwordLength > 0
      &&
      passwordConfirmationLength > 0
      &&
      !validatePassword()
    ) {
      setPasswordError("Password does not match");
    } else {
      setPasswordError("");
    }
  }, [
    password,
    passwordLength,
    passwordConfirmation,
    passwordConfirmationLength,
    passwordError
  ]);

  /**
   * Updating controlled inputs function
   */
  // function to update password
  const updatePassword = e => {
    setPassword(e.target.value);
    setPasswordLength(e.target.value.length);
  };

  // function to update password confirmation
  const updatePasswordConfirmation = e => {
    setPasswordConfirmation(e.target.value);
    setPasswordConfirmationLength(e.target.value.length);
  };

  /**
   * Validating controlled inputs function
   */
  const validatePassword = () => {
    if (
      passwordLength > 0
      &&
      passwordConfirmationLength > 0
      &&
      password === passwordConfirmation
    ) {
      return true;
    }
    return false;
  }

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle changing to new password
  const handlePasswordChange = () => {
    if (validatePassword()) {
      // grab password
      const formData = new FormData();

      formData.append("password", password);

      // call on dispatch to update current user password
      // grab the new information afterward
      dispatch(userActions.thunkEditUser(formData, currentUserByEmail.id))
        .then(async res => dispatch(sessionActions.thunkAPILogin(res)));
    } else {
      setPasswordError("Password does not match");
    }
  };

  return (
    <form id="forgot-password-form" className="rpf" onSubmit={handlePasswordChange}>
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

      <div id="lf-password-container" className="lf-container">
        <label htmlFor='password'>Password Confirmation</label>
        <input
          name='passwordConfirmation'
          type='password'
          value={passwordConfirmation}
          onChange={updatePasswordConfirmation}
        />
      </div>

      <button
        id="fpf-submit-btn"
        className="fpf-submit-btn fpf-submit-btn-true"
        type='submit'
      >
        <span>
          Change Password
        </span>
      </button>
    </form>
  );
};

// export default component
export default ResetPasswordForm;
