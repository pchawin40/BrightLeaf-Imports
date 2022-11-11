// src/components/NavHeader/UserModal/UserModal.js

// import react-redux
import { useSelector } from 'react-redux';

// import css
import './UserModal.css';

// import component
import LoginForm from '../../auth/LoginForm';
import SignUpForm from '../../auth/SignUpForm';

// import store
import * as sessionActions from '../../../store/session';
import { useState } from 'react';

//? UserModal component
const UserModal = ({ setShowUserModal }) => {
  // turn body overflow off on opening
  document.body.style.overflow = "hidden"

  // load data
  // const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * controlled inputs
   */
  const [userSignUp, setUserSignUp] = useState(true)

  // function to handle switch of userStep
  const handleSwitch = () => {

  };

  return (
    <section id="user-modal-section">
      <h1>
        {
          userSignUp
            ?
            <>
              Sign Up
            </>
            :
            <>
              Log In
            </>
        }
      </h1>

      <p>
        Already a member?
        <span
          onClick={_ => setUserSignUp(!userSignUp)}
        >
          {
            userSignUp
              ?
              <>
                Log In
              </>
              :
              <>
                Sign Up
              </>
          }
        </span>
      </p>

      {/* Sign Up Form */}
      {userSignUp ? <SignUpForm /> : <LoginForm />}

      {/* //! TODO: To implement sign up with facebook and google */}
      <i
        className="fa-solid fa-x fa-xl"
        onClick={_ => {
          setShowUserModal(false)
          document.body.style.overflowY = "scroll"
        }}
      />
    </section>
  );
};

// export default component
export default UserModal;
