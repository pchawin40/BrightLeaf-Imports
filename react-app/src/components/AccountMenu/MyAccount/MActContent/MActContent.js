// src/components/AccountMenu/MyAccount/MActContent/MActContent.js

// import css
import './MActContent.css';

// import store
import * as sessionActions from '../../../../store/session';
import * as userActions from '../../../../store/users';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

//? MActContent component
const MActContent = () => {
  /**
   * Selector functions
   */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled inputs
   */
  const [username, setUsername] = useState(
    currentUserInfo && currentUserInfo.username ? currentUserInfo.username : ""
  );

  const [usernameLength, setUsernameLength] = useState(
    username ? username.length : 0
  );

  const [email, setEmail] = useState(
    currentUserInfo && currentUserInfo.email ? currentUserInfo.email : ""
  );

  const [emailLength, setEmailLength] = useState(
    email ? email.length : 0
  );

  const [emailError, setEmailError] = useState("");

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  },
    [
      username,
      usernameLength,
      email,
      emailLength,
      emailError
    ]
  );

  // invoke dispatch
  const dispatch = useDispatch();

  // function to update username
  const updateUsername = e => {
    setUsername(e.target.value);
    setUsernameLength(e.target.value.length);
  }

  // function to update email
  const updateUserEmail = e => {
    setEmail(e.target.value);
    setEmailLength(e.target.value.length);
  }

  // function to update user information
  const handleUserEdit = e => {
    // prevent page from refreshing
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);

    setEmailError("");

    // call on thunk to edit user information
    dispatch(userActions.thunkEditUser(formData, currentUserInfo.id))
      .then(res => {
        if (res.errors) {
          setEmailError(res.errors[0].email);

          throw new Error(res.errors[0].email);
        }

        return res;
      })
      .then(async res => {
        dispatch(sessionActions.thunkGetNewSessionInfo(res.email))
      })
      .catch(e => {
        //! leave this here to let user know the error
        console.log(e);
      })
  }

  // function to discard inputted user information
  const handleDiscardUserInfo = () => {
    // reset username and email
    setUsername(currentUserInfo.username);
    setEmail(currentUserInfo.email);
  }

  // function to load button containers
  const loadButtonContainers = () => {
    return (
      <>
        {/* Discard */}
        <button
          type="button"
          className={`cis button discard ${checkButtonsReady()}`}
          onClick={handleDiscardUserInfo}
        >
          Discard
        </button>

        {/* Update Info */}
        <button
          type={`${checkButtonsReady() ? "submit" : "button"}`}
          className={`cis button update ${checkButtonsReady()}`}
        >
          Update Info
        </button>
      </>
    )
  }

  // function to check if button is available or not
  const checkButtonsReady = () => {
    return (
      usernameLength > 0 &&
      emailLength > 0 &&
      (username.trim() !== currentUserInfo.username.trim() ||
        email.trim() !== currentUserInfo.email.trim())
    );
  };

  return (
    <section className="MActContent AM content-outer-section">
      <section className="MActContent AM content-inner-section">
        {/* Top */}
        <section className="cis top account">
          <section className="cis top-inner account">
            <section className="title-container">
              {/* Title */}
              <h1>
                My Account
              </h1>
              <p>
                View and edit your personal info below.
              </p>
            </section>

            {/* Buttons Container */}
            <form
              onSubmit={handleUserEdit}
            >
              <section className="buttons-container">
                {
                  loadButtonContainers()
                }
              </section>
            </form>
          </section>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower account">
          {/* Account */}
          <h2>
            Account
          </h2>
          <p>
            Update your personal information.
          </p>

          {/* Login Email */}
          <p className="cis la email-subheader">
            Login Email:
          </p>
          <p className="cis la user-email">
            {currentUserInfo.email}
          </p>

          {/* Form */}
          <form
            onSubmit={handleUserEdit}
          >
            {
              !currentUserInfo.login_by
              &&
              <>
                {/* User Name */}
                <figure>
                  <label
                    htmlFor="username"
                  >
                    User Name
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={updateUsername}
                  />
                </figure>

                {/* Email */}
                <figure>
                  <label
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={updateUserEmail}
                  />

                  {
                    emailError
                    &&
                    <p className="cis email-error">
                      {
                        emailError
                      }
                    </p>
                  }
                </figure>
              </>
            }

            {/* Buttons Container */}
            <section className="buttons-container form">
              {
                loadButtonContainers()
              }
            </section>
          </form>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>
      </section>
    </section >
  )
};

// export default component
export default MActContent;
