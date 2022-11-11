// src/components/NavHeader/UserModal/UserModal.js

// import react-redux
import { useSelector } from 'react-redux';

// import css
import './UserModal.css';

// import component
import LoginForm from '../../auth/LoginForm';
import SignUpForm from './SignUpForm';

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
      <section id="user-modal-inner-section">

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

        {
          userSignUp
            ?
            <section id="ums-toggle-section">
              <p>
                Already a member?
              </p>
              <span
                onClick={_ => setUserSignUp(!userSignUp)}
              >
                Log In
              </span>
            </section>
            :
            <section id="ums-toggle-section">
              <p>
                New to this site?
              </p>
              <span
                onClick={_ => setUserSignUp(!userSignUp)}
              >
                Sign Up
              </span>
            </section>
        }

        {/* Sign Up Form */}
        {userSignUp ? <SignUpForm /> : <LoginForm />}

        {/* //! TODO: To implement sign up with facebook and google */}
      </section>
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
