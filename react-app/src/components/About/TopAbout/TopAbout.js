// src/components/About/TopAbout/TopAbout.js

// import css
import './TopAbout.css';

//? TopAbout component
const TopAbout = () => {
  return (
    <section
      className="top-page-section"
    >
      {/* //* Image background */}
      <figure
        className="image-background-container about"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url("https://res.cloudinary.com/dfz7bzhoi/image/upload/v1669755793/BrightleafImports-About/About_2_lpwgu6.webp")'
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
        <section className="tps-header-section about">
          <h1>
            Our Hand-<br />Crafted Story
          </h1>
        </section>

        {/* Text */}

        {/* //? Right */}
        {/* Image */}
        <figure className="top-figure about">
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397930/Brightleaf%20Imports/55ccf4_32be0fb060b54cf5a3a60562f144d094_mv2_scdjux.webp"
            alt="about-page"
          />
        </figure>

        <span className="top-figure-title about">
          2 | ABOUT
        </span>
      </figure>

    </section>
  );
};

// export default component
export default TopAbout;
