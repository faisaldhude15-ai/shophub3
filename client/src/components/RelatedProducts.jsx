import ProductCard from "./ProductCard";

function RelatedProducts({ products }) {

  return (

    <div className="related">

      <h2>Related Products</h2>

      <div className="product-grid">

        {products.map(product => (

          <ProductCard

            key={product._id}

            product={product}

          />

        ))}

      </div>

    </div>

  );

}

export default RelatedProducts;