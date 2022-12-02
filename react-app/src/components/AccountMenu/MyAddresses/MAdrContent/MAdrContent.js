// src/components/AccountMenu/MyAddresses/MAdrContent/MAdrContent.js

// import context
import { useAddress } from '../../../../context/AddressesContext';

// import css
import './MAdrContent.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as addressActions from '../../../../store/address';

// import react-redux
import { useSelector } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

//? MAdrContent component
const MAdrContent = () => {
  /**
   * Controlled inputs
   */
  const { addressLoaded, setAddressLoaded } = useAddress();

  /**
   * Selector functions
   */
  const currentUserAddresses = useSelector(addressActions.getCurrentUserAddresses);

  /**
   * UseEffect
   */

  // function to load addresses if exists
  const loadAddresses = () => {
    if (addressLoaded) {
      return (
        // Address unordered list
        <ul className="madr ul">
          {/* all addresses that belong to current user */}
          {
            currentUserAddresses.map(address => {
              return (
                <li
                  className="madr li"
                  key={address.address}
                >
                  <section className="madr li top">
                    {/* Company Name */}
                    <span className="madr li company">
                      {address.company_name}
                    </span>

                    {/* Address */}
                    <span className="madr li address">
                      {address.address}
                    </span>

                    {/* Address 2 */}
                    <span className="madr li address2">
                      {address.address_2}
                    </span>

                    {/* City, Country, State */}
                    <span className="madr li city-country-state">
                      {`${address.city}, ${address.state} ${address.state}`}
                    </span>

                    {/* Phone */}
                    <span className="madr li phone">
                      {address.phone}
                    </span>
                  </section>

                  <section className="madr li lower">
                    <section className="mll left">
                      {/* Edit */}
                      <span
                        className="madr li edit-address"
                      >
                        Edit
                      </span>

                      {/* Remove */}
                      <span
                        className="madr li remove-address"
                      >
                        Remove
                      </span>
                    </section>
                    <section className="mll right">
                      {/* Default Address */}
                      <span className="madr li default">
                        {
                          address.default
                          &&
                          <i className="fa-solid fa-check" />
                        }
                        Default Address
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
        <>
          <h2>
            You haven't saved any addresses yet.
          </h2>
          {/* // TODO: To add address later */}
          <NavLink
            to=""
          >
            Add New Address
          </NavLink>
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
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>
      </section>
    </section>
  );
};

// export default component
export default MAdrContent;
