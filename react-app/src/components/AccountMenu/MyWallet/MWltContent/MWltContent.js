// src/components/AccountMenu/MyWallet/MWltContent/MWltContent.js

// import css
import { NavLink } from 'react-router-dom';
import './MWltContent.css';

//? MWltContent component
const MWltContent = () => {
  return (
    <section className="MWltContent AM content-outer-section">
      <section className="MWltContent AM content-inner-section">
        {/* Top */}
        <section className="cis top wallet">
          <h1>
            My Wallet
          </h1>
          <p>
            Save your credit and debit card details for faster checkout.
          </p>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower wallet">
          <h2>
            You Haven’t Saved Any Cards Yet
          </h2>
          <p>
            Securely save your payment details when you place an order at checkout.
          </p>
          <NavLink
            to=""
          >
            Add New Card
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
export default MWltContent;
