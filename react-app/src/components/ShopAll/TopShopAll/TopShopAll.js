// src/components/ShopAll/TopShopAll/TopShopAll.js

// import css
import './TopShopAll.css';

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

//? TopShopAll component
const TopShopAll = () => {
  const { backgroundColor, setBackgroundColor } = useNavHeader();

  return (
    <section
      className="top-page-section"
      style={{
        backgroundColor,
        transition: "background-color 1s ease"
      }}
    >
      {/* //* Image background */}
      <figure
        className="image-background-container shop-all"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url("https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668667180/TopPage/shop-all-pic-tinted_tmnpev.webp")'
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
        <section className="tps-header-section">
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

        <span className="top-figure-title">
          3 | PORTFOLIO
        </span>
      </figure>

    </section>
  )
};

// export default component
export default TopShopAll;
