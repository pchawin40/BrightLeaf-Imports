// src/components/AccountMenu/MyAddresses/MAdrContent/AddressModal/AddressModal.js

// import context
import { useAddress } from '../../../../../context/AddressesContext';

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import css
import './AddressModal.css';

//? AddressModal component
const AddressModal = () => {
  const { showAddressModal, setShowAddressModal } = useAddress();

  /**
   * Controlled inputs
   */

  /**
   * Selector functions
   */

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {

  }, []);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle address submit
  const handleAddressSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();
  };

  return (
    <section className="address-modal outer">
      <section className="address-modal inner">
        {/* Header section */}
        <section className="ami header">
          <h1>
            Add New Address
          </h1>
          {/* Exit Modal Icon */}
          <i
            className="fa-solid fa-x fa-xl"
            onClick={_ => {
              setShowAddressModal(false);
              document.body.style.overflowY = "scroll"
            }}
          />
        </section>

        <span className="line-span ami" />

        {/* Form to add address */}
        <form
          onSubmit={handleAddressSubmit}
          className="ami add-address"
        >
          {/* Company name */}
          <label
            className=""
            htmlFor=""
          >
            Company name
          </label>
          <input
            className="ami aa "
          />

          {/* Address */}
          <label
            className=""
            htmlFor=""
          >
            Address
          </label>
          <input
            className="ami aa "
          />

          {/* Address - line 2 (apartment, suite, floor) */}
          <label
            className=""
            htmlFor=""
          >
            Address - line 2
          </label>
          <input
            className="ami aa "
            placeholder="Apartment, suite, floor"
          />

          {/* City */}
          <label
            className=""
            htmlFor=""
          >
            City
          </label>
          <input
            className="ami aa "
          />

          {/* Country/State Select Box Container */}
          <section className="ami aa select-box-container">
            <figure>
              {/* Country */}
              <label htmlFor="country">Country</label>
              <select name="country">
                <option value=""></option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
              </select>
            </figure>

            <figure>
              {/* State (dropdown) */}
              <label htmlFor="state">State</label>
              <select name="state">
                <option value=""></option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
              </select>
            </figure>
          </section>

          {/* Zipcode/Phone Container */}
          <section className="ami aa zip-phone-container">
            {/* Zip / Postal code */}
            <figure>
              <label
                className=""
                htmlFor=""
              >
                Zip / Postal code
              </label>
              <input
                className="ami aa "
              />
            </figure>

            {/* Phone */}
            <figure>
              <label
                className=""
                htmlFor=""
              >
                Phone
              </label>
              <input
                className="ami aa "
              />
            </figure>
          </section>

          {/* Default Address (checkbox) */}
          <figure className="ami aa default-address">
            <input
              type="checkbox"
            />
            <label
              className=""
              htmlFor=""
            >
              Make this my default address
            </label>
          </figure>

          {/* Line Span */}
          <span className="line-span" />

          <figure className="ami aa submit-container">
            {/* Address: Lower: Submit Address */}
            <button
              className="ami aa submit"
              type="submit"
            >
              Add Address
            </button>
          </figure>
        </form>

      </section>

    </section>
  );
};

// export default component
export default AddressModal;
