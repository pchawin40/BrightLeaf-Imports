// src/components/AccountMenu/MyAddresses/MAdrContent/AddressModal/AddressModal.js

// import context
import { useAddress } from '../../../../../context/AddressesContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import css
import './AddressModal.css';

// import store
import * as addressActions from '../../../../../store/address';

//? AddressModal component
const AddressModal = ({ currentAddressId }) => {
  /**
   * Selector functions
   */
  const currentAddressById = useSelector(addressActions.getCurrentAddressById(currentAddressId));

  /**
   * Controlled inputs
   */
  const { showAddressModal, setShowAddressModal } = useAddress();

  // Company Name & Length
  const [companyName, setCompanyName] = useState(
    currentAddressById
      &&
      currentAddressById.company_name
      ?
      currentAddressById.company_name
      :
      ""
  );

  const [companyNameLength, setCompanyNameLength] = useState(
    companyName ? companyName.length : 0
  );

  // Main Address & Length
  const [address, setAddress] = useState(
    currentAddressById
      &&
      currentAddressById.address
      ?
      currentAddressById.address
      :
      ""
  );

  const [addressLength, setAddressLength] = useState(
    address ? address.length : 0
  );

  // Address 2 & Length
  const [address2, setAddress2] = useState(
    currentAddressById
      &&
      currentAddressById.address2
      ?
      currentAddressById.address2
      :
      ""
  );

  const [address2Length, setAddress2Length] = useState(
    address2 ? address2.length : 0
  );

  // City & Length
  const [city, setCity] = useState(
    currentAddressById
      &&
      currentAddressById.city
      ?
      currentAddressById.city
      :
      ""
  );

  const [cityLength, setCityLength] = useState(
    city ? city.length : 0
  );

  // Country & Length
  const [country, setCountry] = useState(
    currentAddressById
      &&
      currentAddressById.country
      ?
      currentAddressById.country
      :
      ""
  );

  const [countryLength, setCountryLength] = useState(
    address ? address.length : 0
  );

  // State & Length
  const [state, setState] = useState(
    currentAddressById
      &&
      currentAddressById.state
      ?
      currentAddressById.state
      :
      ""
  );

  const [stateLength, setStateLength] = useState(
    state ? state.length : 0
  );

  // Zipcode & Length
  const [zipcode, setZipcode] = useState(
    currentAddressById
      &&
      currentAddressById.zipcode
      ?
      currentAddressById.zipcode
      :
      ""
  );

  const [zipcodeLength, setZipcodeLength] = useState(
    zipcode ? zipcode.length : 0
  );

  // Phone & Length
  const [phone, setPhone] = useState(
    currentAddressById
      &&
      currentAddressById.phone
      ?
      currentAddressById.phone
      :
      ""
  );

  const [phoneLength, setPhoneLength] = useState(
    phone ? phone.length : 0
  );

  // Default
  const [defaultAddress, setDefaultAddress] = useState(
    currentAddressById
      &&
      currentAddressById.default
      ?
      currentAddressById.default
      :
      ""
  );

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [
    companyName,
    companyNameLength,
    address,
    addressLength,
    address2,
    address2Length,
    city,
    cityLength,
    country,
    countryLength,
    state,
    stateLength,
    zipcode,
    zipcodeLength,
    phone,
    phoneLength,
    defaultAddress
  ]);

  // invoke dispatch
  const dispatch = useDispatch();

  /**
   * Update functions
   */
  // update company name
  const updateCompanyName = e => {
    setCompanyName(e.target.value);
    setCompanyNameLength(e.target.value.length);
  }

  // update address
  const updateAddress = e => {
    setAddress(e.target.value);
    setAddressLength(e.target.value.length);
  }

  // update address 2
  const updateAddress2 = e => {
    setAddress2(e.target.value);
    setAddress2Length(e.target.value.length);
  }

  // update city
  const updateCity = e => {
    setCity(e.target.value);
    setCityLength(e.target.value.length);
  }

  // update country
  const updateCountry = e => {
    setCountry(e.target.value);
    setCountryLength(e.target.value.length);
  }

  // update state
  const updateState = e => {
    setState(e.target.value);
    setStateLength(e.target.value.length);
  }

  // update zipcode
  const updateZipcode = e => {
    setZipcode(e.target.value);
    setZipcodeLength(e.target.value.length);
  }

  // update phone
  const updatePhoneNumber = e => {
    setPhone(e.target.value);
    setPhoneLength(e.target.value.length);
  }

  // update default address boolean
  const updateDefaultAddress = e => {
    setDefaultAddress(e.target.value);
  }

  // function to handle address submit
  const handleAddressSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // grab address data
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
            htmlFor="company"
          >
            Company name
          </label>
          <input
            name="company"
          />

          {/* Address */}
          <label
            htmlFor="address"
          >
            Address
          </label>
          <input
            name="address"
          />

          {/* Address - line 2 (apartment, suite, floor) */}
          <label
            htmlFor="address2"
          >
            Address - line 2
          </label>
          <input
            name="address2"
            placeholder="Apartment, suite, floor"
          />

          {/* City */}
          <label
            htmlFor="city"
          >
            City
          </label>
          <input
            name="address2"
          />

          {/* Country/State Select Box Container */}
          <section className="ami aa select-box-container">
            <figure>
              {/* Country */}
              <label htmlFor="country">Country</label>
              <select
                name="country"
              >
                <option value="">-- Select a country --</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="English">English</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                <option value="Xhosa">Xhosa</option>
              </select>
            </figure>

            <figure>
              {/* State (dropdown) */}
              <label htmlFor="state">State</label>
              <select
                name="state"
              >
                <option value="">-- Select a state --</option>
                {
                  <>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </>
                }
              </select>
            </figure>
          </section>

          {/* Zipcode/Phone Container */}
          <section className="ami aa zip-phone-container">
            {/* Zip / Postal code */}
            <figure>
              <label
                htmlFor="zipcode"
              >
                Zip / Postal code
              </label>
              <input
                name="zipcode"
              />
            </figure>

            {/* Phone */}
            <figure>
              <label
                htmlFor="phone-number"
              >
                Phone
              </label>
              <input
                name="phone-number"
              />
            </figure>
          </section>

          {/* Default Address (checkbox) */}
          <figure className="ami aa default-address">
            <input
              type="checkbox"
              name="default-address"
            />
            <label
              htmlFor="default-address"
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
