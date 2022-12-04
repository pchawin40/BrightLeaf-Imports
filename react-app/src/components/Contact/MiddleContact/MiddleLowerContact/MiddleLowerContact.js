// frontend/src/components/Contact/MiddleContact/MiddleLowerContact.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as mapActions from '../../../../store/maps';

// import component
import Maps from "./Maps";

// import css
import './MiddleLowerContact.css';

//? MapContainer component: index for Maps
const MiddleLowerContact = () => {
  // get map key using selector
  const key = useSelector(mapActions.getMapKey);

  // invoke dispatch
  const dispatch = useDispatch();

  // useEffect: get key for google map
  useEffect(() => {
    if (!key) dispatch(mapActions.getKey());
  }, [dispatch, key]);

  // if there's no key, return null. else, return the Maps component using api key
  return !key
    ?
    null
    :
    <section className="ml-contact-section">
      <Maps apiKey={key} />
    </section>
};

// export MapContainer
export default MiddleLowerContact;
