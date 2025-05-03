const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('./models/Company');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => console.log(err));

const companies = [
  {
    name: 'Grameenphone',
    sector: 'Telecommunications',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/88/Grameenphone_logo.svg',
    headquarter: 'Dhaka',
    founded: '1997'
  },
  {
    name: 'BRAC Bank',
    sector: 'Banking',
    logo: 'https://upload.wikimedia.org/wikipedia/en/b/b6/BRAC_Bank_Limited_Logo.svg',
    headquarter: 'Dhaka',
    founded: '2001'
  },
  {
    name: 'Robi Axiata Limited',
    sector: 'Telecommunications',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/76/Robi_logo.svg',
    headquarter: 'Dhaka',
    founded: '1997'
  },
  {
    name: 'BEXIMCO',
    sector: 'Conglomerate',
    logo: 'https://beximco.com/img/logo.png',
    headquarter: 'Dhaka',
    founded: '1972'
  },
  {
    name: 'ACI Limited',
    sector: 'Pharmaceuticals',
    logo: 'https://www.aci-bd.com/images/aci-logo.png',
    headquarter: 'Dhaka',
    founded: '1968'
  }
];

const seedDB = async () => {
  await Company.deleteMany({});
  await Company.insertMany(companies);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();