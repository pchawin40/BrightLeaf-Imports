// src/components/AccountMenu/MyAddresses/MAdrContent/MAdrContent.js

// import css
import { NavLink } from 'react-router-dom';
import './MAdrContent.css';

//? MAdrContent component
const MAdrContent = () => {
  return (
    <section className="MAdrContent AM content-outer-section">
      <section className="MAdrContent AM content-inner-section">
        {/* Top */}
        <section className="cis top address">
          <h1>
            My Addresses
          </h1>
          <p>
            Add and manage the addresses you use often.
          </p>
        </section>
        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower address">
          <h2>
            You haven't saved any addresses yet.
          </h2>
          {/* // TODO: To add address later */}
          <NavLink
            to=""
          >
            Add New Address
          </NavLink>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>
      </section>
    </section>
  );
};

// export default component
export default MAdrContent;
