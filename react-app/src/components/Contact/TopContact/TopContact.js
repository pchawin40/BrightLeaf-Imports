// src/components/Contact/TopContact/TopContact.js

// import css
import './TopContact.css';

//? TopContact component
const TopContact = () => {
  return (
    <section
      className="top-page-contact"
    >
      {/* //* Image background */}
      <figure
        className="image-background-container contact"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url("https://res.cloudinary.com/dfz7bzhoi/image/upload/v1669777957/BrightleafImports-Contact/Contact_qesyrx.webp")'
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
            Let's Talk
          </h1>
        </section>

        {/* Text */}

        {/* //? Right */}
        {/* Image */}
        <figure className="top-figure about">
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1669777802/BrightleafImports-Contact/55ccf4_4544a9eb13fb40b69cf2bf25453905bd_mv2_zobjog_xkfas1.webp"
            alt="about-page"
          />
        </figure>

        <span className="top-figure-title contact">
          5 | CONTACT
        </span>
      </figure>

    </section>
  );
};

// export default component
export default TopContact;
