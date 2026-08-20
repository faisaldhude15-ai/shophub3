import { Link } from "react-router-dom";
import "../styles/categorySection.css";

const categories = [
  {
    name: "Mobiles",
    image: "/images/mobile.jpg",
    count: 14,
  },
  {
    name: "Electronics",
    image: "/images/electronics.jpg",
    count: 2,
  },
  {
    name: "Laptop",
    image: "/images/laptop.jpg",
    count: 2,
  },
  {
    name: "Accessories",
    image: "/images/default.jpg",
    count: 2,
  },
];

const CategorySection = () => {
  return (
    <section className="category-section">

      <div className="section-title">
        <h2>Shop By Category</h2>
        <p>Explore our popular categories</p>
      </div>

      <div className="category-grid">

        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.name.toLowerCase()}`}
            className="category-card"
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />

            <h3>{category.name}</h3>

            <span>{category.count} Products</span>

          </Link>
        ))}

      </div>

    </section>
  );
};

export default CategorySection;