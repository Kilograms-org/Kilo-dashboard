import { useState } from "react";
import axios from "axios";

function OrderTable({ orders, onStatusUpdate }) {
  const [localStatuses, setLocalStatuses] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [updateResult, setUpdateResult] = useState(null);

  const handleStatusChange = async (orderId, newStatus, originalStatus) => {
    setLoadingId(orderId);
    setLocalStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
    setUpdateResult(null);
    try {
      await axios.patch(
        `http://localhost:3000/order/admin/status/${orderId}`,
        { status: newStatus }
      );
      setUpdateResult("success");
      setTimeout(() => setUpdateResult(null), 2000);
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      setLocalStatuses((prev) => ({ ...prev, [orderId]: originalStatus }));
      setUpdateResult("error");
      setTimeout(() => setUpdateResult(null), 2000);
    } finally {
      setLoadingId(null);
    }
  };

  const statusColors = {
    Confirmed: { bg: "#d0e7ff", color: "#084298" },
    Packed: { bg: "#fff3cd", color: "#856404" },
    "Out for Delivery": { bg: "#e2d9f3", color: "#6a0dad" },
    Delivered: { bg: "#d1e7dd", color: "#0f5132" },
    Cancelled: { bg: "#f8d7da", color: "#842029" },
  };

  return (
    <div className="table-responsive">
      <style>{`
        .order-id-cell {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: monospace;
          font-size: 0.85rem;
          color: #555;
        }
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 0.9rem;
        }
        .item-name {
          font-weight: 600;
          color: #333;
          flex: 1;
          margin-right: 10px;
        }
        .item-qty {
          color: #6c757d;
          font-weight: 500;
          white-space: nowrap;
          margin-right: 10px;
        }
        .item-total {
          font-weight: 700;
          color: #198754;
          white-space: nowrap;
        }
        .total-items-cell {
          text-align: center;
          font-weight: 600;
          color: #0d6efd;
        }
        .order-total-cell {
          font-weight: 700;
          color: #198754;
        }
        .user-info {
          line-height: 1.4;
        }
        .user-name {
          font-weight: 600;
          color: #333;
        }
        .user-phone {
          font-size: 0.85rem;
          color: #6c757d;
        }
        .payment-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .payment-cod {
          background: #fff3cd;
          color: #856404;
        }
        .payment-upi {
          background: #d1ecf1;
          color: #0c5460;
        }
        .payment-unknown {
          background: #e2e3e5;
          color: #6c757d;
        }
        .status-select {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ced4da;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 150px;
        }
        .status-select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(13,110,253,0.25);
        }
        .status-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .status-success {
          border-color: #198754 !important;
          box-shadow: 0 0 0 2px rgba(25,135,84,0.25) !important;
        }
        .status-error {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 2px rgba(220,53,69,0.25) !important;
        }
        .status-loading {
          border-color: #0d6efd !important;
          background: #e7f1ff !important;
        }
        .new-ribbon {
          position: relative;
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: #fff;
          padding: 4px 10px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
          border-radius: 3px 0 0 3px;
        }
        .new-ribbon::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 0;
          width: 0;
          height: 0;
          border-left: 8px solid #c82333;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
      `}</style>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th style={{ width: "6%" }}>NEW</th>
            <th style={{ width: "10%" }}>Order ID</th>
            <th style={{ width: "28%" }}>Items</th>
            <th style={{ width: "7%" }}>Total Items</th>
            <th style={{ width: "8%" }}>Order Total</th>
            <th style={{ width: "12%" }}>User Name / Phone</th>
            <th style={{ width: "13%" }}>User Address</th>
            <th style={{ width: "10%" }}>Payment</th>
            <th style={{ width: "12%" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => {
              const paymentClass = order.payment_method.includes("UPI")
                ? "payment-upi"
                : order.payment_method.includes("Cash")
                ? "payment-cod"
                : "payment-unknown";

              const displayedStatus =
                localStatuses[order._id] ?? order.order_status ?? "Confirmed";
              const currentStatus =
                statusColors[displayedStatus] || statusColors["Confirmed"];
              const isLoading = loadingId === order._id;
              const isSuccess = updateResult === "success" && loadingId !== order._id;
              const isError = updateResult === "error" && loadingId !== order._id;

              let selectClass = "status-select";
              if (isLoading) selectClass += " status-loading";
              if (isSuccess) selectClass += " status-success";
              if (isError) selectClass += " status-error";

              return (
                <tr key={order._id}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {order.order_status === "Confirmed" && (
                      <div className="new-ribbon">NEW</div>
                    )}
                  </td>
                  <td className="order-id-cell" title={order._id}>
                    {order._id}
                  </td>
                  <td>
                    <div className="items-list">
                      {order.products.map((item, idx) => {
                        const itemTotal =
                          item.item_total ||
                          item.productDetails?.price * item.quantity ||
                          0;
                        return (
                          <div className="item-row" key={idx}>
                            <span className="item-name">
                              {item.productDetails?.name || "N/A"}
                            </span>
                            <span className="item-qty">(x{item.quantity})</span>
                            <span className="item-total">₹{itemTotal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="total-items-cell">{order.total_items}</td>
                  <td className="order-total-cell">₹{order.total_price}</td>
                  <td>
                    <div className="user-info">
                      <div className="user-name">
                        {order.userid?.name || "N/A"}
                      </div>
                      <div className="user-phone">
                        {order.userid?.phone || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td>{order.userid?.address || "N/A"}</td>
                  <td>
                    <span className={`payment-badge ${paymentClass}`}>
                      {order.payment_method}
                    </span>
                  </td>
                  <td>
                    <select
                      className={selectClass}
                      value={displayedStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value,
                          displayedStatus
                        )
                      }
                      disabled={isLoading}
                      style={{
                        borderColor: currentStatus.color,
                        color: currentStatus.color,
                      }}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
