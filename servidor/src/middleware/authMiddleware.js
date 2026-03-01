const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No se proporciona token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        req.user = user;
        req.userId = user.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: 'Requiere rol de Administrador' });
    }
};

module.exports = { verifyToken, isAdmin };
