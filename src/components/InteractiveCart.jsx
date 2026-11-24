import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, removeItem } from '../redux/cartSlice';
import { applyPromoCode } from '../redux/interactiveCart';

const PROMO_CODE = 'POLY2027';

function formatPrice(price) {
  return Number.isInteger(price) ? price : price.toFixed(2);
}

export default function InteractiveCart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const discountedPrice = totalPrice * (1 - discountPercent / 100);

  const handleApplyPromo = (event) => {
    event.preventDefault();
    const normalizedCode = promoCode.trim().toUpperCase();
    dispatch(applyPromoCode(normalizedCode));
    setPromoMessage(
      normalizedCode === PROMO_CODE
        ? 'Code promo appliqué : 20 % de remise.'
        : 'Code promo invalide.'
    );
  };

  return (
    <section className="cart-card">
      <div className="cart-header">
        <h2><span aria-hidden="true">🛒</span> Mon Panier Redux</h2>
        {items.length > 0 && (
          <button className="clear-button" onClick={() => dispatch(clearCart())}>Vider</button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="empty-cart">Votre panier est actuellement vide.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <span className="cart-product-icon" aria-hidden="true">{item.icon || '📦'}</span>
                <div className="cart-product-details">
                  <strong>{item.name}</strong>
                  <small>{item.price} DT × {item.quantity} <b>= {item.price * item.quantity} DT</b></small>
                </div>
                <div className="quantity-controls">
                  <button aria-label={`Retirer un ${item.name}`} onClick={() => dispatch(removeItem(item.id))}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Ajouter un ${item.name}`} onClick={() => dispatch(addItem(item))}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p><span>Nombre total d’articles :</span><strong>{totalCount}</strong></p>
            <p className="grand-total">
              <span>Montant Total :</span>
              <strong>{formatPrice(discountedPrice)} DT</strong>
            </p>
            {discountPercent > 0 && <p className="discount-note">Remise de {discountPercent} % appliquée</p>}
          </div>
        </>
      )}

      <form onSubmit={handleApplyPromo}>
        <label htmlFor="promo-code">Code promo</label>
        <div className="promo-controls">
          <input
            id="promo-code"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder="POLY2027"
          />
          <button type="submit">Apply</button>
        </div>
      </form>
      {promoMessage && <p role="status">{promoMessage}</p>}

    </section>
  );
}
