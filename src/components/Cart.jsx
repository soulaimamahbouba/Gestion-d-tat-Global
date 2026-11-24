import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItem, removeItem, clearCart } from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const isEmpty = items.length === 0;

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>My Redux Cart</h3>
        {!isEmpty && (
          <button onClick={() => dispatch(clearCart())}>Clear</button>
        )}
      </div>

      {isEmpty ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              <span>
                {item.name} ({item.price} DT x {item.quantity})
              </span>

              <div>
                <button onClick={() => dispatch(removeItem(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addItem(item))}>+</button>
              </div>
            </div>
          ))}

          <p>
            Total Items: <strong>{totalCount}</strong>
          </p>
          <p>
            Grand Total: <strong>{totalPrice} DT</strong>
          </p>
        </>
      )}
    </div>
  );
}