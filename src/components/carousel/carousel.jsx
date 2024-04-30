import { useState, useRef, useEffect } from "react";
import "./carousel.css"; // Importa tu archivo CSS

// eslint-disable-next-line react/prop-types
export function Carousel ({children}) {
  const gap = 16;
  const carouselRef = useRef(null);
  const contentRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carouselRef.current.offsetWidth);
    const handleResize = () => setWidth(carouselRef.current.offsetWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (event.key === 'ArrowRight') {
        handleNextClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez

  const handleNextClick = () => {
    carouselRef.current.scrollBy({ left: width + gap, behavior: 'smooth' });
    if (carouselRef.current.scrollWidth !== 5) {
      prevRef.current.style.display = 'flex';
    }
    if (contentRef.current.scrollWidth - width - gap <= carouselRef.current.scrollLeft + width) {
      nextRef.current.style.display = 'none';
    }
  };

  const handlePrevClick = () => {
    carouselRef.current.scrollBy({ left: -(width + gap), behavior: 'smooth' });
    if (carouselRef.current.scrollLeft - width - gap <= 5) {
      prevRef.current.style.display = 'none';
    }
    if (!(contentRef.current.scrollWidth - width - gap <= carouselRef.current.scrollLeft + width)) {
      nextRef.current.style.display = 'flex';
    }
  };

  return (
    <div className="carouselWrapper">
      <div id="wrapper" >
        <div id="carousel" ref={carouselRef} >
          <div id="content" ref={contentRef}>
            {children}
          </div>
        </div>
        <button className="prev" onClick={handlePrevClick} ref={prevRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            color="write"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
          </svg>
        </button>
        <button className="next"  onClick={handleNextClick} ref={nextRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
          </svg>
        </button>
    </div>
  </div>
  )
}
export default Carousel;