// src/components/ShopAll/ShopProduct/ShopProduct.js

// import component
import Footer from '../Footer';
import MainShopProduct from './MainShopProduct';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';
import { useProduct } from '../../context/ProductContext';

// import css
import './ShopProduct.css';

// import react
import { useEffect } from 'react';

// import react-router-dom
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as imageActions from '../../store/images';

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

  // invoke history
  const history = useHistory();

  // invoke dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentProductId) return history.push('/product-page');
  }, []);

  return (
    <section
      className="page-section shop-product"
    >
      {/* Lower ShopProduct */}
      <MainShopProduct />

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default ShopProduct;
