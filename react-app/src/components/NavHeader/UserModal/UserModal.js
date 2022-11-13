// src/components/NavHeader/UserModal/UserModal.js

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import css
import './UserModal.css';

// import component
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import react
import { useState } from 'react';

// import store
import * as sessionActions from '../../../store/session';

// import libraries
import { FacebookProvider } from 'react-facebook';


//? UserModal component
const UserModal = () => {
  // load data
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  // turn body overflow off on opening
  document.body.style.overflowY = !currentUserInfo ? "hidden" : "scroll"

  /**
   * controlled inputs
   */
  const [userSignUp, setUserSignUp] = useState(false);
  const { forgotPassword, setForgotPassword } = useNavHeader();
  const { showUserModal, setShowUserModal } = useNavHeader();

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle log out
  const handleLogout = async (e) => {
    await dispatch(sessionActions.logout());
  };

  return (
    currentUserInfo
      ?
      <section
        id="logged-user-modal-section"
      >
        <ul id="logged-ums-ul">
          <li>My Orders</li>
          <li>My Addresses</li>
          <li>My Wallet</li>
          <li>My Wishlist</li>
          <li>My Account</li>
          <span className="line-span" />
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </section>
      :
      <section
        id="user-modal-section"
      >
        <section
          id="user-modal-inner-section"
          className={`user-modal-inner-section-${forgotPassword}`}
        >
          <h1>
            {
              userSignUp
                ?
                <>
                  Sign Up
                </>
                :
                (
                  forgotPassword ?
                    <>
                      Create New Password
                    </>
                    :
                    <>
                      Log In
                    </>
                )
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
              (
                forgotPassword
                  ?
                  <section id="ums-toggle-section">
                    <p id="ums-ts-cnp">
                      Please enter your email address
                    </p>
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
              )
          }

          <FacebookProvider
            appId='569720507786195'
          >
            {/* Sign Up Form */}
            {userSignUp
              ?
              <SignUpForm />
              :
              (
                forgotPassword
                  ?
                  <ForgotPasswordForm />
                  :
                  <LoginForm />
              )
            }
          </FacebookProvider>

          {/* //! TODO: To implement sign up with facebook and google */}
        </section>
        <i
          className="fa-solid fa-x fa-xl"
          onClick={_ => {
            setShowUserModal(false);
            setForgotPassword(false);
            document.body.style.overflowY = "scroll"
          }}
        />
      </section>
  );
};

// export default component
export default UserModal;
