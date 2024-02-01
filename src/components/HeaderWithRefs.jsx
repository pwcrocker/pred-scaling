import { useContext, useRef, useState } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/CartContextProvider';
import Cart from './Cart';
import Checkout from './Checkout';
import RefModal from './RefModal';

function getCartItemCount(cartItems) {
  return cartItems.reduce(
    (totalItemCount, curItem) => totalItemCount + curItem.quantity,
    0,
  );
}

export default function HeaderWithRefs() {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cartModal = useRef();
  const checkoutModal = useRef();

  function handleCartOpen() {
    cartModal.current.open();
  }

  function handleCartClose() {
    cartModal.current.close();
  }

  function handleProceedToCheckout() {
    checkoutModal.current.open();
    cartModal.current.close();
  }

  function handleCheckoutClose() {
    checkoutModal.current.close();
  }

  function handleSubmitOrder() {
    checkoutModal.current.close();
  }

  return (
    <>
      <RefModal
        ref={cartModal}
        className="modal cart"
        modalContent={Cart}
        onClose={handleCartClose}
        onNext={handleProceedToCheckout}
      />
      )
      <RefModal
        ref={checkoutModal}
        className="modal"
        modalContent={Checkout}
        onClose={handleCheckoutClose}
        onNext={handleSubmitOrder}
      />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="want some seed oils bruh?" />
          <h1 id="title">Blubhub</h1>
        </div>
        <button className="text-button sticky-button" onClick={handleCartOpen}>
          {'Cart (' + getCartItemCount(cartItems) + ')'}
        </button>
      </header>
    </>
  );
}
