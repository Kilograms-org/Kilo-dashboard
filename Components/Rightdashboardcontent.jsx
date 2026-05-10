import { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE from "../src/api.js";
import OrderTable from "./OrderTable/";
import LineChart from "./salechart";
import { Mycontext } from "../src/App";

function Rightdashboardcontent() {
  const { noofproducts } = useContext(Mycontext);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [productssold, setProductsSold] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [ordersRes, usersRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE}/order/all/admin`),
        axios.get(`${API_BASE}/user/all/admin`),
        axios.get(`${API_BASE}/order/stats/daily`),
      ]);

      const ordersData = ordersRes.data.orders || [];
      const usersData = usersRes.data.users || [];
      const statsData = statsRes.data.stats || [];

      setOrders(ordersData.length);
      setUsers(usersData.length);

      const totalRevenue = ordersData.reduce(
        (sum, order) => sum + (order.total_price || 0),
        0
      );
      setRevenue(totalRevenue);

      const totalProductsSold = ordersData.reduce(
        (sum, order) => sum + (order.total_items || 0),
        0
      );
      setProductsSold(totalProductsSold);

      setRecentOrders(ordersData.slice(0, 20));
      setChartData(statsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="rightdashboardarea">
      <div className="dashboardwrappewr">
        <h4 style={{ marginBotttom: "0px" }}>Dashboard</h4>
      </div>
      <div className="dashboardcontent">
        <div className="matrix w-100">
          <div className="matrix-left">
            <div className="dashbox">
              Total Users : <b>{users}</b>
            </div>
            <div className="dashbox">
              Total Products : <b>{noofproducts}</b>
            </div>
            <div className="dashbox">
              Total Orders : <b>{orders}</b>
            </div>
          </div>
          <div className="matrix-right">
            <div className="dashchart">
              <p>
                Total Products Sold : <b>{productssold}</b>
              </p>
              <p>
                Total Revenue : <b>{revenue} </b>
              </p>
              <div>
                <LineChart chartData={chartData} />
              </div>
            </div>
          </div>
        </div>
        <div className="lastorders p-3 mt-3">
          <h4>Recent Orders</h4>
          <OrderTable orders={recentOrders} onStatusUpdate={fetchData} />
        </div>
      </div>
    </div>
  );
}

export default Rightdashboardcontent;
