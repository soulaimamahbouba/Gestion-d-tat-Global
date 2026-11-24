import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import InteractiveCart from './components/InteractiveCart';
import NotificationToast from './components/NotificationToast';

export default function InteractiveApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="page">
        <header className="page-heading">
          <h1>
            État Global : <span>useContext</span> &amp; <span>Redux Toolkit</span>
          </h1>
          <p>
            Séance 6 : coexistence d’un état applicatif léger (thème géré par Context)
            et d’un état métier transactionnel (panier géré par Redux Toolkit).
          </p>
        </header>
        <ProductList />
        <InteractiveCart />
      </main>
      <NotificationToast />
    </div>
  );
}
