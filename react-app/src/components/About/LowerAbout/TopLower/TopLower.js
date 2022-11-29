// src/components/About/LowerAbout/TopLower/TopLower.js

// import css
import './TopLower.css';

//? TopLower component
const TopLower = () => {
  return (
    <section className="top-lower-section">
      {/* Subtitle */}
      <span>
        <i className="fa-solid fa-square" />
        Handcrafted Furniture From Southeast Asia
      </span>

      {/* Header */}
      <h2>
        Brightleaf is your partner in finding the perfect piece.
      </h2>

      {/* Line Span */}
      <span className="line-span" />

      {/* Text Description */}
      <p>
        Whether it’s the precise dimensions of a table, epoxy filling, special cuts, leg design, you name it, Brightleaf Imports is your partner
        in finding the perfect piece. Based out of Seattle, Washington, Brightleaf Imports authentic, hand-crafted Monkey Pod products of the
        highest quality from Southeast Asia. Our manufacturing partner is a well-established and professional woodworking company that designs
        and manufactures durable, beautiful products worthy of your home or office with over 30 years of experience.
      </p>
    </section>
  );
};

// export default component
export default TopLower;
