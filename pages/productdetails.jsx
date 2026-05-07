import Searchbox from "../Components/searchbox";
import ProductTable from "../Components/ProductTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mycontext } from "../src/App";
import Button from "@mui/material/Button";

function ProductDetails() {
  const { noofproducts, setnoofproducts } = useContext(Mycontext);

  const [products, setproducts] = useState([""]);
  const [categories, setcategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const enrichWithCategory = async (productList) => {
    return Promise.all(
      productList.map(async (prod) => {
        try {
          const catres = await axios.get(
            `http://localhost:3000/category/${prod.category}`
          );
          return {
            ...prod,
            categoryname: catres.data.categoryname,
          };
        } catch (err) {
          console.log("Error fetching category", err);
          return { ...prod, categoryname: "Unknown" };
        }
      })
    );
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/product/all"
      );
      if (!res.data) {
        console.log("unable to retrieve products from db");
      } else {
        setnoofproducts(res.data.product.length);
        console.log(res.data.message);
        const productsWithCategory = await enrichWithCategory(res.data.product);
        setproducts(productsWithCategory);
      }
    } catch (e) {
      console.log("Issue retrieving number of products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/category/all");
      if (res.status === 200) {
        setcategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleStockUpdate = () => {
    fetchProducts();
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    setselectedCategory(null);
    try {
      const res = await axios.get(
        `http://localhost:3000/product/search`,
        { params: { q: query } }
      );
      if (res.data.products && res.data.products.length > 0) {
        const productsWithCategory = await enrichWithCategory(res.data.products);
        setproducts(productsWithCategory);
        setnoofproducts(productsWithCategory.length);
      } else {
        setproducts([]);
        setnoofproducts(0);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setproducts([]);
      setnoofproducts(0);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchProducts();
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryname === selectedCategory)
    : products;

  const isLoading = filteredProducts.length === 0 || (filteredProducts.length === 1 && filteredProducts[0] === "");

  return (
    <>
      <div className="rightdashboardarea">
        <div className="dashboardwrappewr">
          <h4 style={{ marginBotttom: "0px" }}>All Products</h4>
        </div>

        <div className="dashboardcontent">
          <div className="matrix w-100">
            <div className="dashbox">Total Products Uploaded: {noofproducts}</div>
          </div>
          <div className="allproducts">
            <Searchbox text="Search Products by Name or ID" onSearch={handleSearch} />
            {searchQuery && !searchLoading && (
              <Button
                onClick={handleClearSearch}
                variant="outlined"
                size="small"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Clear Search
              </Button>
            )}
            {searchLoading && (
              <p style={{ textAlign: "center" }}>Searching...</p>
            )}
            {isLoading && !searchLoading && (
              <p style={{ textAlign: "center" }}>No products found</p>
            )}
            <div className="category-filters" style={{ marginTop: "15px", marginBottom: "15px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <Button
                variant={selectedCategory === null ? "contained" : "outlined"}
                onClick={() => setselectedCategory(null)}
                size="small"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat._id}
                  variant={selectedCategory === cat.name ? "contained" : "outlined"}
                  onClick={() => setselectedCategory(cat.name)}
                  size="small"
                >
                  {cat.emoji} {cat.name}
                </Button>
              ))}
            </div>
            {!isLoading && !searchLoading && (
              <ProductTable products={filteredProducts} onStockUpdate={handleStockUpdate} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
