// src/components/CheckOutModal/InnerLeft/ShippingAddress/ShippingAddress.js

// import css 
import './ShippingAddress.css';

// import context
import { useAddress } from '../../../../context/AddressesContext';
import { useCheckOut } from '../../../../context/CheckOutContext';

// import react
import { useSelector } from 'react-redux';

// import store
import * as addressActions from '../../../../store/address';
import { useEffect } from 'react';

//? ShippingAddress component
const ShippingAddress = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();
  const { selectedAddress, setSelectedAddress } = useAddress();
  const { showAddressModal, setShowAddressModal } = useAddress();
  const { addressLoaded, setAddressLoaded } = useAddress();

  /**
   * Selector functions
   */
  const currentUserAddresses = useSelector(addressActions.getCurrentUserAddresses);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    if (
      currentUserAddresses
      &&
      currentUserAddresses.length > 0
    ) {
      // check if there is any checked address, if none then set to first current user address
      const checkedAddresses = document.querySelector("li.madr.sa > input").checked;

      if (!checkedAddresses) {
        document.querySelector("li.madr.sa > input").checked = true;
      }
    }
  }, [currentUserAddresses]);

  // function to load addresses if exists
  const loadCurrentAddresses = () => {
    if (addressLoaded) {
      return (
        // Address unordered list
        <fieldset className="madr ul sa">
          {/* all addresses that belong to current user */}
          {
            currentUserAddresses.map((currentAddress, index) => {
              return (
                <section
                  key={`currentAddress ${index}'s id ${currentAddress.id}`}
                >
                  <li
                    className="madr li sa"
                  >
                    <input
                      name="select-shipping-address"
                      type="radio"
                      value={currentAddress.id}
                      onClick={_ => setSelectedAddress(currentAddress)}
                    />
                    <section className="madr li outer-top sa">
                      <section className="madr li top sa">
                        {/* Company Name */}
                        <span className="madr li company sa">
                          {currentAddress.company_name}
                        </span>

                        {/* Address */}
                        <span className="madr li address sa">
                          {currentAddress.address}
                        </span>

                        {/* Address 2 */}
                        <span className="madr li address2 sa">
                          {currentAddress.address_2}
                        </span>

                        {/* City, Country, State */}
                        <span className="madr li city-country-state sa">
                          {`${currentAddress.city && currentAddress.city + ","} ${currentAddress.state} ${currentAddress.zipcode}`}
                        </span>

                        {/* Phone */}
                        <span className="madr li phone sa">
                          {currentAddress.phone}
                        </span>
                      </section>
                    </section>
                  </li>
                </section>
              );
            })
          }
        </fieldset>
      )
    } else {
      // if address is not loaded, display blank display
      return (
        <>
          <h2>
            You haven't saved any addresses yet.
          </h2>
          {/* // TODO: To add address later */}
          <span
            className="no-display"
            onClick={_ => setShowAddressModal(true)}
          >
            Add New Address
          </span>
        </>
      )
    }
  }

  return (
    <section className="cil main-content sa">
      <h2>
        My Saved Address
      </h2>

      {
        // load address
        loadCurrentAddresses()
      }

      {/* Button to add new address */}
      <figure>
        <span
          className="cil sa add-address"
          onClick={_ => setShowAddressModal(true)}
        >
          Add New Address
        </span>
      </figure>

      {/* line span */}
      <span className='line-span cil' />

      {/* Use This Address Button */}
      <figure>
        <button
          className="cil use-address"
          onClick={_ => setCurrentStep(2)}
        >
          Use this address
        </button>
      </figure>
    </section>
  );
};

// export default component
export default ShippingAddress;
