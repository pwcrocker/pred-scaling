import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CartContext } from '../store/CartContextProvider';
import currencyFormatter from '../util/formatter';
import CartItem from './CartItem';

function getTotalPriceInCart(cartItems) {
  const totalPrice = cartItems.reduce(
    (totalPrice, curItem) => totalPrice + curItem.itemPrice * curItem.quantity,
    0,
  );

  return currencyFormatter(totalPrice);
}

const CartModal = forwardRef(function CartModal(props, ref) {
  const { cartItems } = useContext(CartContext);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  function handleModalClose() {
    dialog.current.close();
  }

  return createPortal(
    <dialog className="modal cart" ref={dialog}>
      <h2>Your Seed Oil Haul</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id + 'Cart'} item={cartItem} />
        ))}
      </ul>
      <p className="cart-total">Total: {getTotalPriceInCart(cartItems) || 0}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={handleModalClose}>
          Close
        </button>
        <button className="button">Proceed to Checkout</button>
      </div>
    </dialog>,
    document.getElementById('modal'),
  );
});

export default CartModal;
