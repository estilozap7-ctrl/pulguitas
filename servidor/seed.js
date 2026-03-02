const { sequelize } = require('./src/config/db');
const {
    User, Category, Subcategory, Product, Service,
    Animal, Appointment, Sale, SaleDetail
} = require('./src/models');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        console.log('Sincronizando modelos...');
        await sequelize.sync({ force: true }); // Reiniciamos para asegurar limpieza
        console.log('Base de datos reiniciada.');

        const hashedPassword = await bcrypt.hash('pulguitas123', 10);

        // 1. CREAR ADMINISTRADORES
        console.log('Creando administradores...');
        const admin1 = await User.create({
            name: 'Carlos Admin',
            email: 'admin1@pulguitas.com',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '3001112233'
        });
        const admin2 = await User.create({
            name: 'Ana Admin',
            email: 'admin2@pulguitas.com',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '3004445566'
        });

        // 2. CREAR CLIENTES
        console.log('Creando clientes...');
        const clients = [];
        for (let i = 1; i <= 5; i++) {
            const client = await User.create({
                name: `Cliente ${i}`,
                email: `cliente${i}@correo.com`,
                password: hashedPassword,
                role: 'CLIENT',
                phone: `310000000${i}`
            });
            clients.push(client);
        }

        // 3. CREAR CATEGORÍAS Y SUBCATEGORÍAS
        console.log('Creando categorías y subcategorías...');
        const catProd = await Category.create({ name: 'PRODUCTO', type: 'PRODUCTO' });
        const catServ = await Category.create({ name: 'SERVICIO', type: 'SERVICIO' });

        const subAlimentos = await Subcategory.create({ name: 'Alimentos', category_id: catProd.id });
        const subFarmacia = await Subcategory.create({ name: 'Farmacia', category_id: catProd.id });
        const subAccesorios = await Subcategory.create({ name: 'Accesorios y Diversión', category_id: catProd.id });
        const subEstetica = await Subcategory.create({ name: 'Estética', category_id: catServ.id });
        const subClinica = await Subcategory.create({ name: 'Clínica', category_id: catServ.id });

        // 4. CREAR PRODUCTOS Y SERVICIOS
        console.log('Creando productos y servicios...');

        // Alimentos para Perros
        await Product.bulkCreate([
            {
                name: 'Pro Plan Puppy Large Breed',
                price: 85000,
                stock: 20,
                subcategory_id: subAlimentos.id,
                target_animal: 'Perro',
                life_stage: 'Cachorro',
                brand: 'Purina',
                description: 'Nutrición avanzada para cachorros de razas grandes.',
                features: 'Alto en proteínas, DHA para desarrollo cerebral'
            },
            {
                name: 'Royal Canin Adult Medium',
                price: 95000,
                stock: 15,
                subcategory_id: subAlimentos.id,
                target_animal: 'Perro',
                life_stage: 'Adulto',
                brand: 'Royal Canin',
                description: 'Equilibrio nutricional para perros medianos.',
                features: 'Apoyo digestivo, salud de piel y pelaje'
            },
            {
                name: 'Dog Chow Adulto Pollo',
                price: 45000,
                stock: 30,
                subcategory_id: subAlimentos.id,
                target_animal: 'Perro',
                life_stage: 'Adulto',
                brand: 'Purina',
                description: 'Alimento completo con ExtraLife.',
                features: 'Antioxidantes naturales, vitaminas y minerales'
            },
            {
                name: 'Pedigree Adulto Res',
                price: 38000,
                stock: 40,
                subcategory_id: subAlimentos.id,
                target_animal: 'Perro',
                life_stage: 'Adulto',
                brand: 'Pedigree',
                description: 'Nutrición completa y balanceada con sabor a res.',
                features: 'Limpieza dental, fibras naturales'
            },
            {
                name: 'Nutra Nuggets Lamb & Rice',
                price: 75000,
                stock: 10,
                subcategory_id: subAlimentos.id,
                target_animal: 'Perro',
                life_stage: 'Adulto',
                brand: 'Nutra Nuggets',
                description: 'Ideal para perros sensibles.',
                features: 'Sin maíz ni trigo, cordero real'
            }
        ]);

        // Alimentos para Gatos
        await Product.bulkCreate([
            {
                name: 'Whiskas Adulto Salmón',
                price: 32000,
                stock: 50,
                subcategory_id: subAlimentos.id,
                target_animal: 'Gato',
                life_stage: 'Adulto',
                brand: 'Whiskas',
                description: 'Proteína de alta calidad con sabor a salmón.',
                features: 'Vitaminas esenciales, control de pH urinario'
            },
            {
                name: 'Cat Chow Gatitos',
                price: 28000,
                stock: 45,
                subcategory_id: subAlimentos.id,
                target_animal: 'Gato',
                life_stage: 'Cachorro',
                brand: 'Purina',
                description: 'Defensas naturales para tu gatito.',
                features: 'DHA, colina y taurina'
            },
            {
                name: 'Royal Canin Kitten',
                price: 78000,
                stock: 12,
                subcategory_id: subAlimentos.id,
                target_animal: 'Gato',
                life_stage: 'Cachorro',
                brand: 'Royal Canin',
                description: 'Apoyo al sistema inmunológico del gatito.',
                features: 'Altamente digestible, prebióticos'
            },
            {
                name: 'Pro Plan Sterilized',
                price: 82000,
                stock: 18,
                subcategory_id: subAlimentos.id,
                target_animal: 'Gato',
                life_stage: 'Adulto',
                brand: 'Purina',
                description: 'Control de peso para gatos esterilizados.',
                features: 'Tecnología Optirenal, bajo en grasas'
            },
            {
                name: 'Mirringo Gatos Adultos',
                price: 15000,
                stock: 60,
                subcategory_id: subAlimentos.id,
                target_animal: 'Gato',
                life_stage: 'Adulto',
                brand: 'Mirringo',
                description: 'Nutrición al alcance de todos.',
                features: 'Multivitaminas, taurina'
            }
        ]);

        // Alimentos para Aves
        await Product.bulkCreate([
            {
                name: 'Mixtura Especial Canarios',
                price: 12000,
                stock: 100,
                subcategory_id: subAlimentos.id,
                target_animal: 'Ave',
                life_stage: 'Todas las edades',
                brand: 'Pet Bird',
                description: 'Mezcla premium de semillas para canarios.',
                features: 'Limpia de impurezas, alto en energía'
            },
            {
                name: 'Alpiste Purificado',
                price: 8000,
                stock: 80,
                subcategory_id: subAlimentos.id,
                target_animal: 'Ave',
                life_stage: 'Todas las edades',
                brand: 'Pet Bird',
                description: 'Alpiste de máxima calidad.',
                features: 'Rico en proteínas vegetales'
            },
            {
                name: 'Pasta de Cría Roja',
                price: 22000,
                stock: 25,
                subcategory_id: subAlimentos.id,
                target_animal: 'Ave',
                life_stage: 'Etapa de cría',
                brand: 'Orlux',
                description: 'Complemento para aves de color rojo.',
                features: 'Pigmentación natural, vitaminas'
            },
            {
                name: 'Barritas de Miel y Frutas',
                price: 6500,
                stock: 50,
                subcategory_id: subAlimentos.id,
                target_animal: 'Ave',
                life_stage: 'Todas las edades',
                brand: 'Living World',
                description: 'Golosina nutritiva para periquitos y ninfas.',
                features: 'Antiestrés, fácil de colgar'
            },
            {
                name: 'Super Alimento Loro Amazónico',
                price: 45000,
                stock: 15,
                subcategory_id: subAlimentos.id,
                target_animal: 'Ave',
                life_stage: 'Adulto',
                brand: 'ZuPreem',
                description: 'Extruido balanceado para loros grandes.',
                features: '21 vitaminas y minerales, sabores frutales'
            }
        ]);

        // Accesorios, Juguetes y Didácticos
        await Product.bulkCreate([
            // Perros
            {
                name: 'Mordedor de Caucho Irrompible',
                price: 25000,
                stock: 30,
                subcategory_id: subAccesorios.id,
                target_animal: 'Perro',
                brand: 'Kong',
                description: 'Juguete resistente para morder.',
                features: 'Durable, ayuda a la limpieza dental'
            },
            {
                name: 'Capa Impermeable Neón',
                price: 45000,
                stock: 12,
                subcategory_id: subAccesorios.id,
                target_animal: 'Perro',
                brand: 'PetStyle',
                description: 'Ropa para lluvia con reflectivo.',
                features: 'Impermeable, alta visibilidad'
            },
            {
                name: 'Alfombra Olfativa de Entrenamiento',
                price: 55000,
                stock: 8,
                subcategory_id: subAccesorios.id,
                target_animal: 'Perro',
                brand: 'SmartPet',
                description: 'Elemento didáctico para estimulación mental.',
                features: 'Lavable, reduce el estrés'
            },
            {
                name: 'Pelota con Sonido Gigante',
                price: 18000,
                stock: 25,
                subcategory_id: subAccesorios.id,
                target_animal: 'Perro',
                brand: 'FunnyDog',
                description: 'Juguete interactivo con sonido.',
                features: 'Flota en el agua'
            },
            {
                name: 'Chaleco Térmico de Invierno',
                price: 40000,
                stock: 15,
                subcategory_id: subAccesorios.id,
                target_animal: 'Perro',
                brand: 'PetStyle',
                description: 'Ropa abrigada para climas fríos.',
                features: 'Interior de ovejo, ajustable'
            },
            // Gatos
            {
                name: 'Túnel Plegable con Plumas',
                price: 35000,
                stock: 20,
                subcategory_id: subAccesorios.id,
                target_animal: 'Gato',
                brand: 'CatFun',
                description: 'Juguete de exploración.',
                features: 'Plegable, incluye juguetes colgantes'
            },
            {
                name: 'Rascador de Tres Niveles',
                price: 125000,
                stock: 5,
                subcategory_id: subAccesorios.id,
                target_animal: 'Gato',
                brand: 'Mirringo Home',
                description: 'Gimnasio completo para gatos.',
                features: 'Postes de sisal, plataforma acolchada'
            },
            {
                name: 'Suéter de Lana Diseño Galaxia',
                price: 25000,
                stock: 15,
                subcategory_id: subAccesorios.id,
                target_animal: 'Gato',
                brand: 'FancyCat',
                description: 'Ropa cómoda y elegante.',
                features: 'Lana antialérgica'
            },
            {
                name: 'Ratón a Control Remoto',
                price: 45000,
                stock: 10,
                subcategory_id: subAccesorios.id,
                target_animal: 'Gato',
                brand: 'SmartCat',
                description: 'Juguete didáctico y de caza.',
                features: 'Movimiento errático, carga USB'
            },
            {
                name: 'Varita con Plumas e Hilo Elástico',
                price: 12000,
                stock: 40,
                subcategory_id: subAccesorios.id,
                target_animal: 'Gato',
                brand: 'CatFun',
                description: 'Juguete de interacción con el dueño.',
                features: 'Mango ergonómico'
            },
            // Aves
            {
                name: 'Espejo con Campana Metálica',
                price: 15000,
                stock: 50,
                subcategory_id: subAccesorios.id,
                target_animal: 'Ave',
                brand: 'Pet Bird',
                description: 'Juguete de compañía para aves solas.',
                features: 'Resistente a picotazos'
            },
            {
                name: 'Columpio de Madera Natural',
                price: 22000,
                stock: 30,
                subcategory_id: subAccesorios.id,
                target_animal: 'Ave',
                brand: 'ExoBird',
                description: 'Accesorio de descanso y ejercicio.',
                features: 'Madera no tóxica'
            },
            {
                name: 'Arnés de Entrenamiento de Vuelo',
                price: 35000,
                stock: 10,
                subcategory_id: subAccesorios.id,
                target_animal: 'Ave',
                brand: 'Aviator',
                description: 'Elemento didáctico para paseos seguros.',
                features: 'Ajustable, ultra ligero'
            },
            {
                name: 'Bañera Externa Transparente',
                price: 18000,
                stock: 25,
                subcategory_id: subAccesorios.id,
                target_animal: 'Ave',
                brand: 'Pet Bird',
                description: 'Accesorio de higiene diaria.',
                features: 'Fácil instalación en puerta'
            },
            {
                name: 'Puzzle Despachador de Premios',
                price: 28000,
                stock: 15,
                subcategory_id: subAccesorios.id,
                target_animal: 'Ave',
                brand: 'SmartBird',
                description: 'Juguete didáctico de forrajeo.',
                features: 'Estimula el comportamiento natural'
            }
        ]);

        const desparasitante = await Product.create({
            name: 'Desparasitante Total',
            price: 25000,
            stock: 50,
            subcategory_id: subFarmacia.id,
            description: 'Efectivo contra parásitos internos y externos'
        });

        const servCirugia = await Service.create({
            name: 'Cirugía General',
            price: 150000,
            description: 'Intervención quirúrgica con anestesia general'
        });
        const servBano = await Service.create({
            name: 'Baño y Peluquería',
            price: 45000,
            description: 'Servicio completo de aseo y corte'
        });
        const servDesparasitacion = await Service.create({
            name: 'Servicio Desparasitación',
            price: 35000,
            description: 'Aplicación profesional de tratamiento'
        });

        // 5. REGISTRAR MASCOTAS (MASCOTAS POR CLIENTE)
        console.log('Registrando mascotas...');
        const animals = [];
        const animalNames = ['Toby', 'Luna', 'Max', 'Bella', 'Rocky'];
        for (let i = 0; i < 5; i++) {
            const animal = await Animal.create({
                name: animalNames[i],
                species: i % 2 === 0 ? 'Perro' : 'Gato',
                owner_id: clients[i].id
            });
            animals.push(animal);
        }

        // 6. CREAR CITAS (CIRUGÍA, BAÑO, DESPARASITACIÓN)
        console.log('Programando citas...');
        // Cliente 1 - Cirugía
        await Appointment.create({
            animal_id: animals[0].id,
            service_id: servCirugia.id,
            client_id: clients[0].id,
            staff_id: admin1.id,
            start_time: new Date(),
            end_time: new Date(Date.now() + 7200000), // 2h
            final_cost: servCirugia.price,
            status: 'PENDIENTE'
        });
        // Cliente 2 - Baño
        await Appointment.create({
            animal_id: animals[1].id,
            service_id: servBano.id,
            client_id: clients[1].id,
            staff_id: admin2.id,
            start_time: new Date(),
            end_time: new Date(Date.now() + 3600000), // 1h
            final_cost: servBano.price,
            status: 'CONFIRMADA'
        });
        // Cliente 3 - Desparasitación
        await Appointment.create({
            animal_id: animals[2].id,
            service_id: servDesparasitacion.id,
            client_id: clients[2].id,
            staff_id: admin1.id,
            start_time: new Date(),
            end_time: new Date(Date.now() + 1800000), // 30min
            final_cost: servDesparasitacion.price,
            status: 'COMPLETADA'
        });

        // 7. CREAR VENTAS (FACTURACIÓN)
        console.log('Generando facturación...');
        for (let i = 0; i < 3; i++) {
            const sale = await Sale.create({
                total: desparasitante.price * 2,
                client_id: clients[i].id,
                staff_id: admin1.id
            });
            await SaleDetail.create({
                sale_id: sale.id,
                product_id: desparasitante.id,
                quantity: 2,
                unit_price: desparasitante.price
            });
            // Descontar stock
            await desparasitante.decrement('stock', { by: 2 });
        }

        console.log('Seed finalizado con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('Error durante el seed:', error);
        process.exit(1);
    }
}

seed();
