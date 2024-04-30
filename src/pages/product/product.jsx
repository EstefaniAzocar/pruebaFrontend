import { useState, useEffect } from 'react';
import { getProductData } from '../../petitions/petition';
import './product.css';
import ProductCard from '../../components/card/productCard';
import Carousel from '../../components/carousel/carousel';

function Product() {
  const [productData, setProductData] = useState([]);
  const [token, setToken] = useState(null);

  const leerToken = () => {
    if(localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else {
      setToken(null);
    }
  };

  useEffect(() => {
    leerToken();

    const fetchData = async () => {
      try {
        const data = await getProductData(token);
        setProductData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className='container'>
      <div className='productContainer'>
        <h1>Comercializadora Azocar</h1>
        <Carousel>
          {productData.length > 0 ? (
            productData.map(product => (
              product.products.map((productDetail) => (
                <ProductCard key={productDetail.id} props={productDetail} />
              ))
            ))
          ) : (
            <p>No se encontraron productos</p>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Product;
