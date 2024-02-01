import currencyFormatter from './formatter';

export default function getTotalPriceInCart(cartItems) {
  const totalPrice = cartItems.reduce(
    (totalPrice, curItem) => totalPrice + curItem.itemPrice * curItem.quantity,
    0,
  );

  return currencyFormatter(totalPrice);
}
