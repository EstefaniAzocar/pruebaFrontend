import './productCard.css'; // Importa los estilos CSS

const ProductCard = ({ props }) => {
  const { thumbnail, title, price } = props;

  return (
    <div className="cardContainer">
      <div className="product-thumbnail">
        <img className="product-image" src={thumbnail} alt={title} />
      </div>
      <div className="product-details">
        <p className="product-title">{title}</p>
        <p className="product-price">Precio: {price}</p>
        {/* Agrega más detalles si es necesario */}
      </div>
    </div>
  );
}

export default ProductCard;

