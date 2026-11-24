import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../redux/cartSlice';

const PRODUCTS = [
  { id: 1, name: 'Écran UltraWide 4K 34"', price: 850, category: 'Affichage', icon: '🖥️' },
  { id: 2, name: 'Clavier Mécanique RGB', price: 180, category: 'Périphérique', icon: '⌨️' },
  { id: 3, name: 'Souris Sans Fil Ergonomique', price: 95, category: 'Accessoire', icon: '🖱️' },
  { id: 4, name: 'Casque Haute Fidélité ANC', price: 320, category: 'Audio', icon: '🎧' },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <section className="catalog-card">
      <div className="section-heading">
        <h2><span aria-hidden="true">📦</span> Catalogue Produits</h2>
        <p>Chaque clic sur le bouton déclenche une action via <code>dispatch(addItem(product))</code>.</p>
      </div>
      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-meta">
              <span className="product-icon" aria-hidden="true">{product.icon}</span>
              <span className="product-category">{product.category}</span>
            </div>
            <h3>{product.name}</h3>
            <div className="product-footer">
              <strong>{product.price} DT</strong>
              <button className="primary-button" onClick={() => dispatch(addItem(product))}>
                + Ajouter
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
