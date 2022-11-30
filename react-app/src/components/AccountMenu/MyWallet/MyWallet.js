// src/components/AccountMenu/MyWallet/MyWallet.js

// import component
import Footer from '../../Footer';
import LeftAMN from '../LeftAMN';
import MWltContent from './MWltContent';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import css
import './MyWallet.css';

// import react
import { useEffect } from 'react';

//? MyWallet component
const MyWallet = () => {
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
    <section className="page-section AM MWlt">
      {/* empty section */}
      <section />

      <section className="AM MWlt inner-section">
        {/* Left Account Menu Nav */}
        <LeftAMN />

        {/* MWlt content */}
        <MWltContent />
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default MyWallet;
