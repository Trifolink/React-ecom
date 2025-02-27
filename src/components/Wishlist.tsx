import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="main-container py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
        Ma Liste de Souhaits
      </h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Votre liste de souhaits est vide.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {wishlistItems.map((product) => (
            <div key={product.id} className="product-card relative">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {product.title}
                </h2>
              </Link>
              
              <div className="space-y-2">
                <p className="text-lg font-bold text-gray-900">
                  {product.price} EUR
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-100 text-green-600 px-2 py-1 rounded">
                    {product.reviews.length} Avis
                  </span>
                  <span className="text-gray-600">
                    Note: {product.rating}/5
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="flex-1 btn-ajoutpanier"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 