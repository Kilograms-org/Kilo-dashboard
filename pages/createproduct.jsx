//name
//images - 3
// description
// price
// brand

// producttype
// weight
// keyfeatures
// category - select
// Instock - true or false
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ProductReview from "../Components/ProductReview";

function CreateProduct() {
  const [product, setproduct] = useState({
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
  const [productcreated, setproductcreated] = useState();

  async function uploadproduct() {
    const {
      name,
      categoryname,
      brand,
      description,
      price,
      weight,
      keyfeatures,
      producttype,
      Instock,
      img,
      Mrp,
    } = product;

    if (
      product.name != "" &&
      product.categoryname != "" &&
      product.brand != "" &&
      product.description != "" &&
      product.price != 0 &&
      product.weight != "" &&
      product.keyfeatures != "" &&
      product.producttype != ""
    ) {
      try {
        const res = await axios.post(
          "https://kilograms-backend.onrender.com/product/create",
          {
            img,
            name,
            price,
            description,
            brand,
            producttype,
            weight,
            keyfeatures,
            categoryname,
            Instock,
            Mrp,
          }
        );

        alert("Product Added successfully");
        setproductcreated(product);
      } catch (e) {
        console.log("there is some error adding objects ");
        console.log(e.response?.data || e.message);
        console.log(product);
        alert(
          "There is some error adding product maybe server is down ek baar inspect krke dekh le "
        );
      }
    } else {
      alert("Kuch fill krna reh gaya ha dubara bhar details");
      console.log("Validation debug", product);
    }
  }

  function handleChange(e) {
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

  function handleImageChange(index, value) {
    const newarr = [...product.img];

    newarr[index] = value;

    setproduct((prev) => ({ ...prev, img: newarr }));
  }

  return (
    <div className="rightdashboardarea">
      <div className="dashboardwrappewr">
        <h4 style={{ marginBottom: "0px" }}>Create Product</h4>
      </div>

      <div className="dashboardcontent">
        <div className="w-100 pinfo">
          <div className="basicinfo">
            <div className="W-100 d-flex">
              <h5>Product Name : </h5>
              <input
                name="name"
                value={product.name}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Enter Name"
                style={{
                  paddinLeft: "15px",
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
                style={{ width: "350px", outline: "none" }}
                placeholder="Enter product description"
                id=""
                value={product.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="W-100 ">
              <h5>Image Urls : </h5>
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Url ${index + 1}`}
                  value={product.img[index]}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
              ))}
            </div>
            <div className="W-100 d-flex">
              <h5>Price : </h5>
              <input
                name="price"
                type="number"
                placeholder="Enter Price"
                value={product.price}
                onChange={(e) => handleChange(e)}
                style={{
                  paddinLeft: "15px",
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
                name="Mrp"
                type="number"
                placeholder="Enter Mrp"
                value={product.Mrp}
                onChange={(e) => handleChange(e)}
                style={{
                  paddinLeft: "15px",
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
                onChange={(e) => handleChange(e)}
                placeholder="Enter Brand"
                style={{
                  paddinLeft: "15px",
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
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "10px" }}
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
                id="Instock"
                name="Instock"
                value={product.Instock}
                onChange={handleChange}
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
                placeholder="Enter Product Type"
                value={product.producttype}
                onChange={(e) => handleChange(e)}
                style={{
                  paddinLeft: "15px",
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
                name="weight"
                type="text"
                placeholder="Enter Product wt in Kg"
                value={product.weight}
                onChange={(e) => handleChange(e)}
                style={{
                  paddinLeft: "15px",
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
                placeholder="Enter Key features"
                value={product.keyfeatures}
                onChange={(e) => handleChange(e)}
                style={{
                  paddinLeft: "15px",
                  marginLeft: "5px",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid black",
                }}
              />
            </div>

            <Button onClick={() => uploadproduct()}>Create Product</Button>
          </div>
          <div className="preview">
            {productcreated ? <ProductReview {...productcreated} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
