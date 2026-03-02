import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/inventorySlice';
import { addToCart, removeFromCart, updateQuantity, createSale, clearCart } from '../redux/slices/salesSlice';
import { Trash2, ShoppingCart, Search, CreditCard } from 'lucide-react';

const POS = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.inventory);
    const { cart, loading, error } = useSelector(state => state.sales);
    const { user } = useSelector(state => state.auth);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch]);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const saleData = {
            staff_id: user?.id,
            total: cartTotal,
            // Podríamos enviar details si el backend tiene un endpoint complejo o un array
            // details: cart.map(item => ({ product_id: item.id, quantity: item.quantity, price: item.price }))
        };

        dispatch(createSale(saleData));
    };

    return (
        <div className="flex h-full gap-6">
            {/* Sector Izquierdo: Buscador y Lista de Productos */}
            <div className="flex-1 flex flex-col space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar producto por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map(prod => (
                            <div
                                key={prod.id}
                                onClick={() => dispatch(addToCart(prod))}
                                className="bg-gray-800/50 hover:bg-indigo-500/20 border border-gray-700 hover:border-indigo-500 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center"
                            >
                                <span className="font-bold text-white mb-2">{prod.name}</span>
                                <span className="text-sm font-semibold text-green-400">${prod.price}</span>
                                <span className="text-xs text-gray-400 mt-1">Stock: {prod.stock}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sector Derecho: Carrito / Ticket */}
            <div className="w-1/3 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-gray-800/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center"><ShoppingCart className="mr-2" size={20} /> Ticket de Venta</h2>
                    <button onClick={() => dispatch(clearCart())} className="text-gray-400 hover:text-red-400 transition-colors text-sm underline">Vaciar</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">Agrega productos al carrito</div>
                    ) : cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-800/30 p-3 rounded-lg border border-gray-800">
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm leading-tight">{item.name}</p>
                                <p className="text-indigo-400 text-sm">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                                    className="w-12 bg-gray-950 border border-gray-700 rounded text-center text-white py-1 focus:outline-none focus:border-indigo-500"
                                />
                                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-gray-800 mt-auto border-t border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 font-medium">Total</span>
                        <span className="text-3xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    {error && <div className="text-red-500 text-sm mb-3 bg-red-500/10 p-2 rounded">{error}</div>}
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || loading}
                        className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-lg transition-colors
                            ${cart.length > 0 && !loading
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                    >
                        <CreditCard className="mr-2" />
                        {loading ? 'Procesando...' : 'Cobrar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default POS;
