// src/components/ResourceNotFound/ResourceNotFound.js

// import css
import './ResourceNotFound.css';

// import react
import { useEffect } from 'react';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import component
import Footer from '../Footer';
import GameComponent from './GameComponent';

// import react-router-dom
import { useHistory } from 'react-router-dom';

//? ResourceNotFound component
const ResourceNotFound = () => {
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
    if (currentPage !== "rnf" || currentPage !== "account-menu") {
      setCurrentPage("rnf");
      console.log('currentPage', currentPage);
    }

    // to reset color upon clicking from shop product
    setHeaderColor('black');
    setFooterColor('black');
  }, [currentPage]);

  // invoke history
  const history = useHistory();

  return (
    <section
      className="page-section rnf"
    >
      {/* Lower ShopProduct */}
      <section className='inner rnf'>
        <figure
          onClick={_ => history.push('/')}
        >
          {/* Button to go back to home page */}
          <i className="fa-solid fa-house fa-xl" />

          <span>
            Go Back to Home Page
          </span>
        </figure>

        {/* NPM Game Package */}
        <figure className='rnf content'>
          <p>
            Hello, we currently do not have the page you're looking for.
            <br />
            <br />
            However, you may click on upper top left to go
            back to home page
            <br />
            Or you may press 'enter' to start a snake game
            &nbsp;
            <i className="fa-regular fa-face-smile-beam" />
          </p>
          <GameComponent />
        </figure>
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default ResourceNotFound;
