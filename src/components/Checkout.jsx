import { useContext } from 'react';
import InputGroup from './InputGroup';
import { CartContext } from '../store/CartContextProvider';
import getTotalPriceInCart from '../util/cart';

export default function Checkout({ handleModalClose, handleNextAction }) {
  const { cartItems, resetCart } = useContext(CartContext);

  async function sendOrder(postData) {
    console.log(JSON.stringify(postData));
    const res = await fetch('http://192.168.50.151:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      throw Error("Couldn't fetch data");
    }
    const resJson = await res.json();
    console.log('INFO: ' + JSON.stringify(resJson));

    resetCart();
    handleNextAction();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const reqBody = {
      order: {
        customer: data,
        items: cartItems,
      },
    };
    sendOrder(reqBody)
      .then(() => event.target.reset())
      .catch((err) => {
        console.log('ERROR: failed to post order to server - ' + err);
        event.target.reset();
      });
  }

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: {getTotalPriceInCart(cartItems)}</p>
      <form className="control" onSubmit={handleSubmit}>
        <InputGroup id="name" name="name" label="Full Name" required />
        <InputGroup
          id="email"
          name="email"
          type="email"
          label="Email"
          required
        />
        <InputGroup id="street" name="street" label="Street" required />
        <div className="control-row">
          <InputGroup
            id="postal-code"
            name="postal-code"
            label="Zipcode"
            required
          />
          <InputGroup id="city" name="city" label="City" required />
        </div>
        <div className="modal-actions">
          <button className="text-button" onClick={handleModalClose}>
            Close
          </button>
          <button className="button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </>
  );
}
