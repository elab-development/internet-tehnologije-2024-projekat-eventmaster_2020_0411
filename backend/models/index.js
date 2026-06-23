const User = require('./User');
const Event = require('./Event');
const Registration = require('./Registration');
const Category = require('./Category');
const Location = require('./Location');

// Relacije
User.hasMany(Event, { foreignKey: 'organizer_id', as: 'organizedEvents' });
Event.belongsTo(User, { foreignKey: 'organizer_id', as: 'organizer' });

Event.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Event, { foreignKey: 'category_id', as: 'events' });

Event.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });
Location.hasMany(Event, { foreignKey: 'location_id', as: 'events' });

User.hasMany(Registration, { foreignKey: 'user_id', as: 'registrations' });
Registration.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Event.hasMany(Registration, { foreignKey: 'event_id', as: 'registrations' });
Registration.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

module.exports = {
  User,
  Event,
  Registration,
  Category,
  Location
};
