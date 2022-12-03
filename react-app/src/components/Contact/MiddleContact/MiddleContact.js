// src/components/Contact/MiddleContact/MiddleContact.js

// import css
import './MiddleContact.css';

// import react
import { useEffect, useState } from 'react';

// import component
import MiddleLowerContact from './MiddleLowerContact/MiddleLowerContact';

// import functions
import { validateSubscribeEmail } from '../../Footer/MidFooter/MidFooterRight/MidFooterRight';

//? MiddleContact component
const MiddleContact = () => {

  /**
   * Controlled inputs
   */
  const [name, setName] = useState("");
  const [nameLength, setNameLength] = useState(0);
  const [email, setEmail] = useState("");
  const [emailLength, setEmailLength] = useState(0);
  const [phone, setPhone] = useState("");
  const [phoneLength, setPhoneLength] = useState(0);
  const [message, setMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [
    name,
    nameLength,
    email,
    emailLength,
    phone,
    phoneLength,
    message,
    messageLength
  ])

  /**
   * Functions to update form
   */
  // update name
  const updateName = e => {
    setName(e.target.value);
    setNameLength(e.target.value.length);
  }

  // update email
  const updateEmail = e => {
    setEmail(e.target.value);
    setEmailLength(e.target.value.length);
  }

  // update phone
  const updatePhone = e => {
    setPhone(e.target.value);
    setPhoneLength(e.target.value.length);
  }

  // update message
  const updateMessage = e => {
    setMessage(e.target.value);
    setMessageLength(e.target.value.length);
  }

  // function to handle name validation
  const validateContactName = () => name.trim().length > 0;

  // function to handle message validation
  const validateMessageValidation = () => message.trim().length > 0;

  // function to handle length validation
  const validateLengthValidation = () => {
    return (
      emailLength > 0 && nameLength > 0 && messageLength > 0
    )
  }

  // function to handle contact form validation
  const validateContactInformation = () => {
    if (
      (validateSubscribeEmail(email) || emailLength === 0)
      &&
      (validateContactName() || nameLength === 0)
      &&
      (validateMessageValidation() || messageLength === 0)
    ) {
      return true;
    }
    return false;
  }

  // function to handle contact form submit
  const handleContactSubmit = async e => {
    // prevent page from refreshing
    e.preventDefault();

    if (validateContactInformation()) {
      const res = await fetch('/api/mail/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message
        })
      });

      if (res.ok) {
        window.alert(`Thank you for contacting us. We have received your email.`);
      }
    } else {
      window.alert(`Your email was not valid. Please try again with valid email. Thank you for understanding.`);
    }
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
          Enter Your Name
          <span
            className={`asterisk ${validateContactName() ? "valid" : "invalid"}`}
          >
            * (requires)
          </span>
        </label>
        <input
          placeholder="Full Name"
          className="mcs input full-name"
          value={name}
          onChange={updateName}
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
              value={phone}
              onChange={updatePhone}
            />
          </figure>

          {/* Email */}
          <figure>
            <label>
              Enter Your Email
              <span
                className={`asterisk ${email.trim().length > 0 ? "valid" : "invalid"}`}
              >
                *
                <span
                  className={`asterisk ${validateSubscribeEmail(email) ? "valid" : "invalid"}`}
                >
                  (Must be valid email)
                </span>
              </span>
            </label>
            <input
              placeholder="Email Address"
              className="mcs input email"
              value={email}
              onChange={updateEmail}
            />
          </figure>
        </section>

        {/* Message */}
        <label>
          Enter Your Message
          <span
            className={`asterisk ${validateMessageValidation() ? "valid" : "invalid"}`}
          >
            * (requires)
          </span>
        </label>
        <textarea
          placeholder="Write Your Request"
          className="mcs input message"
          value={message}
          onChange={updateMessage}
        />

        <figure className="mcs label submit-figure">
          <button
            className={`
            mcs
            input
            submit-button
            ${validateContactInformation()
                &&
                validateLengthValidation()
                ?
                "valid"
                :
                "invalid"
              }
            `}
            type={validateContactInformation() ? "submit" : "button"}
          >
            Submit
          </button>
        </figure>
      </form>

      {/* Middle Lower Contact */}
      <MiddleLowerContact />
    </section>
  );
};

// export default component
export default MiddleContact;
