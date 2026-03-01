const { Sale, SaleDetail, Product, sequelize } = require('../models');
const { logActivity } = require('../utils/activityLogger');

/**
 * Registra una nueva venta, descuenta stock y genera logs de actividad.
 */
exports.createSale = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { items } = req.body; // Array de { product_id, quantity }
        let totalSale = 0;

        // 1. Crear la cabecera de la venta
        const sale = await Sale.create({
            staff_id: req.userId || 1, // El que realiza la venta
            total: 0
        }, { transaction: t });

        // 2. Procesar cada producto
        for (const item of items) {
            const product = await Product.findByPk(item.product_id, { transaction: t });

            if (!product) {
                throw new Error(`Producto con ID ${item.product_id} no encontrado`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
            }

            const subtotal = product.price * item.quantity;
            totalSale += subtotal;

            // Crear detalle
            await SaleDetail.create({
                sale_id: sale.id,
                product_id: product.id,
                quantity: item.quantity,
                unit_price: product.price
            }, { transaction: t });

            // Descontar stock
            await product.update({
                stock: product.stock - item.quantity
            }, { transaction: t });
        }

        // 3. Actualizar total de la venta
        await sale.update({ total: totalSale }, { transaction: t });

        // 4. Registrar en el Log de Actividad
        await logActivity({
            action: 'VENTA_REALIZADA',
            description: `Venta #${sale.id} completada. Total: $${totalSale}`,
            userId: req.userId || 1,
            entityType: 'VENTA',
            saleId: sale.id
        });

        await t.commit();
        res.status(201).json({ message: 'Venta realizada con éxito', sale_id: sale.id, total: totalSale });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error al procesar la venta', error: error.message });
    }
};

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [{ model: SaleDetail, include: [Product] }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
