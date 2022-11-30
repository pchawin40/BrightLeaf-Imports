// src/components/StorePolicy/SPContent/SPContent.js

// import css
import './SPContent.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

//? StorePolicy component
const SPContent = () => {
  return (
    <section className="SPContent section">
      {/* Header */}
      <h1>Store Policy</h1>
      {/* Subsection: Customer Care */}
      <section className="SPContent sub-section customer-care">
        <h2>
          Customer Care
        </h2>
        <p>
          Brightleaf Imports takes pride in designing products that are timeless,
          durable, and easy to maintain. Monkey Pod is a dense, firm wood with
          naturally fine texture. It is highly scratch resistant in comparison
          to other hardwoods. All of our products are treated, protected to sealed
          to increase life expectancy.
        </p>
        <p>
          Contact our customer service team with any questions you may have
          about taking care of your product and keeping it in pristine condition.
          Below are a few helpful links to assist you with protecting and
          maintaining your product.
        </p>
        <NavLink
          to="/store-policy"
          onClick={_ => {
            return window.open('https://monkeypodasia.com/keep-monkey-pod-furniture-clean-good-shape/#:~:text=Use%20the%20Proper%20Cleaning%20Techniques&text=If%20you%20choose%20to%20use,furniture%20on%20a%20regular%20basis.', '_blank')
          }}
        >
          How to Keep Monkey Pod Furniture Clean and In Good Shape - MonkeyPod Asia
        </NavLink>
        <NavLink
          to="/store-policy"
          onClick={_ => {
            return window.open('https://worldinteriors.com/blogs/before-you-buy-materials-construction-and-build-processes/monkey-pod-wood-live-edge-furniture-in-austin', '_blank')
          }}
        >
          Monkey Pod Wood Furniture: Pros and Cons to Know Before You Buy – World Interiors
        </NavLink>
      </section>

      {/* Subheader: Payment Methods */}
      <section className="SPContent sub-section payment-methods">
        <h2>
          Payment Methods
        </h2>
        <ul>
          <li>
            Credit / Debit Cards
          </li>
          <li>
            Offline Payments
          </li>
        </ul>
      </section>
    </section>
  )
};

// export default component
export default SPContent;
