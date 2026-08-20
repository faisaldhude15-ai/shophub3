const products = [
  // ==========================================
  // SECTION 1: FEATURED PRODUCTS (اسمارٹ فونز اور ہیڈ فونز)
  // ==========================================
  {
    name: "Apple iPhone 15 Pro Max",
    description: "Latest premium flagship smartphone with advanced titanium design.",
    price: 385000,
    discountPrice: 369999,
    category: "Smartphones",
    brand: "Apple",
    images: ["/images/Apple iPhone 14 Pro Max.jpg"], // 📱 آئی فون کی اپنی تصویر
    stock: 25,
    ratings: 4.9,
    numReviews: 120,
    isFeatured: true,
    isActive: true
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium wireless noise cancelling over-ear headphones.",
    price: 95000,
    discountPrice: 85000,
    category: "Audio",
    brand: "Sony",
    images: ["/images/airpods.jpg"], // 🎧 ہیڈ فونز کی تصویر
    stock: 35,
    ratings: 4.9,
    numReviews: 210,
    isFeatured: true,
    isActive: true
  },

  // ==========================================
  // SECTION 2: BEST SELLERS (لیپ ٹاپس اور گھڑیاں - ریٹنگ 4.8+)
  // ==========================================
  {
    name: "Apple MacBook Air M3",
    description: "Incredibly thin and fast professional development laptop.",
    price: 340000,
    discountPrice: 325000,
    category: "Laptop",
    brand: "Apple",
    images: ["/images/dell.jpg"], // 💻 لیپ ٹاپ کی بالکل الگ تصویر
    stock: 18,
    ratings: 4.8,
    numReviews: 142,
    isFeatured: false,
    isActive: true
  },
  {
    name: "Premium Wireless Watch 10",
    description: "Smart fitness tracking watch with stylish design.",
    price: 45000,
    discountPrice: 39999,
    category: "Smart Watches",
    brand: "Generic",
    images: ["/images/applewatch10.jpg"], // ⌚ گھڑی کی بالکل الگ تصویر
    stock: 15,
    ratings: 4.8,
    numReviews: 32,
    isFeatured: false,
    isActive: true
  },

  // ==========================================
  // SECTION 3: NEW ARRIVALS (ڈرونز اور نئے ایئربڈز)
  // ==========================================
  {
    name: "DJI Mini 4 Pro Drone",
    description: "Ultra-lightweight mini drone with 4K HDR camera.",
    price: 295000,
    discountPrice: 280000,
    category: "Cameras",
    brand: "DJI",
    images: ["/images/drone.jpg"], // 🛸 ڈرون کی بالکل الگ تصویر
    stock: 12,
    ratings: 4.6,
    numReviews: 52,
    isFeatured: false,
    isActive: true
  },
  {
    name: "JBL Boombox Pro Earbuds",
    description: "Powerful Bluetooth earbuds with epic bass and waterproof body.",
    price: 35000,
    discountPrice: 29999,
    category: "Audio",
    brand: "JBL",
    images: ["/images/airpodspro2.jpg"], // ⚪ ایئربڈز کی الگ تصویر
    stock: 22,
    ratings: 4.5,
    numReviews: 88,
    isFeatured: false,
    isActive: true
  }
];

module.exports = products;
