// src/components/AccountMenu/LeftAMN/LeftAMN.js

// import context
import { useAccountMenu } from '../../../context/AccountMenuContext';

// import css
import './LeftAMN.css';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as sessionActions from '../../../store/session';
import * as userActions from '../../../store/users';

//? LeftAMN component
const LeftAMN = () => {
  /**
   * Controlled inputs
   */
  const { displayName, setDisplayName } = useAccountMenu();
  const [userPic, setUserPic] = useState("");
  const [userPicLoading, setUserPicLoading] = useState(false);

  /**
   * Selector functions
   */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    if (currentUserInfo) {
      // set display name as facebook's or google's profile name (if facebook or google)
      if (currentUserInfo.name) {
        setDisplayName(currentUserInfo.name);
      } else {
        // else set as username (default from website)
        setDisplayName(currentUserInfo.username);
      }
    }
  }, [currentUserInfo, displayName, userPic, userPicLoading]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to update image
  const updateUserPic = e => {
    const file = e.target.files[0];

    if (file) {
      setUserPic(file);
      fetchUserPic(file);
    }
  }

  // function to handle user pic changing
  const fetchUserPic = async file => {
    // set user pic loading to true while fetching
    setUserPicLoading(true);

    // if received file, set current picture url
    if (file) {
      const formData = new FormData();
      formData.append('image_sample', file);

      // fetch user pic
      const res = await fetch('/api/images/sample', {
        method: 'POST',
        body: formData
      });

      // if successful response, set the picture
      if (res.ok) {
        const currentUserPic = await res.json();

        const profile_picture = currentUserPic.image_sample;

        setUserPic(profile_picture);

        const formData = new FormData();

        formData.append("profile_picture", profile_picture);

        // call dispatch to set pic
        dispatch(userActions.thunkEditUser(formData, currentUserInfo.id))
          .then(async res => dispatch(sessionActions.thunkAPILogin(res)));
      }

      // afterward, set loading to false
      setUserPicLoading(false);
    }
  }

  // function to reset user pic
  const handleResetUserPic = () => {
    const formData = new FormData();

    formData.append("profile_picture", " ");

    dispatch(userActions.thunkEditUser(formData, currentUserInfo.id))
      .then(async res => {
        return dispatch(sessionActions.thunkAPILogin(res))
      });
  }

  return (
    <section className="left-amn-section">
      {/* Top: User */}
      <section className="user-menu left-amn-section">
        {/* Figure */}
        <figure>
          {/* User Profile */}
          {/* // TODO: To insert user profile picture */}
          {
            currentUserInfo.profile_picture.trim() !== ""
              ?
              currentUserInfo.login_by
                ?
                <img
                  src={currentUserInfo.profile_picture}
                  alt="user-profile"
                />
                :
                <figure
                  className="lamn custom outer-figure"
                  onClick={_ => document.querySelector('.left-amn-section.image-input').click()}
                >
                  <figure
                    className="lamn custom-user-pic"
                  >
                    <img
                      src={currentUserInfo.profile_picture}
                      alt="user-profile"
                    />
                  </figure>
                  {/* Container to edit picture */}
                  <figure className="um las custom edit-pic-container">
                    <figure>
                      <figure>
                        <i className="fa-solid fa-camera edit-pic" />
                      </figure>
                    </figure>
                  </figure>

                  {/* Picture dropper */}
                  <input
                    type='file'
                    accept='image/*'
                    className="left-amn-section image-input"
                    onChange={updateUserPic}
                  />
                </figure>
              :
              <figure
                onClick={_ => document.querySelector('.left-amn-section.image-input').click()}
              >
                <i className="fa-regular fa-user fa-2xl lamn-user-icon" />
                {/* Container to edit picture */}
                <figure className="um las edit-pic-container">
                  <figure>
                    <i className="fa-solid fa-camera edit-pic" />
                  </figure>
                </figure>

                {/* Picture dropper */}
                <input
                  type='file'
                  accept='image/*'
                  className="left-amn-section image-input"
                  onChange={updateUserPic}
                />
              </figure>
          }

          {/* User Profile Name */}
          <span>
            {displayName.length < 25 ? displayName : displayName.slice(0, 25) + "..."}
          </span>

          {
            // if have profile picture and is not facebook/google login
            !currentUserInfo.login_by
            &&
            currentUserInfo.profile_picture.trim() !== ""
            &&
            <span
              id="lamn-reset-photo"
              onClick={handleResetUserPic}
            >
              Reset Profile Picture
            </span>
          }
        </figure>
      </section>

      {/* Bottom: Account Nav */}
      <section className="account-nav left-amn-section">
        <ul className="user-menu left-amn-ul account-nav">
          {/* My Orders */}
          <NavLink
            to="/account/my-orders"
            className="nav-link AM"
            activeClassName="nav-link AM selected"
          >
            <li>
              My Orders
            </li>
          </NavLink>

          {/* My Addresses */}
          <NavLink
            to="/account/my-addresses"
            className="nav-link AM"
            activeClassName="nav-link AM selected"
          >
            <li>
              My Addresses
            </li>
          </NavLink>

          {/* My Wallet */}
          <NavLink
            to="/account/my-wallet"
            className="nav-link AM"
            activeClassName="nav-link AM selected"
          >
            <li>
              My Wallet
            </li>
          </NavLink>

          {/* My Wishlist */}
          <NavLink
            to="/account/my-wishlist"
            className="nav-link AM"
            activeClassName="nav-link AM selected"
          >
            <li>
              My Wishlist
            </li>
          </NavLink>

          {/* My Account */}
          <NavLink
            to="/account/my-account"
            className="nav-link AM"
            activeClassName="nav-link AM selected"
          >
            <li>
              My Account
            </li>
          </NavLink>
        </ul>
      </section>
    </section>
  );
};

// export default component
export default LeftAMN;
