// src/components/Contact/MiddleContact/MiddleContact.js

// import css
import './MiddleContact.css';

//? MiddleContact component
const MiddleContact = () => {

  // handle contact form submit
  const handleContactSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();
  }

  return (
    <section className="middle-contact-section">
      {/* Left */}
      <section className="mcs left section">
        <h2>
          Contact Us
        </h2>

        <span>
          info@brightleafimports.com
        </span>
        <span>
          360.584.3606
        </span>

        <p>
          If you have any questions or special inquries, you're <br /> welcome to contact us or fill out this form.
        </p>
      </section>

      {/* Right */}
      <form
        onSubmit={handleContactSubmit}
        className="mcs right form"
      >
        {/* Name */}
        <label>
          Enter Your Name *
        </label>
        <input
          placeholder="Full Name"
          className="mcs input full-name"
        />

        <section className="inner-contact-section">
          {/* Phone */}
          <figure>
            <label>
              Enter Your Phone
            </label>
            <input
              placeholder="Phone No."
              className="mcs input phone"
            />
          </figure>

          {/* Email */}
          <figure>
            <label>
              Enter Your Email *
            </label>
            <input
              placeholder="Email Address"
              className="mcs input email"
            />
          </figure>
        </section>

        {/* Message */}
        <label>
          Enter Your Message *
        </label>
        <textarea
          placeholder="Write Your Request"
          className="mcs input message"
        />

        <figure className="mcs label submit-figure">
          <button
            className="mcs input submit-button"
            type="submit"
          >
            Submit
          </button>
        </figure>
      </form>
    </section>
  );
};

// export default component
export default MiddleContact;
