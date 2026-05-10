import { Button } from "@mui/material";
import axios from "axios";
import API_BASE from "../src/api.js";
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
    available_stock: 100,
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
      available_stock,
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
          `${API_BASE}/product/create`,
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
            available_stock,
          }
        );

        alert("Product Added successfully");
        setproductcreated(product);
      } catch (e) {
        console.log("there is some error adding objects ");
        console.log(e.response?.data || e.message);
        console.log(product);
        alert("There is some error adding product");
      }
    } else {
      alert("Please fill in all required fields");
      console.log("Validation debug", product);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "price" || name === "Mrp" || name === "available_stock") {
      updatedValue = Number(value);
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
          <div className="basicinfo create-product-form">
            <div className="form-section">
              <div className="form-section-title">Basic Information</div>

              <div className="form-row">
                <h5>Product Name :</h5>
                <input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Product Name"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Product Description :</h5>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={product.description}
                  onChange={handleChange}
                  className="form-textarea"
                ></textarea>
              </div>

              <div className="form-row">
                <h5>Brand :</h5>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Enter Brand"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Category :</h5>
                <select
                  name="categoryname"
                  value={product.categoryname}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  <option value="Beverage">🥤 Beverage</option>
                  <option value="Dairy Products">🥛 Dairy Products</option>
                  <option value="Electronics">📱 Electronics</option>
                  <option value="Fashion">👕 Fashion</option>
                  <option value="Fruits">🍎 Fruits</option>
                  <option value="Grocery">🛒 Grocery</option>
                  <option value="Personal Care">🧴 Personal Care</option>
                  <option value="Stationary">📝 Stationary</option>
                  <option value="Household">🏠 Household</option>
                  <option value="Snacks">🍿 Snacks</option>
                  <option value="Vegetables">🥦 Vegetables</option>
                  <option value="Bakery">🍞 Bakery</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Pricing Details</div>

              <div className="form-row">
                <h5>Price :</h5>
                <input
                  name="price"
                  type="number"
                  placeholder="Enter Price"
                  value={product.price}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Mrp :</h5>
                <input
                  name="Mrp"
                  type="number"
                  placeholder="Enter MRP"
                  value={product.Mrp}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Available Stock :</h5>
                <input
                  name="available_stock"
                  type="number"
                  placeholder="Enter Available Stock"
                  value={product.available_stock}
                  onChange={handleChange}
                  min="0"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Product Details</div>

              <div className="form-row">
                <h5>Product Type :</h5>
                <input
                  type="text"
                  name="producttype"
                  placeholder="Enter Product Type"
                  value={product.producttype}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Weight :</h5>
                <input
                  name="weight"
                  type="text"
                  placeholder="Enter Product Weight (e.g., 1kg, 500g)"
                  value={product.weight}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Key Features :</h5>
                <input
                  type="text"
                  name="keyfeatures"
                  placeholder="Enter Key Features"
                  value={product.keyfeatures}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>In Stock :</h5>
                <div className="stock-toggle">
                  <button
                    type="button"
                    className={`stock-btn in-stock ${product.Instock === "true" ? "active" : ""}`}
                    onClick={() => setproduct((prev) => ({ ...prev, Instock: "true" }))}
                  >
                    ✅ In Stock
                  </button>
                  <button
                    type="button"
                    className={`stock-btn out-of-stock ${product.Instock === "false" ? "active" : ""}`}
                    onClick={() => setproduct((prev) => ({ ...prev, Instock: "false" }))}
                  >
                    ❌ Out of Stock
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Product Images</div>

              <div className="image-upload-group">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="image-input-wrapper">
                    <input
                      type="text"
                      placeholder={`Image URL ${index + 1}`}
                      value={product.img[index]}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="form-input"
                    />
                    {product.img[index] && (
                      <img
                        src={product.img[index]}
                        alt={`Preview ${index + 1}`}
                        className="image-preview show"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={uploadproduct} className="submit-button">
              Create Product
            </Button>
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
