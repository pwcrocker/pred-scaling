import { useContext } from 'react';
import { CartContext } from '../store/CartContextProvider';
import CartItem from './CartItem';
import getTotalPriceInCart from '../util/cart';

export default function Cart({ handleModalClose, handleNextAction }) {
  const { cartItems } = useContext(CartContext);

  return (
    <>
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
        <button className="button" onClick={handleNextAction}>
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}
