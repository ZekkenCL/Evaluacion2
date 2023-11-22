import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import axiosApi from './axiosApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);


    useEffect(() => {
        axiosApi.get('/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error al cargar productos:', error));
    }, []);

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
    };

    const handleDeleteProduct = (productId) => {
        axiosApi.delete(`/products/${productId}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== productId));
            })
            .catch(error => console.error('Error al eliminar producto:', error));
    };

    const handleFormSubmit = (productData) => {
        const method = productData.id ? 'put' : 'post';
        const url = productData.id ? `/products/${productData.id}` : '/products';

        axiosApi[method](url, productData)
            .then(response => {
                if (productData.id) {
                    setProducts(products.map(p => p.id === productData.id ? response.data : p));
                } else {
                    setProducts([...products, response.data]);
                }
                setCurrentProduct(null);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container mt-4">
            <h1>Gestión de Productos</h1>
            {currentProduct ? (
                <ProductForm 
                    product={currentProduct} 
                    onSave={handleFormSubmit} 
                    onCancel={() => setCurrentProduct(null)}
                />
            ) : (
                <>
                    <button className="btn btn-primary mb-3" onClick={() => setCurrentProduct({})}>
                        Agregar Producto
                    </button>
                    <ProductList 
                        products={products} 
                        onEdit={handleEditProduct} 
                        onDelete={handleDeleteProduct} 
                    />
                </>
            )}
        </div>
    );
};

export default App;

