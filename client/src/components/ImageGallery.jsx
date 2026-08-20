import { useState } from "react";

function ImageGallery({ images }) {

  const [active, setActive] = useState(

    images?.length

      ? images[0]

      : "https://via.placeholder.com/500"

  );

  return (

    <div className="gallery">

      <div className="thumbs">

        {images.map((img) => (

          <img

            key={img}

            src={img}

            alt=""

            onClick={() => setActive(img)}

          />

        ))}

      </div>

      <div className="main-image">

        <img src={active} alt="" />

      </div>

    </div>

  );

}

export default ImageGallery;