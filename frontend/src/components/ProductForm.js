import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                nombre: product.nombre || '',
                precio: product.precio || 0,
                descripcion: product.descripcion || '',
                imagen: product.imagen || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="imagen">Imagen URL</label>
                <input
                    type="text"
                    className="form-control"
                    id="imagen"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-success">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default ProductForm;
