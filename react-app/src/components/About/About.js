// src/components/About/About.js
// import component
import Footer from "../Footer";
import TopAbout from "./TopAbout";

// import context
import { useNavHeader } from "../../context/NavHeaderContext";

// import react
import { useEffect } from "react";

//? About component
const About = () => {
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
    if (currentPage !== "about") {
      setCurrentPage("about");
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
      className="page-section about"
      style={{
        backgroundColor,
        transition: "background-color 1s ease"
      }}
    >

      {/* Top About */}
      <TopAbout />

      {/* Lower About */}

      {/* Footer */}
      <Footer />
    </section>
  );
}

// export default component
export default About;
