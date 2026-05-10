import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../src/api.js";

function ProductTable({ products, onStockUpdate }) {
  const navigate = useNavigate();
  const [restockDialog, setRestockDialog] = useState({
    show: false,
    productId: null,
    productName: "",
    quantity: 1,
  });

  const handleToggleInstock = async (productId) => {
    if (!window.confirm("Change stock status?")) return;
    try {
      const res = await axios.patch(`${API_BASE}/product/toggle-instock/${productId}`);
      if (res.status === 200) {
        alert(`Product is now ${res.data.product.Instock ? "In Stock" : "Out of Stock"}`);
        if (onStockUpdate) onStockUpdate();
      }
    } catch (error) {
      console.error("Error toggling stock status:", error);
      alert("Error updating stock status");
    }
  };

  const handleRestock = async () => {
    if (restockDialog.quantity < 1) return;

    try {
      const res = await axios.patch(
        `${API_BASE}/product/restock/${restockDialog.productId}`,
        { quantity: restockDialog.quantity }
      );

      if (res.status === 200) {
        alert(
          `Added ${restockDialog.quantity} units. New stock: ${res.data.product.available_stock}`
        );
        setRestockDialog({ show: false, productId: null, productName: "", quantity: 1 });
        if (onStockUpdate) onStockUpdate();
      }
    } catch (error) {
      console.error("Error restocking:", error);
      alert("Error restocking product");
    }
  };

  const handleIgnore = async (productId) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/product/set-stock/${productId}`,
        { stock: 0 }
      );

      if (res.status === 200) {
        alert("Stock set to 0");
        if (onStockUpdate) onStockUpdate();
      }
    } catch (error) {
      console.error("Error setting stock:", error);
      alert("Error updating stock");
    }
  };

  const handleEdit = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      const res = await axios.delete(`${API_BASE}/product/delete/${productId}`);
      if (res.status === 200) {
        alert("Product deleted successfully");
        if (onStockUpdate) onStockUpdate();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "8%" }}>Product ID</th>
              <th style={{ width: "8%" }}>Image</th>
              <th style={{ width: "16%" }}>Product Name</th>
              <th style={{ width: "8%" }}>In Stock</th>
              <th style={{ width: "10%" }}>Available Stock</th>
              <th style={{ width: "8%" }}>Price</th>
              <th style={{ width: "8%" }}>Mrp</th>
              <th style={{ width: "10%" }}>Brand</th>
              <th style={{ width: "10%" }}>Category</th>
              <th style={{ width: "12%" }}>ProductDetails</th>
              <th style={{ width: "12%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td style={{ fontSize: "12px", wordBreak: "break-all" }}>{product._id}</td>
                <td>
                  <img 
                    src={product.images?.[0] || "https://via.placeholder.com/50"} 
                    alt={product.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                  />
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "left" }}>
                    <p>{product.name}</p>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {product.Instock ? (
                      <>
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#28a745",
                            display: "inline-block",
                          }}
                        />
                        <button
                          onClick={() => handleToggleInstock(product._id)}
                          className="btn btn-sm btn-danger"
                          style={{ fontSize: "11px", padding: "2px 6px" }}
                        >
                          False
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#dc3545",
                            display: "inline-block",
                          }}
                        />
                        <button
                          onClick={() => handleToggleInstock(product._id)}
                          className="btn btn-sm btn-success"
                          style={{ fontSize: "11px", padding: "2px 6px" }}
                        >
                          True
                        </button>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    <strong>{product.available_stock ?? 100}</strong>
                    {product.available_stock <= 5 && (
                      <div style={{ marginTop: "5px" }}>
                        <span
                          style={{
                            backgroundColor: "#ffc107",
                            color: "black",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          Low Stock
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td>{product.price}</td>
                <td>{product.Mrp}</td>
                <td>{product.brand}</td>
                <td>{product.categoryname}</td>
                <td>
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "12px",
                      lineHeight: "1.4em",
                    }}
                    title={product.description}
                  >
                    {product.description}
                  </div>
                  {product.available_stock <= 5 && (
                    <div style={{ marginTop: "8px" }}>
                      <button
                        onClick={() =>
                          setRestockDialog({
                            show: true,
                            productId: product._id,
                            productName: product.name,
                            quantity: 1,
                          })
                        }
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "3px",
                          fontSize: "11px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Restock
                      </button>
                      <button
                        onClick={() => handleIgnore(product._id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "3px",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        Ignore
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => handleEdit(product._id)}
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "3px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "3px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {restockDialog.show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              minWidth: "300px",
            }}
          >
            <h5>Restock: {restockDialog.productName}</h5>
            <div style={{ margin: "15px 0" }}>
              <label>Quantity to add (min 1):</label>
              <input
                type="number"
                min="1"
                value={restockDialog.quantity}
                onChange={(e) =>
                  setRestockDialog((prev) => ({
                    ...prev,
                    quantity: Math.max(1, parseInt(e.target.value) || 1),
                  }))
                }
                style={{ marginLeft: "10px", padding: "5px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() =>
                  setRestockDialog({ show: false, productId: null, productName: "", quantity: 1 })
                }
                style={{
                  padding: "6px 12px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRestock}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductTable;
