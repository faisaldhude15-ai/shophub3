import { useEffect, useState } from "react";
import "../styles/heroSlider.css";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";

const slides = [
  {
    image: banner1,
    title: "Big Sale Is Here",
    text: "Up to 50% Discount on Electronics",
  },
  {
    image: banner2,
    title: "Latest Smartphones",
    text: "Shop Premium Mobiles at Best Prices",
  },
  {
    image: banner3,
    title: "Fast Delivery",
    text: "Get Your Orders Delivered Quickly",
  },
  {
    image: banner4,
    title: "Best Smart Watches",
    text: "Discover Premium Watches at Amazing Prices",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-slider">
      <img
        src={slides[current].image}
        alt={slides[current].title}
      />

      <div className="hero-content">
        <h1>{slides[current].title}</h1>
        <p>{slides[current].text}</p>

        <button>Shop Now</button>
      </div>

      <button className="prev" onClick={prevSlide}>
        ❮
      </button>

      <button className="next" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={current === index ? "active" : ""}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;