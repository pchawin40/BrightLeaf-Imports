// src/components/ShopAll/SpecificProduct/SpecificProduct.js

// import context
import { useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';

// import css
import './SpecificProduct.css';

// import react-router-dom
import { useHistory } from 'react-router-dom';

//? SpecificProduct component
const SpecificProduct = () => {
  /**
   * Controlled inputs
   */
  const { currentProductId, setCurrentProductId } = useProduct();
  const { currentProductImages, setCurrentProductImages } = useProduct();

  // invoke history
  const history = useHistory();

  useEffect(() => {
    if (!currentProductId) return history.push('/product-page');
  }, []);
  
  console.log("currentProductId", currentProductId);
  console.log("currentProductImages", currentProductImages);

  return (
    <section id="specific-product-section">

    </section>
  );
};

// export default component
export default SpecificProduct;
