import { useState, useEffect, useMemo, useContext } from 'react';

/**
 * 2.4 Abstraction (Trừu tượng hóa) Repository Pattern (Mẫu Repository)
 * Khái niệm: Tạo một lớp trung gian giữa component và data source.
 * Lợi ích: Tách biệt logic business logic và data access logic.
 */
// Abstract base class
class BaseRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.cache = new Map();
  }

  // Template method - định nghĩa workflow chung
  async findById(id) {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    // Fetch from API
    const data = await this.fetchById(id);
    
    // Cache result
    this.cache.set(id, data);
    
    return data;
  }

  // Abstract methods - phải được implement bởi subclass
  async fetchById(id) {
    throw new Error('fetchById must be implemented');
  }

  async create(data) {
    throw new Error('create must be implemented');
  }

  async update(id, data) {
    throw new Error('update must be implemented');
  }

  async delete(id) {
    throw new Error('delete must be implemented');
  }
}

// Concrete implementations
class ProductRepository extends BaseRepository {
  async fetchById(id) {
    const response = await this.apiClient.get(`/products/${id}`);
    return response.data;
  }

  async create(productData) {
    const response = await this.apiClient.post('/products', productData);
    return response.data;
  }

  async update(id, productData) {
    const response = await this.apiClient.put(`/products/${id}`, productData);
    this.cache.delete(id); // Invalidate cache
    return response.data;
  }

  async delete(id) {
    await this.apiClient.delete(`/products/${id}`);
    this.cache.delete(id); // Invalidate cache
    return true;
  }

  // Specific methods for products
  async findByCategory(categoryId) {
    const response = await this.apiClient.get(`/products?category=${categoryId}`);
    return response.data;
  }
}

class UserRepository extends BaseRepository {
  async fetchById(id) {
    const response = await this.apiClient.get(`/users/${id}`);
    return response.data;
  }

  async create(userData) {
    const response = await this.apiClient.post('/users', userData);
    return response.data;
  }

  async update(id, userData) {
    const response = await this.apiClient.put(`/users/${id}`, userData);
    this.cache.delete(id);
    return response.data;
  }

  async delete(id) {
    await this.apiClient.delete(`/users/${id}`);
    this.cache.delete(id);
    return true;
  }

  // Specific methods for users
  async findByEmail(email) {
    const response = await this.apiClient.get(`/users?email=${email}`);
    return response.data;
  }
}

// Repository factory
class RepositoryFactory {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.repositories = new Map();
  }

  getRepository(type) {
    if (!this.repositories.has(type)) {
      switch (type) {
        case 'product':
          this.repositories.set(type, new ProductRepository(this.apiClient));
          break;
        case 'user':
          this.repositories.set(type, new UserRepository(this.apiClient));
          break;
        default:
          throw new Error(`Unknown repository type: ${type}`);
      }
    }
    return this.repositories.get(type);
  }
}

// Custom hook sử dụng repository pattern
const useRepository = (type) => {
  const apiClient = useContext();
  const repositoryFactory = useMemo(() => new RepositoryFactory(apiClient), [apiClient]);
  
  return repositoryFactory.getRepository(type);
};

// Sử dụng trong component
const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const productRepo = useRepository('product');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // Sử dụng repository - không cần biết implementation details
        const productData = await productRepo.findById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, productRepo]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price.toLocaleString()}đ</p>
    </div>
  );
};