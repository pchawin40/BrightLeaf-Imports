// src/components/AccountMenu/MyAccount/MActContent/MActContent.js

// import css
import './MActContent.css';

//? MActContent component
const MActContent = () => {
  return (
    <section className="MActContent AM content-outer-section">
      <section className="MActContent AM content-inner-section">
        {/* Top */}
        <section className="cis top account">
          <section className="cis top-inner account">
            {/* Title */}
            <h1>
              My Account
            </h1>

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
          <p>
            View and edit your personal info below.
          </p>
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
            pathocha000@gmail.com
          </p>
          <p>
            Your Login email can't be changed
          </p>

          {/* Form */}
          <form>
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
