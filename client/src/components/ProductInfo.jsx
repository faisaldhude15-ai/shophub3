import { useState } from "react";

function ProductInfo({ product }) {

  const [qty, setQty] = useState(1);

  const [color, setColor] = useState(product.colors?.[0]);

  const [size, setSize] = useState(product.sizes?.[0]);

  return (

    <div className="product-info">

      <h1>{product.name}</h1>

      <h3>{product.brand}</h3>

      <h2>Rs {product.price}</h2>

      <p>

        ⭐ {product.ratings} ({product.numReviews} Reviews)

      </p>

      <p>{product.description}</p>

      <h4>Stock : {product.stock}</h4>

      <h4>Colors</h4>

      <div className="options">

        {product.colors?.map(c => (

          <button

            key={c}

            className={color === c ? "active" : ""}

            onClick={() => setColor(c)}

          >

            {c}

          </button>

        ))}

      </div>

      <h4>Sizes</h4>

      <div className="options">

        {product.sizes?.map(s => (

          <button

            key={s}

            className={size === s ? "active" : ""}

            onClick={() => setSize(s)}

          >

            {s}

          </button>

        ))}

      </div>

      <div className="qty">

        <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>

        <span>{qty}</span>

        <button onClick={() => setQty(qty + 1)}>+</button>

      </div>

      <button className="cart-btn">

        Add To Cart

      </button>

      <button className="buy-btn">

        Buy Now

      </button>

    </div>

  );

}

export default ProductInfo;