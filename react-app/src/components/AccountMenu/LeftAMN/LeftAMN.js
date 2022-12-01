// src/components/AccountMenu/LeftAMN/LeftAMN.js

// import context
import { useAccountMenu } from '../../../context/AccountMenuContext';

// import css
import './LeftAMN.css';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../store/session';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

//? LeftAMN component
const LeftAMN = () => {
  /**
   * Controlled inputs
   */
  const { displayName, setDisplayName } = useAccountMenu();

  /**
   * Selector functions
   */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * UseEffect
   */
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
  }, [currentUserInfo, displayName]);

  return (
    <section className="left-amn-section">
      {/* Top: User */}
      <section className="user-menu left-amn-section">
        {/* Figure */}
        <figure>
          {/* User Profile */}
          {/* // TODO: To insert user profile picture */}
          {
            currentUserInfo.profile_picture
              ?
              <img
                src={currentUserInfo.profile_picture}
                alt="user-profile"
              />
              :
              <figure>
                <i className="fa-regular fa-user fa-2xl lamn-user-icon" />
                {/* Container to edit picture */}
                <figure className="um las edit-pic-container">
                  <figure>
                    <i className="fa-solid fa-camera edit-pic" />
                  </figure>
                </figure>
              </figure>
          }

          {/* User Profile Name */}
          <span>
            {displayName.length < 25 ? displayName : displayName.slice(0, 25) + "..."}
          </span>
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
