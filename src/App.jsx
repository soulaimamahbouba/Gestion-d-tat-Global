import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App() {
  const { theme } = useContext(ThemeContext);

  // La classe "light" ou "dark" choisit les couleurs définies dans index.css
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="page">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}
