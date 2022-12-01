// src/components/AccountMenu/MyAccount/MActContent/MActContent.js

// import css
import './MActContent.css';

// import store
import * as sessionActions from '../../../../store/session';
import { useSelector } from 'react-redux';

//? MActContent component
const MActContent = () => {
  /**
   * Selector functions
   */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

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
            <section className="buttons-container">
              {/* Discard */}
              <button className="cis button discard">
                Discard
              </button>

              {/* Update Info */}
              <button className="cis button update">
                Update Info
              </button>
            </section>
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
          <p>
            Your Login email can't be changed
          </p>

          {/* Form */}
          <form>
            {
              !currentUserInfo.login_by
              &&
              <>
                {/* User Name */}
                <figure>
                  <label>
                    User Name
                  </label>
                  <input />
                </figure>

                {/* Phone */}
                <figure>
                  <label>
                    Phone
                  </label>
                  <input />
                </figure>
              </>
            }

            {/* Buttons Container */}
            <section className="buttons-container form">
              {/* Discard */}
              <button className="cis button discard">
                Discard
              </button>

              {/* Update Info */}
              <button className="cis button update">
                Update Info
              </button>
            </section>
          </form>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>
      </section>
    </section>
  )
};

// export default component
export default MActContent;
