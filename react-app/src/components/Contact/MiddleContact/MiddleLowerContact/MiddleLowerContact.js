// frontend/src/components/Contact/MiddleContact/MiddleLowerContact.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as keyActions from '../../../../store/keys';

// import component
import Maps from "./Maps";

// import css
import './MiddleLowerContact.css';

//? MapContainer component: index for Maps
const MiddleLowerContact = () => {
  // get map key using selector
  const googleMapsAPIKey = useSelector(keyActions.getMapKey);

  // invoke dispatch
  const dispatch = useDispatch();

  // useEffect: get key for google map
  useEffect(() => {
    if (!googleMapsAPIKey) dispatch(keyActions.getKey());
  }, [dispatch, googleMapsAPIKey]);

  // if there's no key, return null. else, return the Maps component using api key
  return !googleMapsAPIKey
    ?
    null
    :
    <section className="ml-contact-section">
      <Maps apiKey={googleMapsAPIKey} />
    </section>
};

// export MapContainer
export default MiddleLowerContact;
