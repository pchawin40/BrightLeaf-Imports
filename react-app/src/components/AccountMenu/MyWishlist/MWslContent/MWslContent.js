// src/components/AccountMenu/MyAccount/MWslContent/MWslContent.js

// import css
import { NavLink } from 'react-router-dom';
import './MWslContent.css';

//? MWslContent component
const MWslContent = () => {
  return (
    <section className="MWslContent AM content-outer-section">
      <section className="MWslContent AM content-inner-section">
        {/* Top */}
        <section className="cis top wishlist">
          <h1>
            My Wishlist
          </h1>
          <p>
            View favorite products you've saved to your wishlist.
          </p>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower wishlist">
          <h2>
            You haven't added any products yet.
          </h2>
          <NavLink
            to=""
          >
            Start adding products
          </NavLink>
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
export default MWslContent;
