// src/components/Portfolio/TopPortfolio/TopPortfolio.js

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import css
import './TopPortfolio.css';

//? TopPortfolio component
const TopPortfolio = () => {
  const { backgroundColor, setBackgroundColor } = useNavHeader();

  return (
    <section
      id="tp-section"
      style={{
        backgroundColor,
        transition: "background-color 1s ease"
      }}
    >
      {/* //* Image background */}
      <figure
        className="image-background-container"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url("https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397930/Brightleaf%20Imports/55ccf4_8fea206650d84f819bf656450d4cce3b_mv2_g8nxt3.webp")'
        }}
      >
        {/* //? Left */}
        {/* Company Logo */}
        <figure
          id="tls-brightleaf-logo-container"
        >
          <img
            id="tls-brightleaf-logo"
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668325888/Logo_u5z7vs.png"
            alt="brightleaf-logo"
          />
        </figure>
        <section id="tp-header-section">
          <h1>
            Our Portfolio
          </h1>
        </section>

        {/* Text */}

        {/* //? Right */}
        {/* Image */}
        <figure className="top-figure">
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668570439/Brightleaf%20Imports/customer_review_qz4hbz.webp"
            alt="our-portfolio"
          />
        </figure>
      </figure>

    </section>
  );
};

// export default component
export default TopPortfolio;
