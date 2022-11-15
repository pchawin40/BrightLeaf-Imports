// src/components/NavRight/NavModal/NavModalLeft/NavModalLeft.js

// import css
import './NavModalLeft.css';

//? NavModalLeft component
const NavModalLeft = () => {
  return (
    <section id="nml-section">
      {/* Nav Modal: Left: Top */}
      <section id="nml-top">
        <figure
          id="nml-feature-info-figure"
          style={{
            backgroundSize: 'cover',
            backgroundImage: 'url("https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668497062/Brightleaf%20Imports/55ccf4_02e30e2e8f32449c80d78b4160d9019d_mv2_bygivu.webp")'
          }}
        >
          <section>
            <h4 id="nmlfif-title">
              Brightleaf Imports
            </h4>
          </section>

          <section>
            <h4 id="nmlfif-our-pieces">
              Our Pieces
            </h4>
            <span>
              Coffee Table
            </span>
          </section>
        </figure>
        {/* Company Name */}
        {/* Our Pieces */}
      </section>

      {/* Nav Modal: Left: Lower */}
      <section id="nml-lower">
        {/* Nav Modal: Left: Lower: Left */}
        <section id="nml-lower-left">
          {/* Contact Information */}
          <figure
            id="nml-contact-info-figure"
            style={{
              backgroundSize: 'cover',
              backgroundImage: 'url("https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668496480/Brightleaf%20Imports/55ccf4_858a7154b0354293881442b3bf585f75_mv2_yonyyv.webp")'
            }}
          >
            <p>
              13402 247th AVE SE <br />
              MONROE <br />
              WASHINGTON, 98272 <br />
              T: 415.442.4800 <br />
              INFO@BRIGHTLEAFIMPORTS.COM <br />
            </p>
          </figure>
        </section>

        {/* NavModal: Left: Lower: Right */}
        <section id="nml-lower-right">
          {/* Logo */}
          <figure id="nml-section-inner-figure">
            <img
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668463952/3_BLI-white-Tranpsparent_1_gnabvc.webp"
              alt="brightleafs import logo"
            />
          </figure>
        </section>
      </section>

    </section>
  );
};

// export default component
export default NavModalLeft;
