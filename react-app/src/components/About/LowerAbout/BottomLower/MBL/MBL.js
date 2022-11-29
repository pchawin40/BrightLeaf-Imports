// src/components/About/LowerAbout/BottomLower/MBL/MBL.js

// import css
import './MBL.css';

//? MBL component
const MBL = () => {
  return (
    <section className="MBL-section">
      {/* Left */}
      <section className="BL left">
        {/* Goal */}
        <section className="BL-left goal">
          <h3>
            Our Goal
          </h3>
          <p>
            Our goal at Brightleaf Imports is to not only provide our customers with uniquely hand crafted
            tables and products, but be a large scale supplier for Monkey Pod (Acacia) wood. We offer wholesale
            and individual purchasing of our raw material and will exceed the standard for any request.
          </p>

          <p>
            Brightleaf Imports has proudly partnered with One Tree Planted, a non-profit organization that
            supports global restoration. We donate a percentage of our profits each year to this environmental
            charity and aspire to give back to communities, foundations and protecting our worlds environment
            and natural resources.
          </p>
        </section>

        {/* What We Offer */}
        <section className="BL-left offer">
          <h3>
            What We Offer
          </h3>
          <p>
            Brightleaf Imports will do everything
            we can to meet your specifications of a custom order.
            We always carry coffee, dining, conference, and
            end tables in a variety of sizes at our
            warehouse that are in stock and ready for purchase.
          </p>
        </section>

      </section>

      {/* Right */}
      <section className="BL right">
        {/* Video */}
        <video
          preload="auto"
          autoPlay
          muted
          loop
          controls
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
          alt=""
          src="https://video.wixstatic.com/video/55ccf4_9a4d78a24e434293875310f019e0a649/480p/mp4/file.mp4"
        />
      </section>
    </section>
  );
};

// export default component
export default MBL;
