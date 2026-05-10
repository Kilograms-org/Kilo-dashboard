import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import API_BASE from "../src/api.js";
function DeleteProduct() {
  const [productid, setproductid] = useState("");

  async function deleteProduct() {
    if (!productid) {
      alert("Please enter a Product Id");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete product with ID: ${productid}?`)) {
      return;
    }
    try {
      const res = await axios.delete(
        `${API_BASE}/product/delete/${productid}`
      );
      if (res.status === 200) {
        alert("Product deleted successfully");
        setproductid("");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (e) {
      console.log(e);
      alert(
        "There is some error with server. Please check the console for details."
      );
    }
  }
  return (
    <div className="rightdashboardarea">
      <div className="dashboardwrappewr">
        <h4 style={{ marginBottom: "0px" }}>Delete Product</h4>
      </div>

      <div className="dashboardcontent">
        <div className="w-100 pinfo">
          <div className="basicinfo create-product-form">
            <div className="form-section">
              <div className="form-section-title">Delete Product</div>

              <div className="form-row">
                <h5>Product Id :</h5>
                <input
                  type="text"
                  name="productid"
                  value={productid}
                  placeholder="Enter Product Id"
                  onChange={(e) => setproductid(e.target.value)}
                  className="form-input"
                />
              </div>

              <Button onClick={() => deleteProduct()} className="submit-button delete-button">
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
