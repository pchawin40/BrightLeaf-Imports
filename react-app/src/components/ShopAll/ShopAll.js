// src/components/ShopAll/ShopAll.js

// import component
import Footer from '../Footer';
import LowerShopAll from './LowerShopAll';
import TopShopAll from './TopShopAll';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import css
import './ShopAll.css';

// import react-redux
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import store
import * as imageActions from '../../store/images';
import ProductProvider from '../../context/ProductContext';

//? ShopAll component
const ShopAll = () => {
  /**
   * Controlled inputs
   */
  // set background color
  const { backgroundColor, setBackgroundColor } = useNavHeader();
  const { currentPage, setCurrentPage } = useNavHeader();

  // invoke dispatch
  const dispatch = useDispatch();

  // on open, always scroll to top

  /**
   * useEffect
   */
  useEffect(() => {
    if (currentPage !== "shopall") {
      setCurrentPage("shopall");
    }

    if (currentPage === "shopall") {
      dispatch(imageActions.thunkGetImages("ShopAll=True"));
    }

    // on open, always scroll to top
    window.scrollTo(0, 0);
  }, [currentPage]);


  return (
    <section
      className="page-section shop-all"
      style={{
        backgroundColor,
        transition: "background-color 1s ease"
      }}
    >
      {/* Top ShopAll */}
      <TopShopAll />

      {/* Lower ShopAll */}
      <ProductProvider>
        <LowerShopAll />
      </ProductProvider>

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default ShopAll;
