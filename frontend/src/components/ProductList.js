import React, { useEffect, useState } from 'react';
import axiosApi from '../axiosApi'; 

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosApi.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const handleDelete = id => {
        axiosApi.delete(`/products/${id}`)
            .then(() => {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Listado de Productos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.descripcion}</td>
                            <td><img src={product.imagen} alt={product.nombre} style={{ width: '100px' }} /></td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(product)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
