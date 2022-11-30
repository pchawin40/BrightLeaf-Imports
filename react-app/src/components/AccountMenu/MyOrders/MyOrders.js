// src/components/AccountMenu/MyOrders/MyOrders.js

// import react
import { useEffect } from 'react';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import component
import Footer from '../../Footer';
import LeftAMN from '../LeftAMN';
import MOContent from './MOContent';

// import css
import './MyOrders.css';

//? MyOrders component
const MyOrders = () => {
  /**
  * Controlled inputs
  */
  const { currentPage, setCurrentPage } = useNavHeader();
  const { headerColor, setHeaderColor } = useNavHeader();
  const { footerColor, setFooterColor } = useNavHeader();

  /**
  * useEffect
  */
  useEffect(() => {
    if (currentPage !== "account-menu") {
      setCurrentPage("account-menu");
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);

    // to reset color upon clicking from shop product
    setHeaderColor('black');
    setFooterColor('black');
  }, [currentPage]);

  return (
    <section className="page-section AM MO">
      {/* empty section */}
      <section />

      <section className="AM MO inner-section">
        {/* Left Account Menu Nav */}
        <LeftAMN />

        {/* MO content */}
        <MOContent />
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default MyOrders;
