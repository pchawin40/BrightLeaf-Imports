// src/components/ShippingReturns/ShippingReturns.js

// import css
import './ShippingReturns.css';

// import component
import Footer from '../Footer';

// import react
import { useEffect } from "react";

// import context
import { useNavHeader } from "../../context/NavHeaderContext";
import SRContent from './SRContent/SRContent';

//? ShippingReturns component
const ShippingReturns = () => {
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
    if (currentPage !== "shipping-returns") {
      setCurrentPage("shipping-returns");
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);

    // to reset color upon clicking from shop product
    setHeaderColor('black');
    setFooterColor('black');
  }, [currentPage]);

  return (
    <section
      className="page-section shipping-returns"
    >
      {/* Shipping Returns */}
      <SRContent />

      {/* Footer */}
      <Footer />
    </section>
  )
}

// export default component
export default ShippingReturns;
