// src/components/AccountMenu/MyAddresses/MyAddresses.js

// import component
import Footer from '../../Footer';
import LeftAMN from '../LeftAMN';
import MAdrContent from './MAdrContent';

// import css
import './MyAddresses.css';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import react
import { useEffect } from 'react';

//? MyAddresses component
const MyAddresses = () => {
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
      console.log('currentPage', currentPage);
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);

    // to reset color upon clicking from shop product
    setHeaderColor('black');
    setFooterColor('black');
  }, [currentPage]);

  return (
    <section className="page-section AM MAdr">
      {/* empty section */}
      <section />

      <section className="AM MAdr inner-section">
        {/* Left Account Menu Nav */}
        <LeftAMN />

        {/* MAdr content */}
        <MAdrContent />
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default MyAddresses;
