export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 100.95,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Your perfect pack for everyday use and walks in the forest."
  },
  // ... more products
];

export const CATEGORIES = [
  "all", "electronics", "Jewelery", "men's clothing", "women's clothing"
];

// Helper functions
export const getCategories = (products) => {
  if (!products || products.length == 0) return CATEGORIES;
  const categories = products.map(product => product.category);
  return ['all', ...new Set(categories)];
};

export const filterByCategory = (products, category) => {
  if (!products) return [];
  if (category === 'all') return products;
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = (products, searchTerm) => {
  if (!products) return [];
  if (!searchTerm || searchTerm.trim() === '') return products;
  
  const term = searchTerm.toLowerCase().trim();
  return products.filter(product =>
    product.title.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
};