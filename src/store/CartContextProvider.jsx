import { createContext, useState } from 'react';

function getNewCartItem(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    img: item.img,
    itemPrice: item.price,
    quantity: 1,
  };
}

function updateCartItemQuantity(prevCart, itemIdx, quantityChange) {
  const newCartState = [...prevCart];
  const itemToUpdate = { ...newCartState[itemIdx] };

  if (quantityChange < 0 && itemToUpdate.quantity + quantityChange <= 0) {
    newCartState.splice(itemIdx, 1);
  } else {
    itemToUpdate.quantity = itemToUpdate.quantity + quantityChange;
    newCartState[itemIdx] = itemToUpdate;
  }

  return newCartState;
}

export const CartContext = createContext({
  items: [],
});

export default function CartContextProvider({ children }) {
  const [items, setItems] = useState([]);

  function handleAddItem(itemObj, quantity = 1) {
    setItems((prevItems) => {
      const existingItemIdx = prevItems.findIndex(
        (iter) => iter.id === itemObj.id,
      );

      if (existingItemIdx >= 0) {
        // returns a new cart state with updated item included
        return updateCartItemQuantity(prevItems, existingItemIdx, quantity);
      }

      return [...prevItems, getNewCartItem(itemObj)];
    });
  }

  function handleIncrementCartItem(itemId, quantity = 1) {
    const filteredItems = items.filter((item) => item.id === itemId);
    if (filteredItems?.length === 1) {
      return handleAddItem(filteredItems[0], quantity);
    }
    console.log(
      'WARN: Weird increment quantity for item request -- not doing anything',
    );
  }

  function handleRemoveItem(itemId) {
    setItems((prevItems) => {
      const existingItemIdx = prevItems.findIndex((iter) => iter.id === itemId);

      if (existingItemIdx >= 0) {
        // returns a new cart state with updated item included
        return updateCartItemQuantity(prevItems, existingItemIdx, -1);
      } else {
        console.log("WARN: couldn't find the item designated for removal");
      }
      return prevItems;
    });
  }

  function handleResetCart() {
    setItems([]);
  }

  const ctxValue = {
    cartItems: items,
    addItemToCart: handleAddItem,
    addItemToCartById: handleIncrementCartItem,
    removeItemFromCart: handleRemoveItem,
    resetCart: handleResetCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
