import { useContext } from 'react';
import { CartContext } from '../store/CartContextProvider';

export default function CartItem({ item }) {
  const { addItemToCartById, removeItemFromCart } = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>{item.name + ' - ' + item.quantity + ' x ' + item.itemPrice}</p>
      <div className="cart-item-actions">
        <button onClick={() => removeItemFromCart(item.id)}>-</button>
        <p>{item.quantity}</p>
        <button onClick={() => addItemToCartById(item.id)}>+</button>
      </div>
    </li>
  );
}
