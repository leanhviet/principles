import { useState, useEffect } from 'react';

/**
 * 2.1 Encapsulation (Đóng gói)
 * Khái niệm: Giấu đi các chi tiết implementation, chỉ expose những gì cần thiết.
 * Lợi ích: Component không cần biết API service hoạt động như thế nào, chỉ cần biết cách sử dụng.
 */
export default class ApiService {
  #baseURL = 'https://api.example.com'; // Private field
  #token = null;

  constructor() {
    this.#token = localStorage.getItem('auth_token');
  }

  // Public method - người dùng chỉ cần biết cách gọi
  async getProducts() {
    return this.#makeRequest('/products');
  }

  async createProduct(productData) {
    return this.#makeRequest('/products', 'POST', productData);
  }

  // Private method - logic internal, user không cần biết
  #makeRequest(endpoint, method = 'GET', data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.#token}`
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    return fetch(`${this.#baseURL}${endpoint}`, config)
      .then(response => response.json());
  }
}

// Sử dụng trong React component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const apiService = new ApiService();

  useEffect(() => {
    // Chỉ cần gọi method public, không cần biết implementation
    apiService.getProducts()
      .then(setProducts);
  }, []);

  return (
    <div>
      {/* {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))} */}
    </div>
  );
};
