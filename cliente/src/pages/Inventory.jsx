import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, fetchCategories, createCategory, fetchSubcategories, createSubcategory } from '../redux/slices/inventorySlice';
import { Package, Plus, X, Search, Tags, Image as ImageIcon, Layers } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSubmit, isSubmitting, categories, subcategories }) => {
    const [formData, setFormData] = useState({
        name: '', price: '', stock: '', category_id: '', subcategory_id: '',
        target_animal: 'Todos', life_stage: 'Todas las edades', brand: '', features: ''
    });

    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    useEffect(() => {
        if (formData.category_id) {
            setFilteredSubcategories(subcategories.filter(sub => sub.category_id === parseInt(formData.category_id)));
            setFormData(prev => ({ ...prev, subcategory_id: '' })); // Reset subcategory when category changes
        } else {
            setFilteredSubcategories([]);
        }
    }, [formData.category_id, subcategories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', price: '', stock: '', category_id: '', subcategory_id: '', target_animal: 'Todos', life_stage: 'Todas las edades', brand: '', features: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Nuevo Producto</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Precio ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Stock Inicial</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Categoría Padre</label>
                            <select
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Selecciona Categoría...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Subcategoría</label>
                            <select
                                value={formData.subcategory_id}
                                onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
                                disabled={!formData.category_id}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                            >
                                <option value="">{formData.category_id ? 'Selecciona Subcategoría...' : 'Elige una Categoría primero'}</option>
                                {filteredSubcategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Especie (Mascota Destino)</label>
                            <select
                                value={formData.target_animal}
                                onChange={(e) => setFormData({ ...formData, target_animal: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Todos">Todas las Especies</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Ave">Ave</option>
                                <option value="Pez">Pez</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Etapa de Vida</label>
                            <select
                                value={formData.life_stage}
                                onChange={(e) => setFormData({ ...formData, life_stage: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Todas las edades">Todas las edades</option>
                                <option value="Cachorro">Cachorro</option>
                                <option value="Adulto">Adulto</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Marca</label>
                            <input
                                type="text"
                                placeholder="Opcional"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Características/Detalles</label>
                        <textarea
                            rows="2"
                            placeholder="Ej. Uso adulto, Hipoalergénico..."
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const SubcategoryModal = ({ isOpen, onClose, onSubmit, isSubmitting, categories }) => {
    const [formData, setFormData] = useState({ name: '', category_id: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', category_id: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Nueva Subcategoría</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Categoría Principal (Padre)</label>
                        <select
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            required
                        >
                            <option value="">Selecciona Categoría Padre...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Nombre de Subcategoría</label>
                        <input
                            type="text"
                            placeholder="Ej. Comida Seca, Juguetes de goma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Crear Subcategoría'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const CategoryModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({ name: '', type: 'PRODUCTO', image_url: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', type: 'PRODUCTO', image_url: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Nueva Categoría</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Nombre de Categoría</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Tipo</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="PRODUCTO">Producto Físico</option>
                            <option value="SERVICIO">Servicio (ej. Lavado)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">URL de Imagen (Opcional)</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="url"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        {formData.image_url && (
                            <div className="mt-3 bg-gray-800 rounded-lg p-2 flex justify-center border border-gray-700">
                                <img src={formData.image_url} alt="Preview" className="h-20 object-contain rounded" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Categoría'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const Inventory = () => {
    const dispatch = useDispatch();
    const { products, categories, subcategories, loading, error } = useSelector((state) => state.inventory);

    // UI State
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'categories'
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchSubcategories());
    }, [dispatch]);

    const handleCreateProduct = async (data) => {
        const result = await dispatch(createProduct(data));
        if (createProduct.fulfilled.match(result)) {
            setIsProductModalOpen(false);
        }
    };

    const handleCreateCategory = async (data) => {
        const result = await dispatch(createCategory(data));
        if (createCategory.fulfilled.match(result)) {
            setIsCategoryModalOpen(false);
        }
    };

    const handleCreateSubcategory = async (data) => {
        const result = await dispatch(createSubcategory(data));
        if (createSubcategory.fulfilled.match(result)) {
            setIsSubcategoryModalOpen(false);
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Inventario</h1>

                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors border border-gray-700"
                        title="Categoría Principal"
                    >
                        <Plus size={18} className="text-gray-400" />
                        <Tags size={18} className="hidden sm:block text-indigo-400" />
                    </button>
                    <button
                        onClick={() => setIsSubcategoryModalOpen(true)}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors border border-gray-700"
                        title="Subcategoría"
                    >
                        <Plus size={18} className="text-gray-400" />
                        <Layers size={18} className="hidden sm:block text-pink-400" />
                    </button>
                    <button
                        onClick={() => setIsProductModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        <Plus size={20} />
                        <span>Producto</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 border-b border-gray-800 mb-6">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`py-3 px-6 flex items-center space-x-2 border-b-2 font-medium transition-colors ${activeTab === 'products' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'}`}
                >
                    <Package size={18} />
                    <span>Productos</span>
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`py-3 px-6 flex items-center space-x-2 border-b-2 font-medium transition-colors ${activeTab === 'categories' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'}`}
                >
                    <Tags size={18} />
                    <span>Categorías</span>
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={`Buscar ${activeTab === 'products' ? 'productos' : 'categorías'}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
                />
            </div>

            {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">{error}</div>}

            {activeTab === 'products' ? (
                // PRODUCTS TABLE
                loading && products.length === 0 ? (
                    <div className="text-gray-400 flex justify-center py-12">Cargando productos...</div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-800/50 border-b border-gray-800">
                                    <th className="p-4 text-gray-400 font-medium text-sm">Producto</th>
                                    <th className="p-4 text-gray-400 font-medium text-sm" title="Animal Objetivo">Animal</th>
                                    <th className="p-4 text-gray-400 font-medium text-sm">Categoría</th>
                                    <th className="p-4 text-gray-400 font-medium text-sm">Precio</th>
                                    <th className="p-4 text-gray-400 font-medium text-sm">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length === 0 ? (
                                    <tr><td colSpan="5" className="p-8 text-center text-gray-500">No se encontraron productos.</td></tr>
                                ) : filteredProducts.map(prod => (
                                    <tr key={prod.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                                        <td className="p-4 flex flex-col justify-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Package size={18} /></div>
                                                <div>
                                                    <span className="text-white font-medium block">{prod.name}</span>
                                                    {prod.brand && <span className="text-xs text-gray-500">{prod.brand}</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-semibold tracking-wide ${prod.target_animal === 'Perro' ? 'bg-amber-500/10 text-amber-500' : prod.target_animal === 'Gato' ? 'bg-orange-500/10 text-orange-500' : 'bg-gray-500/10 text-gray-400'}`}>
                                                {prod.target_animal || 'Todos'}
                                            </span>
                                            {prod.life_stage && prod.life_stage !== 'Todas las edades' && (
                                                <span className="block mt-1 text-[10px] uppercase text-gray-500 font-medium">
                                                    {prod.life_stage}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">
                                            <span className="block text-white">{categories.find(c => c.id === prod.category_id)?.name || 'N/A'}</span>
                                            {prod.subcategory_id && (
                                                <span className="text-xs text-indigo-400 flex items-center mt-1">
                                                    <Layers size={12} className="mr-1" />
                                                    {subcategories.find(s => s.id === prod.subcategory_id)?.name}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-green-400 font-medium">${prod.price}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${prod.stock > 10 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {prod.stock} u.
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                // CATEGORIES GRID
                loading && categories.length === 0 ? (
                    <div className="text-gray-400 flex justify-center py-12">Cargando categorías...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCategories.length === 0 ? (
                            <div className="col-span-full p-8 text-center text-gray-500 border border-gray-800 rounded-2xl border-dashed">No se encontraron categorías.</div>
                        ) : filteredCategories.map(cat => (
                            <div key={cat.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors group">
                                {cat.image_url ? (
                                    <div className="h-40 w-full overflow-hidden bg-gray-800 relative">
                                        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                    </div>
                                ) : (
                                    <div className="h-40 w-full bg-gray-800 flex items-center justify-center border-b border-gray-800">
                                        <Tags size={40} className="text-gray-600" />
                                    </div>
                                )}
                                <div className="p-4 relative">
                                    <span className={`absolute -top-3 right-4 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md shadow-sm ${cat.type === 'SERVICIO' ? 'bg-pink-500 text-white' : 'bg-indigo-500 text-white'}`}>
                                        {cat.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
                                    <p className="text-xs text-gray-500 flex items-center">
                                        ID: {cat.id} • {products.filter(p => p.category_id === cat.id).length} productos
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSubmit={handleCreateProduct}
                isSubmitting={loading}
                categories={categories}
                subcategories={subcategories}
            />

            <SubcategoryModal
                isOpen={isSubcategoryModalOpen}
                onClose={() => setIsSubcategoryModalOpen(false)}
                onSubmit={handleCreateSubcategory}
                isSubmitting={loading}
                categories={categories}
            />

            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onSubmit={handleCreateCategory}
                isSubmitting={loading}
            />
        </div>
    );
};

export default Inventory;
