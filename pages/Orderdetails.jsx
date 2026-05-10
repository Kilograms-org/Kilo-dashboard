import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE from "../src/api.js";
import Searchbox from "../Components/searchbox";
import OrderTable from "../Components/OrderTable";
import Button from "@mui/material/Button";

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/order/all/admin`
      );
      const fetched = response.data.orders || [];
      setOrders(fetched);
      setDisplayedOrders(fetched);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setDisplayedOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/order/search`,
        { params: { query } }
      );
      setDisplayedOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error searching orders:", error);
      setDisplayedOrders([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDisplayedOrders(orders);
  };

  return (
    <>
      <div className="rightdashboardarea">
        <div className="dashboardwrappewr">
          <h4 style={{ marginBotttom: "0px" }}>All Orders</h4>
        </div>

        <div className="dashboardcontent">
          <div className="matrix w-100">
            <div className="dashbox">Total Orders: {displayedOrders.length}</div>
          </div>
          <div className="allproducts">
            <Searchbox text="Search by Order ID or Phone Number" onSearch={handleSearch} />
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
            {displayedOrders.length === 0 && !loading && !searchLoading && (
              <p style={{ textAlign: "center" }}>No orders found</p>
            )}

            {loading ? (
              <p style={{ textAlign: "center" }}>Loading...</p>
            ) : (
              <OrderTable orders={displayedOrders} onStatusUpdate={fetchOrders} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
