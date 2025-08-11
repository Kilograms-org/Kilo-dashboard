import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ProductReview from "../Components/ProductReview";
function UpdateProduct() {
  const [productcreated, setproductcreated] = useState();
  const [product, setproduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    brand: "",
    producttype: "",
    weight: "",
    keyfeatures: "",
    Instock: "",
    categoryname: "",
    img: ["", "", ""],
    Mrp: 0,
  });

  async function updateallprodycts() {
    try {
      const res = await axios.put(
        `https://kilograms-backend.onrender.com/product/update/${product.id}`,
        {
          name: product.name,
          description: product.description,
          price: product.price,
          brand: product.brand,
          producttype: product.producttype,
          weight: product.weight,
          keyfeatures: product.keyfeatures,
          Instock: product.Instock,
          categoryname: product.categoryname,
          Mrp: product.Mrp,
        }
      );

      if (res.status == 404) {
        console.log("Product not found with the provided Id");
      } else {
        alert("Product updated Successfully");
        setproductcreated(product);
        console.log(res.data.product);
      }
    } catch (e) {
      console.log(e);
      alert(
        "There is some error while updating product, Kindly inspect and let dev know the error"
      );
    }
  }

  function handlechange(e) {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "price" || name === "Mrp") {
      updatedValue = Number(value); // Convert price to number
    }
    setproduct((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  }
  return (
    <div className="rightdashboardarea">
      <div className="dashboardwrappewr">
        <h4 style={{ marginBottom: "0px" }}>Update Product</h4>
      </div>

      <div className="dashboardcontent">
        <div className="w-100 pinfo">
          <div className="basicinfo">
            <div className="W-100 d-flex">
              <h5>Product Id : </h5>
              <input
                type="text"
                name="id"
                value={product.id}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Product Id"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>
            <div className="W-100 d-flex">
              <h5>Product Name : </h5>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Name"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>
            <div className="W-100 ">
              <h5>Product Description : </h5>
              <textarea
                name="description"
                value={product.description}
                onChange={(e) => handlechange(e)}
                style={{ width: "350px", outline: "none" }}
                placeholder="Enter product description"
                id=""
              ></textarea>
            </div>

            <div className="W-100 d-flex">
              <h5>Price : </h5>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Price"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>

            <div className="W-100 d-flex">
              <h5>Mrp : </h5>
              <input
                type="number"
                name="Mrp"
                value={product.Mrp}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Price"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>

            <div className="W-100 d-flex">
              <h5>Brand : </h5>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Brand"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>

            <div className="W-100 d-flex">
              <h5 for="category">Category : </h5>

              <select
                id="category"
                name="categoryname"
                value={product.categoryname}
                onChange={(e) => handlechange(e)}
              >
                <option value="Beverage">Beverage</option>
                <option value="Dairy Products">Dairy Products</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Fruits">Fruits</option>
                <option value="Grocery">Grocery</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Stationary">Stationary</option>
                <option value="Hosehold">Hosehold</option>
              </select>
            </div>
            <div className="W-100 d-flex">
              <h5 for="category">In Stock : </h5>

              <select
                id="category"
                name="Instock"
                value={product.Instock}
                onChange={(e) => handlechange(e)}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="W-100 d-flex">
              <h5>Product Type : </h5>
              <input
                type="text"
                name="producttype"
                value={product.producttype}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Name"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>
            <div className="W-100 d-flex">
              <h5>Weight : </h5>
              <input
                type="text"
                name="weight"
                value={product.weight}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Name"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>
            <div className="W-100 d-flex">
              <h5>Key Features : </h5>
              <input
                type="text"
                name="keyfeatures"
                value={product.keyfeatures}
                onChange={(e) => handlechange(e)}
                placeholder="Enter Name"
                style={{
                  paddingLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>
            <Button onClick={() => updateallprodycts()}>Update Product</Button>
          </div>
          <div className="preview">
            {productcreated ? <ProductReview {...productcreated} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
