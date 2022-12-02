// src/components/CheckOutModal/InnerLeft/InnerLeft.js

// import css
import './InnerLeft.css';

//? InnerLeft component
const InnerLeft = () => {
  return (
    // Checkout Modal: Inner Section: Left
    < section className="checkoutmodal inner-section left" >
      {/* Inner Section: Left: Upper: Main Content */}
      < section >
        {/* Step 1: Shipping Address */}

        {/* Step 2: Payment Method */}

        {/* Step 3: Review items and shipping */}
      </section >

      {/* Inner Section: Left: Lower: Checkout Steps Nav */}
      < section >
        {/* Step 1: Shipping Address */}
        < figure className="cil lower shipping-address" >
          <span>
            1
          </span>
          <span>
            Shipping Address
          </span>
        </figure >

        {/* Step 2: Payment Method */}
        < figure className="cil lower payment-method" >
          <span>
            2
          </span>
          <span>
            Payment Method
          </span>
        </figure >

        {/* Step 3: Review items and shipping */}
        < figure className="cil lower review-items" >
          <span>
            3
          </span>
          <span>
            Review Items and Shipping
          </span>
        </figure >
      </section >
    </section>
  );
};

// export default component
export default InnerLeft;
