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
const AddressModal = () => {

  /**
   * Controlled inputs
   */
  const { showAddressModal, setShowAddressModal } = useAddress();
  const { currentAddressId, setCurrentAddressId } = useAddress();
  const [editAddress, setEditAddress] = useState(false);

  /**
   * Selector functions
   */
  const currentAddressById = useSelector(addressActions.getCurrentAddressById(currentAddressId));

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
    // if current address by id exists, its an edit
    if (currentAddressById) {
      setEditAddress(true);
    } else {
      setEditAddress(false);
    }

    // modify default address's checked value
    document.querySelector(".default-address.checkbox").checked = defaultAddress
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
    defaultAddress,
    editAddress
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
    setDefaultAddress(e.target.checked);
  }

  // function to handle address submit
  const handleAddressSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // grab address data
    const addressSubmit = {
      ...currentAddressById,
      company_name: companyName,
      address,
      address_2: address2,
      city,
      country,
      state: country === "US" ? state : "",
      zipcode,
      phone,
      default: defaultAddress
    }

    // call on dispatch to submit address then fetch afterward
    dispatch(
      editAddress
        ?
        addressActions.thunkEditAddress(addressSubmit)
        :
        addressActions.thunkPostAddress(addressSubmit)
    )
      .then(() => dispatch(addressActions.thunkGetUserAddresses()))
      .then(() => {
        setEditAddress(false);
        setCurrentAddressId(null);
        setShowAddressModal(false)
      });
  };

  // function to check if button is ready to submit
  const submitReady = () => {
    if (
      companyNameLength <= 50
      &&
      addressLength <= 100
      &&
      address2Length <= 100
      &&
      cityLength <= 50
      &&
      countryLength <= 50
      &&
      stateLength <= 50
      &&
      zipcodeLength <= 20
      &&
      (phoneLength === 10 && phoneLength > 0)
      &&
      (
        companyNameLength > 0
        ||
        addressLength > 0
        ||
        address2Length > 0
        ||
        cityLength > 0
        ||
        countryLength > 0
        ||
        stateLength > 0
        ||
        zipcodeLength > 0
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <section className="address-modal outer">
      <section className="address-modal inner">
        {/* Header section */}
        <section className="ami header">
          <h1>
            {
              editAddress
                ?
                <>
                  Edit Existing Address
                </>
                :
                <>
                  Add New Address
                </>
            }
          </h1>
          {/* Exit Modal Icon */}
          <i
            className="fa-solid fa-x fa-xl"
            onClick={_ => {
              setEditAddress(false);
              setCurrentAddressId(null);
              setShowAddressModal(false);
              document.body.style.overflowY = "scroll";
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
          <figure
            className="ami text-figure"
          >
            <input
              type="text"
              name="company"
              value={companyName}
              onChange={updateCompanyName}
            />
            <span
              className={`ami input-length ${companyNameLength <= 50 ? "valid" : "invalid"}`}
            >
              {
                50 - companyNameLength + " characters left"
              }
            </span>
          </figure>

          {/* Address */}
          <label
            htmlFor="address"
          >
            Address
          </label>
          <figure
            className='ami text-figure'
          >
            <input
              type="text"
              name="address"
              value={address}
              onChange={updateAddress}
            />
            <span
              className={`ami input-length ${addressLength <= 100 ? "valid" : "invalid"}`}
            >
              {
                100 - addressLength + " characters left"
              }
            </span>
          </figure>

          {/* Address - line 2 (apartment, suite, floor) */}
          <label
            htmlFor="address2"
          >
            Address - line 2
          </label>
          <figure
            className="ami text-figure"
          >
            <input
              type="text"
              name="address2"
              placeholder="Apartment, suite, floor"
              value={address2}
              onChange={updateAddress2}
            />
            <span
              className={`ami input-length ${address2Length <= 100 ? "valid" : "invalid"}`}
            >
              {
                100 - address2Length + " characters left"
              }
            </span>
          </figure>

          {/* City */}
          <label
            htmlFor="city"
          >
            City
          </label>
          <figure
            className='ami text-figure'
          >
            <input
              type="text"
              name="city"
              value={city}
              onChange={updateCity}
            />
            <span
              className={`ami input-length ${cityLength <= 50 ? "valid" : "invalid"}`}
            >
              {
                50 - cityLength + " characters left"
              }
            </span>
          </figure>

          {/* Country/State Select Box Container */}
          <section className="ami aa select-box-container">
            <figure>
              {/* Country */}
              <label htmlFor="country">Country</label>
              <figure>
                <select
                  className="drop-down-select"
                  name="country"
                  value={country}
                  onChange={updateCountry}
                >
                  <option value="">-- Select a country --</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia, Plurinational State of</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, the Democratic Republic of the</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curaçao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and McDonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea, Democratic People's Republic of</option>
                  <option value="KR">Korea, Republic of</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Réunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthélemy</option>
                  <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin (French part)</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten (Dutch part)</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia and the South Sandwich Islands</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela, Bolivarian Republic of</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.S.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
              </figure>
            </figure>

            <figure>
              {/* State (dropdown) */}
              <label htmlFor="state">State</label>
              <figure>

                <select
                  className="drop-down-select"
                  name="state"
                  value={state}
                  onChange={updateState}
                >

                  {
                    country === "US"
                      ?
                      <>
                        <option value="">-- Select a state --</option>
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
                      :
                      <option value="">-- N/A --</option>
                  }
                </select>
              </figure>
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
              <figure
                className='ami text-figure'
              >
                <input
                  type="text"
                  name="zipcode"
                  value={zipcode}
                  onChange={updateZipcode}
                />
                <span
                  className={`ami input-length ${zipcodeLength <= 20 ? "valid" : "invalid"}`}
                >
                  {
                    20 - zipcodeLength + " characters left"
                  }
                </span>
              </figure>
            </figure>

            {/* Phone */}
            <figure>
              <label
                className="phone-label"
                htmlFor="phone-number"
              >
                Phone Number
                <span className={`phone-${phoneLength === 10 && phoneLength > 0 ? "valid" : "invalid"}`}>
                  (requires 10 characters)
                </span>
              </label>
              <figure
                className='ami text-figure'
              >
                <input
                  className="ami input-field"
                  type="text"
                  name="phone-number"
                  value={phone}
                  onChange={updatePhoneNumber}
                />
                <span
                  className={`ami input-length ${phoneLength <= 10 ? "valid" : "invalid"}`}
                >
                  {
                    10 - phoneLength + " characters left"
                  }
                </span>
              </figure>
            </figure>
          </section>

          {/* Default Address (checkbox) */}
          <figure className="ami aa default-address">
            <input
              type="checkbox"
              name="default-address"
              value={defaultAddress}
              onChange={updateDefaultAddress}
              className="default-address checkbox"
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
              className={`ami aa submit ${submitReady()}`}
              type={`${submitReady() ? "submit" : "button"}`}
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
