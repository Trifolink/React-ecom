import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Wishlist";
import { useState } from "react";

const App = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="header">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-between h-16">
              <Link to="/" className="text-xl font-bold text-gray-800">
                E-Commerce
              </Link>

              {/* menu burger pour tel */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              <div className="hidden md:flex items-center space-x-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  Accueil
                </NavLink>
                <NavLink 
                  to="/cart" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} relative`}
                >
                  Panier
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </NavLink>
                <NavLink 
                  to="/wishlist" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Liste de souhaits
                </NavLink>
              </div>
            </nav>

            {/* Menu tel */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-2`}>
              <div className="flex flex-col space-y-2">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} block py-2`}
                  end
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </NavLink>
                <NavLink 
                  to="/cart" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} block py-2 relative`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panier
                  {cartItemCount > 0 && (
                    <span className="absolute top-2 ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </NavLink>
                <NavLink 
                  to="/wishlist" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} block py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liste de souhaits
                </NavLink>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold mb-4">À propos</h3>
                <p className="text-gray-300">
                  Moi jdis c super beau 
                </p>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-300">
                  Email: contactmoibebou@example.com<br />
                  Téléphone: 06 37 30 09 37 
                </p>
              </div>
              <div className="text-center sm:text-left col-span-1 sm:col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
                <div className="flex justify-center sm:justify-start space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Face de book
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Twit heure
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Insta lock
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
              <p>Tous droits réservés a moi (le jesus).</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
