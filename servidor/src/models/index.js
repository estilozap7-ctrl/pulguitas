const User = require('./User');
const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Product = require('./Product');
const Service = require('./Service');
const Animal = require('./Animal');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');
const ActivityLog = require('./ActivityLog');
const Appointment = require('./Appointment');
const Availability = require('./Availability');

// USERS & ANIMALS
User.hasMany(Animal, { foreignKey: 'owner_id' });
Animal.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// CATEGORIES AND SUBCATEGORIES
Category.hasMany(Subcategory, { foreignKey: 'category_id' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Subcategory.hasMany(Product, { foreignKey: 'subcategory_id' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

Category.hasMany(Service, { foreignKey: 'category_id' });
Service.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// SALES
User.hasMany(Sale, { foreignKey: 'client_id' });
Sale.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

User.hasMany(Sale, { foreignKey: 'staff_id' });
Sale.belongsTo(User, { foreignKey: 'staff_id', as: 'staff' });

Sale.hasMany(SaleDetail, { foreignKey: 'sale_id' });
SaleDetail.belongsTo(Sale, { foreignKey: 'sale_id' });

Product.hasMany(SaleDetail, { foreignKey: 'product_id' });
SaleDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// APPOINTMENTS
User.hasMany(Appointment, { foreignKey: 'client_id' });
Appointment.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

User.hasMany(Appointment, { foreignKey: 'staff_id' });
Appointment.belongsTo(User, { foreignKey: 'staff_id', as: 'staff' });

Animal.hasMany(Appointment, { foreignKey: 'animal_id' });
Appointment.belongsTo(Animal, { foreignKey: 'animal_id' });

Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

// ACTIVITY LOGS
User.hasMany(ActivityLog, { foreignKey: 'user_id' });
ActivityLog.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

Animal.hasMany(ActivityLog, { foreignKey: 'animal_id' });
ActivityLog.belongsTo(Animal, { foreignKey: 'animal_id' });

Sale.hasMany(ActivityLog, { foreignKey: 'sale_id' });
ActivityLog.belongsTo(Sale, { foreignKey: 'sale_id' });

module.exports = {
    User,
    Category,
    Subcategory,
    Product,
    Service,
    Animal,
    Sale,
    SaleDetail,
    ActivityLog,
    Appointment,
    Availability
};
