import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import { fetchProducts, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Product } from "../store/productSlice";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { items, isLoading, currentPage } = useSelector((state: RootState) => state.products);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  }, [items, selectedCategory]);

  const categories = Array.from(new Set(items.map(item => item.category))).sort();

  const handleSearch = (query: string) => {
    let filtered = items;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (query) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    return filteredItems.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredItems.length / 12);

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-8">Chargement...</p>;
  }

  return (
    <div className="main-container py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
        Liste des Produits
      </h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 justify-center">
        <div className="w-full sm:w-96">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="w-full sm:w-64">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 my-8">
          Aucun produit ne correspond à vos critères.
        </p>
      ) : (
        <div className="products-grid">
          {getCurrentPageItems().map((product) => (
            <div key={product.id} className="product-card relative">
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 ${
                  isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <i className={`bx ${isInWishlist(product.id) ? 'bxs-heart' : 'bx-heart'} text-2xl`}></i>
              </button>
              
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-img mb-3"
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
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {product.reviews.length} Avis
                  </span>
                  <span className="text-gray-600">
                    Note: {product.rating}/5
                  </span>
                </div>
                
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full btn-ajoutpanier mt-2"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-6 sm:mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="btn-precedant disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        
        <span className="text-gray-600">
          Page {currentPage} sur {totalPages}
        </span>
        
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="btn-precedant"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
