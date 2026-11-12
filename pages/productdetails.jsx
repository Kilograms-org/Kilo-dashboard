import Searchbox from "../Components/searchbox";
import ProductTable from "../Components/ProductTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../src/api.js";
import { Mycontext } from "../src/App";
import Button from "@mui/material/Button";

function ProductDetails() {
  const { noofproducts, setnoofproducts } = useContext(Mycontext);

  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const enrichWithCategories = (productList, categoryList) => {
    const categoryMap = new Map(
      categoryList.map((cat) => [String(cat._id), cat.name])
    );

    return productList.map((prod) => ({
      ...prod,
      categoryname: categoryMap.get(String(prod.category)) || "Unknown",
    }));
  };

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_BASE}/product/all`),
        axios.get(`${API_BASE}/category/all`),
      ]);

      const categoryList = categoriesRes.data || [];
      setcategories(categoryList);

      const productList = productsRes.data?.product || [];
      console.log(productsRes.data?.message);
      const productsWithCategory = enrichWithCategories(
        productList,
        categoryList
      );

      setproducts(productsWithCategory);
      setnoofproducts(productsWithCategory.length);
    } catch (e) {
      console.log("Issue retrieving products/categories", e);
      setproducts([]);
      setnoofproducts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleStockUpdate = () => {
    fetchProductsAndCategories();
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      handleClearSearch();
      return;
    }

    setSearchLoading(true);
    setselectedCategory(null);
    try {
      const res = await axios.get(`${API_BASE}/product/search`, {
        params: { q: query },
      });
      const searchResults = res.data.products || [];
      const productsWithCategory = enrichWithCategories(
        searchResults,
        categories
      );
      setproducts(productsWithCategory);
      setnoofproducts(productsWithCategory.length);
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
    fetchProductsAndCategories();
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryname === selectedCategory)
    : products;

  const showNoProducts =
    !loading && !searchLoading && filteredProducts.length === 0;

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
            {(loading || searchLoading) && (
              <p style={{ textAlign: "center" }}>
                {searchLoading ? "Searching..." : "Loading products..."}
              </p>
            )}
            {showNoProducts && (
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
            {!loading && !searchLoading && filteredProducts.length > 0 && (
              <ProductTable products={filteredProducts} onStockUpdate={handleStockUpdate} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
