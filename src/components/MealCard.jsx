import { useContext } from 'react';
import { CartContext } from '../store/CartContextProvider';
import currencyFormatter from '../util/formatter';

export default function MealCard({ item }) {
  const { id, name, description, price, image } = item;
  const { addItemToCart } = useContext(CartContext);

  return (
    <article key={id + 'Article'} className="meal-item">
      <img src={'http://192.168.50.151:3000/' + image} alt="" />
      <h3>{name}</h3>
      <p className="meal-item-price">{currencyFormatter(price)}</p>
      <p className="meal-item-description">{description}</p>
      <button
        className="meal-item-actions button"
        onClick={() => addItemToCart(item)}
      >
        Add to Cart
      </button>
    </article>
  );
}
