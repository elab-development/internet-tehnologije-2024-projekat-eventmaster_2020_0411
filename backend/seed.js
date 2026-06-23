const sequelize = require('./config/database');
const { User, Category, Location, Event } = require('./models');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    // Sinhronizacija baze (kreira tabele)
    await sequelize.sync({ force: true });
    console.log('Tabele kreirane');

    // Kreiranje kategorija
    const categories = await Category.bulkCreate([
      { name: 'Koncert', description: 'Muzički događaji i koncerti' },
      { name: 'Sportski', description: 'Sportske utakmice i događaji' },
      { name: 'Edukativni', description: 'Seminari, predavanja i radionice' },
      { name: 'Kulturni', description: 'Pozorište, izložbe i kulturni eventi' }
    ]);
    console.log('Kategorije kreirane');

    // Kreiranje lokacija
    const locations = await Location.bulkCreate([
      { name: 'Arena Beograd', address: 'Bulevar Arsenija Čarnojevića 58', city: 'Beograd', capacity: 20000 },
      { name: 'Dom Omladine', address: 'Makedonska 22', city: 'Beograd', capacity: 500 },
      { name: 'Stadion Partizan', address: 'Humska 1', city: 'Beograd', capacity: 32000 },
      { name: 'Kulturni Centar', address: 'Knez Mihailova 6', city: 'Beograd', capacity: 300 }
    ]);
    console.log('Lokacije kreirane');

    // Kreiranje test korisnika
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.bulkCreate([
      { name: 'Marko Markovic', email: 'marko@example.com', password: hashedPassword, role: 'organizer' },
      { name: 'Ana Anić', email: 'ana@example.com', password: hashedPassword, role: 'user' },
      { name: 'Petar Petrovic', email: 'petar@example.com', password: hashedPassword, role: 'user' }
    ]);
    console.log('Korisnici kreirani');

    // Kreiranje test događaja
    await Event.bulkCreate([
      {
        title: 'Rok Koncert 2026',
        description: 'Najbolji rok bendovi u gradu!',
        date: new Date('2026-07-15'),
        max_participants: 5000,
        organizer_id: users[0].id,
        category_id: categories[0].id,
        location_id: locations[0].id
      },
      {
        title: 'JavaScript Workshop',
        description: 'Naučite React od nule',
        date: new Date('2026-07-20'),
        max_participants: 50,
        organizer_id: users[0].id,
        category_id: categories[2].id,
        location_id: locations[1].id
      },
      {
        title: 'Fudbalska Utakmica',
        description: 'Derbi večiti',
        date: new Date('2026-08-01'),
        max_participants: 30000,
        organizer_id: users[0].id,
        category_id: categories[1].id,
        location_id: locations[2].id
      }
    ]);
    console.log('Događaji kreirani');

    console.log('Baza uspešno popunjena sa test podacima!');
    process.exit(0);
  } catch (error) {
    console.error('Greška pri popunjavanju baze:', error);
    process.exit(1);
  }
};

seedDatabase();
