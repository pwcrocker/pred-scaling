import { useContext, useState } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/CartContextProvider';
import Modal from './Modal';
import Cart from './Cart';
import Checkout from './Checkout';

function getCartItemCount(cartItems) {
  return cartItems.reduce(
    (totalItemCount, curItem) => totalItemCount + curItem.quantity,
    0,
  );
}

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  function handleCartOpen() {
    setIsCartOpen(true);
  }

  function handleCartClose() {
    setIsCartOpen(false);
  }

  function handleProceedToCheckout() {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  }

  function handleCheckoutClose() {
    setIsCheckoutOpen(false);
  }

  function handleFinalizeCheckout() {
    // TODO: prob POST here or something
    setIsCheckoutOpen(false);
  }

  return (
    <>
      {isCartOpen && (
        <Modal
          className="modal cart"
          modalContent={Cart}
          onClose={handleCartClose}
          onNext={handleProceedToCheckout}
        />
      )}
      {isCheckoutOpen && (
        <Modal
          className="modal"
          modalContent={Checkout}
          onClose={handleCheckoutClose}
          onNext={handleFinalizeCheckout}
        />
      )}
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="want some seed oils bruh?" />
          <h1 id="title">Blubhub</h1>
        </div>
        <button className="text-button" onClick={handleCartOpen}>
          {'Cart (' + getCartItemCount(cartItems) + ')'}
        </button>
      </header>
    </>
  );
}
