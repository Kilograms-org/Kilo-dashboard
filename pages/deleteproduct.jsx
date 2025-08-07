import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
function DeleteProduct() {
  const [productid, setproductid] = useState("");

  async function deleteProduct() {
    try {
      const res = await axios.delete(
        `https://kilograms-backend.onrender.com/product/delete/${productid}`
      );
      if (res.status === 200) {
        alert("product deleted successfully");
      } else {
        alert("error : " + res.data.message);
      }
    } catch (e) {
      console.log(e);
      alert(
        "there is some error with serve ping admin! he will resolve it once he wakes up"
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
          <div className="basicinfo">
            <div className="W-100 d-flex">
              <h5>Product Id : </h5>
              <input
                type="text"
                name="productid"
                value={productid}
                placeholder="Enter Product Id"
                onChange={(e) => setproductid(e.target.value)}
                style={{
                  paddinLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>

            <Button onClick={() => deleteProduct()}>Delete Product</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
