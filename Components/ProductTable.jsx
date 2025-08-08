function ProductTable({ products }) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "10%" }}>Product ID</th>
              <th style={{ width: "20%" }}>Product</th>
              <th style={{ width: "10%" }}>In Stock</th>
              <th style={{ width: "8%" }}>Price</th>
              <th style={{ width: "10%" }}>brand</th>
              <th style={{ width: "10%" }}>Category</th>
              <th style={{ width: "32%" }}>ProductDetails</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <div className="ordertableproductdetails">
                    <div>
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/100"
                        }
                        alt="productimg"
                      />
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <p
                      // style={{
                      //   maxWidth: "100px",
                      //   overflow: "hidden",
                      //   whiteSpace: "nowrap",
                      //   textOverflow: "ellipsis",
                      // }}
                      >
                        {product.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{product.Instock}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.categoryname}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductTable;
