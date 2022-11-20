// src/components/ShopAll/ShopProduct/ShopProduct.js

// import component
import Footer from '../Footer';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';
import { useProduct } from '../../context/ProductContext';

// import css
import './ShopProduct.css';

// import react
import { useEffect } from 'react';

// import react-router-dom
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import store
import * as imageActions from '../../store/images';
import LowerShopProduct from './MainShopProduct';

//? ShopProduct component
const ShopProduct = () => {
  /**
   * Controlled inputs
   */
  const { currentProductId, setCurrentProductId } = useProduct();
  const { currentProductImages, setCurrentProductImages } = useProduct();
  const { currentPage, setCurrentPage } = useNavHeader();
  const { headerColor, setHeaderColor } = useNavHeader();
  const { footerColor, setFooterColor } = useNavHeader();

  // invoke history
  const history = useHistory();

  // invoke dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("TO CHANGE BACK AFTER FINISH STYLING");
    if (!currentProductId) return history.push('/product-page');
  }, []);

  /**
 * useEffect
 */
  useEffect(() => {
    if (currentPage !== "shopproduct") {
      setCurrentPage("shopproduct");
    }

    if (currentPage === "shopproduct") {
      dispatch(imageActions.thunkGetImages("ShopAll=True"));
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);

    // to reset color upon clicking from shop product
    setHeaderColor('black');
    setFooterColor('black');
  }, [currentPage]);

  return (
    <section
      className="page-section shop-product"
    >
      {/* Lower ShopProduct */}
      <LowerShopProduct />

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default ShopProduct;
