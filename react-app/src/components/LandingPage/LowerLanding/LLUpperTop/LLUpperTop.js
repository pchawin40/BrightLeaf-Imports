// src/components/LandingPage/LowerLanding/LLUpperTop/LLUpperTop.js

// import css
import './LLUpperTop.css';

//? LLUpperTop component
const LLUpperTop = () => {
  return (
    <section id="ll-uts">

      {/* Upper Top: Left Section */}
      <section id="ll-uts-left">
        <section id="ll-uts-left-inner">
          <video
            preload="auto"
            autoPlay
            muted
            loop
            controls
            controlslist="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
            alt=""
            src="https://video.wixstatic.com/video/55ccf4_3781d7a19f3e45f6af8724ab52bb8fa3/480p/mp4/file.mp4"
          />
        </section>
      </section>

      {/* Upper Top: Right Section */}
      <section id="ll-uts-right">
        <section id="ll-uts-right-inner">
          <h2>
            Our Story
          </h2>
          <p>
            Brightleaf Imports, based out of Seattle, Washington, imports authentic, hand-crafted Monkey Pod products of the highest quality from Southeast Asia. Our manufacturing partner is a well-established and professional woodworking company that designs and manufactures durable, beautiful products worthy of your home or office with over 30 years of experience.
          </p>
          <p>
            Whether it’s the precise dimensions of a table, epoxy filling, special cuts, leg design, you name it, Brightleaf Imports is your partner in finding the perfect piece.
          </p>
          <p>
            When it comes to Brightleaf Imports you work directly with our ownership team, who then work with the craftsmen who create our heirloom quality pieces. In addition to our highly-customizable made to order products and raw material, our team at Brightleaf Imports is dedicated to feature a broad selection of uniquely designed products and raw material, our family at Brightleaf Imports is dedicated to feature a broad selection of uniquely designed products that we have in inventory. Brightleaf Imports also carries a wide variety of uniquely crafted wood slabs in different sizes and dimensions that are available for individual and wholesale purchase.
          </p>
        </section>
      </section>

    </section>
  );
};

// export default component
export default LLUpperTop;
