import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; 
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Product } from "../store/productSlice"; 

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); 
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return (
      cartItems?.reduce((total, item: Product) => total + item.price * (item.quantity ?? 1), 0)
        .toFixed(2) || "0.00"
    );
  };

  console.log(cartItems); 

  return (
    <div className="main-container py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
        Votre Panier
      </h1>
      
      {cartItems && cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-grow space-y-4">
            {cartItems?.map((item) => (
              <div key={item.id} className="product-card flex flex-col sm:flex-row gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-grow space-y-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.price} EUR</p>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ 
                        id: item.id, 
                        quantity: Math.max(1, (item.quantity ?? 1) - 1) 
                      }))}
                      className="btn-precedant px-3 py-1"
                      disabled={(item.quantity ?? 1) <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity ?? 1}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ 
                        id: item.id, 
                        quantity: (item.quantity ?? 1) + 1 
                      }))}
                      className="btn-precedant px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          <div className="lg:w-96">
            <div className="product-card space-y-4">
              <h2 className="text-xl font-semibold">Résumé</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{calculateTotal()} EUR</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{calculateTotal()} EUR</span>
                </div>
              </div>
              <button className="w-full btn-ajoutpanier">
                Procéder au paiement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
