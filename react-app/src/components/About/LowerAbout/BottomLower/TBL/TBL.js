// src/components/About/LowerAbout/BottomLower/TBL/TBL.js

// import css
import './TBL.css';

//? TBL component
const TBL = () => {
  return (
    <section className="TBL-section">
      {/* Left */}
      <section className="BL left">
        {/* Video */}
        <video
          preload="auto"
          autoPlay
          muted
          loop
          controls
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
          alt=""
          src="https://video.wixstatic.com/video/55ccf4_3781d7a19f3e45f6af8724ab52bb8fa3/480p/mp4/file.mp4"
        />
      </section>

      {/* Right */}
      <section className="BL right">
        <section className="BL-right story">
          {/* Our Story */}
          <h3>
            Our Story
          </h3>
          <p>
            When it comes to Brightleaf Imports you work directly with our ownership team, who then
            work with the craftsmen who create our heirloom quality pieces. In addition to our
            highly-customizable made to order products and raw material, our team at Brightleaf
            Imports is dedicated to feature a broad selection of uniquely designed products and
            raw material, our family at Brightleaf Imports is dedicated to feature a broad selection
            of uniquely designed products that we have in inventory. Brightleaf Imports also carries
            a wide variety of uniquely crafted wood slabs in different sizes and dimensions that are
            available for individual and wholesale purchase.
          </p>
        </section>
      </section>
    </section>
  );
};

// export default component
export default TBL;
