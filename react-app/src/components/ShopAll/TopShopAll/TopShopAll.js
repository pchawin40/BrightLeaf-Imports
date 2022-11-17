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
            All Products
          </h1>
        </section>

        {/* Text */}

        {/* //? Right */}
        {/* Image */}
        <figure className="top-figure shop-all">
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668450314/Brightleaf%20Imports/102720045_614676142740747_20774271708246_nz7c6v.webp"
            alt="our-portfolio"
          />
        </figure>

        <span className="top-figure-title">
          4 | SHOP ALL
        </span>
      </figure>

    </section>
  )
};

// export default component
export default TopShopAll;
