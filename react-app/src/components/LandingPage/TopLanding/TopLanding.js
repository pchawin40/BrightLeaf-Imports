// src/components/LandingPage/TopLanding/TopLanding.js

// import css
import './TopLanding.css';

//? TopLanding component
const TopLanding = () => {
  return (
    <section id="top-landing-section">
      {/* Image background */}
      <figure
        id="background-img-container"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url("https://static.wixstatic.com/media/55ccf4_aa180e707df1406f94b0caf7b8468419~mv2.jpg/v1/fit/w_1489,h_821,q_90/55ccf4_aa180e707df1406f94b0caf7b8468419~mv2.jpg")'
        }}
      >

        {/* Title */}
        <section>
          {/* Back Figure */}
          <figure id="tls-back-figure">
            <i className="fa-solid fa-chevron-left fa-xl" />
            <span>Back</span>
          </figure>

          <figure
            id="tls-brightleaf-logo-container"
          >
            <img
              id="tls-brightleaf-logo"
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668325888/Logo_u5z7vs.png"
              alt="brightleaf-logo"
            />
          </figure>
          <h1>
            Professional Unique Direct
          </h1>
        </section>

        {/* Image Carousel */}
        <aside>
          <figure className="trs-ic-figure">
            {/* left clicker */}
            <figure className="trs-ic-inner-figure left-clicker">
              <i className="fa-solid fa-chevron-left fa-2xl" />
            </figure>

            <img
              className="trs-ic-img"
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668326915/image-gallery_dyqr4i.webp"
              alt="trs-carousel"
            />

            {/* right clicker */}
            <figure className="trs-ic-inner-figure right-clicker">
              <i className="fa-solid fa-chevron-right fa-2xl" />
            </figure>
          </figure>

          <figure id="trs-scroll-figure">
            <span>Scroll</span>
            <span className="line-span trs-scroll" />
          </figure>
        </aside>
      </figure>

    </section>
  );
};

// export default component
export default TopLanding;
