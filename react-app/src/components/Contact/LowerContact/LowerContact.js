// frontend/src/components/Contact/LowerContact/LowerContact.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as mapActions from '../../../store/maps';

// import component
import Maps from "./Maps";

//? MapContainer component: index for Maps
const LowerContact = () => {
  // get map key using selector
  const key = useSelector(mapActions.getMapKey);

  // invoke dispatch
  const dispatch = useDispatch();

  // useEffect: get key for google map
  useEffect(() => {
    if (!key) dispatch(mapActions.getKey());
  }, [dispatch, key]);

  // if there's no key, return null. else, return the Maps component using api key
  return !key ? null : <Maps apiKey={key} />
};

// export MapContainer
export default LowerContact;
