import React from 'react'
import { Package, Activity, Heart, MoreHorizontal } from 'lucide-react'

function App() {
    const categories = [
        { title: 'Alimentos', icon: <Package />, description: 'Venta para domésticos' },
        { title: 'Actividades', icon: <Activity />, description: 'Recreación y entrenamiento' },
        { title: 'Salud', icon: <Heart />, description: 'Higiene y medicina' },
        { title: 'Varios', icon: <MoreHorizontal />, description: 'Accesorios y otros' },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-indigo-500">Pulguitas Veterinaria</h1>
                <p className="text-gray-400 mt-2">Gestión de Inventario y Actividades</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="p-8 bg-gray-900 border border-gray-800 rounded-2xl hover:border-indigo-500 transition cursor-pointer">
                        <div className="mb-4 text-indigo-400">{cat.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
                        <p className="text-gray-500 text-sm">{cat.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
