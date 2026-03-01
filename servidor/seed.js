const { sequelize } = require('./src/config/db');
const { User } = require('./src/models');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        console.log('Sincronizando modelos...');
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados correctamente.');

        console.log('Creando usuario administrador...');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const [user, created] = await User.findOrCreate({
            where: { email: 'admin@pulguitas.com' },
            defaults: {
                name: 'Administrador Pulguitas',
                password: hashedPassword,
                role: 'ADMIN',
                phone: '123456789'
            }
        });

        if (created) {
            console.log('Usuario administrador creado con éxito: admin@pulguitas.com / admin123');
        } else {
            console.log('El usuario administrador ya existe.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error durante la sincronización/seed:', error);
        process.exit(1);
    }
}

seed();
