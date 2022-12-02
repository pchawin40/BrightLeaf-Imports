// src/components/CheckOutModal/InnerLeft/ReviewItems/ReviewItems.js

// import css 
import './ReviewItems.css';

// import context
import { useCheckOut } from '../../../../context/CheckOutContext';

//? ReviewItems component
const ReviewItems = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();


  return (
    <section className="">

      
      [Review Items Component]
    </section>
  );
};

// export default component
export default ReviewItems;
