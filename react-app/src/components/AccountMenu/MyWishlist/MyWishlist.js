// src/components/AccountMenu/MyWishlist/MyWishlist.js

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import component
import Footer from '../../Footer';
import LeftAMN from '../LeftAMN';
import MWslContent from './MWslContent';

// import css
import './MyWishlist.css';

// import react
import { useEffect } from 'react';

//? MyWishlist component
const MyWishlist = () => {
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
    <section className="page-section AM MWsl">
      {/* empty section */}
      <section />

      <section className="AM MO inner-section">
        {/* Left Account Menu Nav */}
        <LeftAMN />

        {/* MWsl content */}
        <MWslContent />
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default MyWishlist;
