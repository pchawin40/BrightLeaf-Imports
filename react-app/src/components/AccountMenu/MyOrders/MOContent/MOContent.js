// src/components/AccountMenu/MyOrders/MOContent/MOContent.js

// import css
import { NavLink } from 'react-router-dom';
import './MOContent.css';

//? MOContent component
const MOContent = () => {
  return (
    <section className="MOContent AM content-outer-section">
      <section className="MOContent AM content-inner-section">
        {/* Top */}
        <section className="cis top orders">
          <h1>
            My Orders
          </h1>
          <p>
            View your order history or check the status of a recent order
          </p>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower orders">
          <h2>
            You haven't placed any orders yet.
          </h2>
          <NavLink
            to=""
          >
            Start Browsing
          </NavLink>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Empty Section */}
        <section />
      </section>
    </section>
  );
}

// export default component
export default MOContent;
