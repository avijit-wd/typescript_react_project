import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products?page=${page}`);

      setProducts(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const deleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  const next = () => {
    if (page < lastPage) {
      setPage((page) => page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };
  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img src={p.image} height={50} width={50} alt="" />
                </td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/products/${p.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prev}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={next}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Products;
