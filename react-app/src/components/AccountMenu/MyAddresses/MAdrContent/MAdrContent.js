// src/components/AccountMenu/MyAddresses/MAdrContent/MAdrContent.js

// import context
import { useAddress } from '../../../../context/AddressesContext';

// import css
import './MAdrContent.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as addressActions from '../../../../store/address';
import * as sessionActions from '../../../../store/session';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react
import { useEffect, useState } from 'react';
import { Modal } from '../../../../context/Modal';
import AddressModal from './AddressModal';

//? MAdrContent component
const MAdrContent = () => {
  /**
   * Controlled inputs
   */
  const { addressLoaded, setAddressLoaded } = useAddress();
  const { showAddressModal, setShowAddressModal } = useAddress();
  const { currentAddressId, setCurrentAddressId } = useAddress();

  /**
   * Selector functions
   */
  const currentUserAddresses = useSelector(addressActions.getCurrentUserAddresses);
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [currentUserAddresses]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle delete address
  const handleDeleteAddress = addressId => {
    // ask for confirmation before proceeding
    const confirmDelete = prompt(
      `Are you sure you want to delete this address? Type 'delete' to confirm`
    );

    // if 'delete' is the input, proceed to delete account
    if (confirmDelete && confirmDelete.toLowerCase().trim() === 'delete') {
      // alert to user, successful deletion
      alert(`Address has been deleted`);

      if (addressId) {
        // call on thunk to delete current address
        dispatch(addressActions.thunkDeleteAddress(addressId))
          .then(() => dispatch(addressActions.thunkGetUserAddresses()));
      }
    }
  }

  // function to load addresses if exists
  const loadAddresses = () => {
    if (addressLoaded) {
      return (
        // Address unordered list
        <ul className="madr ul">
          {/* all addresses that belong to current user */}
          {
            currentUserAddresses.map((currentAddress, index) => {
              return (
                <li
                  className="madr li"
                  key={`currentAddress ${index}`}
                >
                  <section className="madr li top">
                    {/* Company Name */}
                    <span className="madr li company">
                      {currentAddress.company_name}
                    </span>

                    {/* Address */}
                    <span className="madr li address">
                      {currentAddress.address}
                    </span>

                    {/* Address 2 */}
                    <span className="madr li address2">
                      {currentAddress.address_2}
                    </span>

                    {/* City, Country, State */}
                    <span className="madr li city-country-state">
                      {`${currentAddress.city && currentAddress.city + ","} ${currentAddress.state} ${currentAddress.zipcode}`}
                    </span>

                    {/* Phone */}
                    <span className="madr li phone">
                      {currentAddress.phone}
                    </span>
                  </section>

                  <section className="madr li lower">
                    <section className="mll left">
                      {/* Edit */}
                      <span
                        className="madr li edit-address"
                        onClick={_ => {
                          setShowAddressModal(true);
                          setCurrentAddressId(currentAddress.id);
                        }}
                      >
                        Edit
                      </span>

                      {/* Remove */}
                      <span
                        onClick={_ => handleDeleteAddress(currentAddress.id)}
                        className="madr li remove-address"
                      >
                        Remove
                      </span>
                    </section>
                    <section className="mll right">
                      {/* Default Address */}
                      <span className="madr li default">
                        {
                          currentAddress.default
                          &&
                          <>
                            <i className="fa-solid fa-check" />
                            Default Address
                          </>
                        }
                      </span>
                    </section>
                    <span className="line-span madr li" />
                  </section>
                </li>
              );
            })
          }
        </ul>
      )
    } else {
      // if address is not loaded, display blank display
      return (
        currentUserInfo.role === "user"
          ?
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
          :
          <>
            <h2>
              You're currently logged in as administrator.
            </h2>
            {/* // TODO: To add address later */}
            <p>
              Please log in as user to save an address.
            </p>
          </>
      )
    }
  }

  return (
    <section className="MAdrContent AM content-outer-section">
      <section className="MAdrContent AM content-inner-section">
        {/* Top */}
        <section className="cis top address">
          <h1>
            My Addresses
          </h1>
          <p>
            Add and manage the addresses you use often.
          </p>
        </section>
        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className={`cis lower address ${addressLoaded}`}>
          {/* call on function to load addresses */}
          {
            loadAddresses()
          }
          {/* Button to add new address */}
          {
            currentUserInfo.role === "user"
            &&
            <button
              className="madr new-address"
              type="button"
              onClick={_ => setShowAddressModal(true)}
            >
              Add New Address
            </button>
          }
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>
      </section>

      {/* Address Modal */}
      {/* {showAddressModal && (
        <Modal
          onClose={(_) => {
            setShowAddressModal(false);
            setCurrentAddressId(null);
          }}
          currentVisible={false}
        >
          <AddressModal currentAddressId={currentAddressId} setCurrentAddressId={setCurrentAddressId} />
        </Modal>
      )} */}
    </section>
  );
};

// export default component
export default MAdrContent;
