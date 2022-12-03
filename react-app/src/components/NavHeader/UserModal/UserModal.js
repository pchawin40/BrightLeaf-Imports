// src/components/NavHeader/UserModal/UserModal.js

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import css
import './UserModal.css';

// import component
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import EmailVerification from './EmailVerification';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import react
import { useEffect, useState } from 'react';

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as sessionActions from '../../../store/session';
import * as shoppingCartActions from '../../../store/shoppingCarts';

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
  const { emailStep, setEmailStep } = useNavHeader();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [currentUserInfo, emailStep]);

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

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
          {/* Home Page */}
          <li
            onClick={_ => {
              setShowUserModal(false);
              return history.push('/')
            }}
          >
            Home Page
          </li>

          {/* My Orders */}
          <li
            onClick={_ => {
              setShowUserModal(false);
              return history.push('/account/my-orders')
            }}
          >
            My Orders
          </li>

          {/* My Addresses */}
          <li
            onClick={_ => {
              setShowUserModal(false);
              return history.push('/account/my-addresses')
            }}
          >
            My Addresses
          </li>

          {/* My Wishlist */}
          <li
            onClick={_ => {
              setShowUserModal(false);
              return history.push('/account/my-wishlist')
            }}
          >
            My Wishlist
          </li>

          {/* My Account */}
          <li
            onClick={_ => {
              setShowUserModal(false);
              return history.push('/account/my-account')
            }}
          >
            My Account
          </li>
          <span className="line-span" />
          <li onClick={handleLogout}>
            Log Out
          </li>
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
                    emailStep === 0
                      ?
                      <>
                        Create New Password
                      </>
                      :
                      emailStep === 1
                        ?
                        <>
                          Enter Email Verification
                        </>
                        :
                        <>
                          Enter New Password
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
                  emailStep === 0
                    ?
                    <section id="ums-toggle-section">
                      <p id="ums-ts-cnp">
                        Please enter your email address
                      </p>
                    </section>
                    :
                    emailStep === 1
                      ?
                      <section id="ums-toggle-section">
                        <p id="ums-ts-cnp">
                          Please enter code verification
                        </p>
                      </section>
                      :
                      <section id="ums-toggle-section">
                        <p id="ums-ts-cnp">
                          Please enter new password
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
                  emailStep === 0
                    ?
                    <ForgotPasswordForm />
                    :
                    emailStep === 1
                      ?
                      <EmailVerification />
                      :
                      <>
                      </>
                  :
                  <LoginForm />
              )
            }
          </FacebookProvider>

          {/* //! TODO: To implement sign up with facebook and google */}
        </section>

        {/* Exit Modal Icon */}
        <i
          className="fa-solid fa-x fa-xl"
          onClick={_ => {
            setShowUserModal(false);
            setForgotPassword(false);
            setEmailStep(0);
            document.body.style.overflowY = "scroll"
          }}
        />
      </section>
  );
};

// export default component
export default UserModal;
