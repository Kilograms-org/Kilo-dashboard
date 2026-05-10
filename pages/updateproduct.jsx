import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../src/api.js";
import ProductReview from "../Components/ProductReview";
function UpdateProduct() {
  const { id } = useParams();
  const [productcreated, setproductcreated] = useState();
  const [product, setproduct] = useState({
    id: id || "",
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

  // Fetch product details if ID is provided in URL
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const res = await axios.get(`${API_BASE}/product/${productId}`);
      if (res.status === 200) {
        const p = res.data;
        setproduct({
          id: productId,
          name: p.name || "",
          description: p.description || "",
          price: p.price || 0,
          brand: p.brand || "",
          producttype: p.producttype || "",
          weight: p.weight || "",
          keyfeatures: p.keyfeatures || "",
          Instock: p.Instock || "",
          categoryname: p.category?.name || "",
          img: p.images || ["", "", ""],
          Mrp: p.Mrp || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Error fetching product details");
    }
  };

  async function updateallprodycts() {
    try {
      const res = await axios.put(
        `${API_BASE}/product/update/${product.id}`,
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

  function handleImageChange(index, value) {
    const newarr = [...product.img];
    newarr[index] = value;
    setproduct((prev) => ({ ...prev, img: newarr }));
  }

  return (
    <div className="rightdashboardarea">
      <div className="dashboardwrappewr">
        <h4 style={{ marginBottom: "0px" }}>Update Product</h4>
      </div>

      <div className="dashboardcontent">
        <div className="w-100 pinfo">
          <div className="basicinfo create-product-form">
            <div className="form-section">
              <div className="form-section-title">Basic Information</div>

              <div className="form-row">
                <h5>Product Id :</h5>
                <input
                  type="text"
                  name="id"
                  value={product.id}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Product Id"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Product Name :</h5>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Product Name"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Product Description :</h5>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter product description"
                  className="form-textarea"
                ></textarea>
              </div>

              <div className="form-row">
                <h5>Brand :</h5>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Brand"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Category :</h5>
                <select
                  name="categoryname"
                  value={product.categoryname}
                  onChange={(e) => handlechange(e)}
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
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Price"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Mrp :</h5>
                <input
                  type="number"
                  name="Mrp"
                  value={product.Mrp}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter MRP"
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
                  value={product.producttype}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Product Type"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Weight :</h5>
                <input
                  type="text"
                  name="weight"
                  value={product.weight}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Product Weight (e.g., 1kg, 500g)"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <h5>Key Features :</h5>
                <input
                  type="text"
                  name="keyfeatures"
                  value={product.keyfeatures}
                  onChange={(e) => handlechange(e)}
                  placeholder="Enter Key Features"
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

            <Button onClick={() => updateallprodycts()} className="submit-button">
              Update Product
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

export default UpdateProduct;
