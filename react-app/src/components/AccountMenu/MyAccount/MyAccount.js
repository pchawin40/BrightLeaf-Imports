// src/components/AccountMenu/MyAccount/MyAccount.js

// import component
import Footer from '../../Footer';
import LeftAMN from '../LeftAMN';
import MActContent from './MActContent';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import css
import './MyAccount.css';

// import react
import { useEffect } from 'react';

//? MyAccount component
const MyAccount = () => {
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
    <section className="page-section AM MAct">
      {/* empty section */}
      <section />

      <section className="AM MAct inner-section">
        {/* Left Account Menu Nav */}
        <LeftAMN />

        {/* MAct content */}
        <MActContent />
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default MyAccount;
