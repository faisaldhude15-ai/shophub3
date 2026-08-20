import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [

  {
    name: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },

  {
    name: "Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
  },

  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
  },

  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
  },

];

function Categories() {
  return (
    <div className="categories-container">

      {categories.map((item) => (

        <Link
          key={item.name}
          to={`/category/${item.name}`}
          className="category-card"
        >

          <img src={item.image} alt={item.name} />

          <h3>{item.name}</h3>

        </Link>

      ))}

    </div>
  );
}

export default Categories;