import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) setProduct(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= product.length / 10 &&
      selectedPage != page
    )
      setPage(selectedPage);
  };
  return (
    <div>
      {product.length > 0 && (
        <div className="product-container">
          {product.slice(page * 10 - 10, page * 10).map((pro) => {
            return (
              <span className="product" key={pro.id}>
                <img
                  className="product-image"
                  src={pro.thumbnail}
                  alt={pro.title}
                />
                <span>{pro.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {product.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination-disable"}
            onClick={() => handleSelectPage(page - 1)}
          >
            ◀️
          </span>
          {[...Array(product.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selected-page" : ""}
                onClick={() => handleSelectPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < product.length / 10 ? "" : "pagination-disable"}
            onClick={() => handleSelectPage(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
