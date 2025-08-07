import Searchbox from "../Components/searchbox";
import ProductTable from "../Components/ProductTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const [noofproducts, setnoofproducts] = useState(0);
  const [products, setproducts] = useState([""]);
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get(
          "https://kilograms-backend.onrender.com/product/all"
        );
        if (!res.data) {
          console.log("unable to retrieve products from db");
        } else {
          console.log(res.data.message);
          setnoofproducts(res.data.product.length);
          setproducts(res.data.product);
          console.log(res.data.product);
        }
      } catch (e) {
        console.log("Issue retrieving numbger of products");
      }
    }

    fetchdata();
  }, []);

  return (
    <>
      <div className="rightdashboardarea">
        <div className="dashboardwrappewr">
          <h4 style={{ marginBotttom: "0px" }}>All Products</h4>
        </div>

        <div className="dashboardcontent">
          <div className="matrix w-100">
            <div className="dashbox">
              Total Products Uploaded: {noofproducts}
            </div>
          </div>
          <div className="allproducts">
            <Searchbox text="Search Products by Product Id" />
            {products.length == 0 ? (
              <></>
            ) : (
              <ProductTable products={products} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
