import Searchbox from "../Components/searchbox";
import ProductTable from "../Components/ProductTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mycontext } from "../src/App";

function ProductDetails() {
  const { noofproducts, setnoofproducts } = useContext(Mycontext);

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
          //sending another request to get categpry from c ategory Id
          setnoofproducts(res.data.product.length);
          console.log(res.data.message);

          console.log(res.data.product);
          const productsWithCategory = await Promise.all(
            res.data.product.map(async (prod) => {
              try {
                const catres = await axios.get(
                  `http://localhost:3000/category/${prod.category}`
                );
                return {
                  ...prod,
                  categoryname: catres.data.categoryname, // This will now be a string
                };
              } catch (err) {
                console.log("Error fetching category", err);
                return { ...prod, categoryname: "Unknown" };
              }
            })
          );

          setproducts(productsWithCategory);
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
