const mongoose = require('mongoose');
const Product = require('./models/Product'); // پاتھ اب بالکل درست ہے (Product.js)
const productsData = require('./data/products');

// مونو ڈی بی سے کنیکٹ کریں
mongoose.connect('mongodb://127.0.0.1:27017/shopsphere') 
  .then(() => console.log('MongoDB Connected for Seeding...'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const refreshDatabase = async () => {
  try {
    // 1. پرانا تمام خراب ڈیٹا ڈیلیٹ کریں
    await Product.deleteMany();
    console.log('Old products removed from Database!');

    // 2. نیا ورکنگ امیجز والا ڈیٹا داخل کریں
    await Product.insertMany(productsData);
    console.log('New products with working images inserted successfully!');
    
    // پروسیس ختم کریں
    process.exit();
  } catch (error) {
    console.error('Error refreshing database:', error);
    process.exit(1);
  }
};

// اسکرپٹ چلائیں
refreshDatabase();
