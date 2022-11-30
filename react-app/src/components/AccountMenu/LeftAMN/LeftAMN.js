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

          {/* User Profile Name */}
          {displayName}
        </figure>
      </section>

      {/* Bottom: Account Nav */}
      <section className="account-nav left-amn-section">

      </section>
    </section>
  );
};

// export default component
export default LeftAMN;
