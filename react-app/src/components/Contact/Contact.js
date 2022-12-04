// src/components/Contact/Contact.js

// import css
import './Contact.css';

// import react
import { useEffect } from "react";

// import react-redux
import { useDispatch } from "react-redux";

// import context
import { useNavHeader } from "../../context/NavHeaderContext";

// import component
import Footer from "../Footer";
import MiddleContact from "./MiddleContact";
import TopContact from "./TopContact";

const Contact = () => {
  /**
   * Controlled inputs
   */
  // set background color
  const { backgroundColor, setBackgroundColor } = useNavHeader();
  const { currentPage, setCurrentPage } = useNavHeader();
  const { headerColor, setHeaderColor } = useNavHeader();
  const { footerColor, setFooterColor } = useNavHeader();

  /**
   * useEffect
   */
  useEffect(() => {
    if (currentPage !== "shopall") {
      setCurrentPage("shopall");
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);

    // to reset color upon clicking from shop product
    setHeaderColor('white');
    setFooterColor('white');
    setBackgroundColor('#484644');
  }, [currentPage]);

  return (
    <section
      className="page-section contact"
      style={{
        backgroundColor,
        transition: "background-color 1s ease"
      }}
    >
      {/* Top Contact */}
      <TopContact />

      {/* Middle Contact */}
      <MiddleContact />

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default Contact;
