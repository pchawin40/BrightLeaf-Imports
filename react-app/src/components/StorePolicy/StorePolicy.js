// src/components/StorePolicy/StorePolicy.js

// import css
import './StorePolicy.css';

// import react
import { useEffect } from "react";

// import context
import { useNavHeader } from "../../context/NavHeaderContext";
import { useProduct } from "../../context/ProductContext";

// import component
import Footer from "../Footer";
import SPContent from "./SPContent";

//? StorePolicy component
const StorePolicy = () => {
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
    if (currentPage !== "store-policy") {
      setCurrentPage("store-policy");
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);

    // to reset color upon clicking from shop product
    setHeaderColor('black');
    setFooterColor('black');
  }, [currentPage]);

  return (
    <section
      className="page-section store-policy"
    >
      {/* Store Policy */}
      <SPContent />

      {/* Footer */}
      <Footer />
    </section>
  );
}

// export default component
export default StorePolicy;
