import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";

const AdminOrder = ({ token }) => {
  const [orderSearch, setOrderSearch] = useState("");
  const [orders, setOrders] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true);
  const [orderPage, setOrderPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(""); // Added state for order status
  const [error, setError] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/orders`);
        const data = await response.json();
        console.log(data); // Check the data in the console
        setOrders(Array.isArray(data) ? data : []); // Ensure orders is an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
  };

  const ORDER_STATUSES = {
    PENDING: "Pending",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELED: "Canceled",
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const response = await axios.put(
        `${apiUrl}/api/orders/${selectedOrder._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder._id
              ? { ...order, status: newStatus }
              : order
          )
        );
        setOrderStatus(newStatus);
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status");
    }
  };

  const renderOrderDetails = (order) => {
    if (!order) return null;

    return (
      <div className="mt-4">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Order Details</h4>
          {order.user ? (
            <>
              <span className="block text-gray-600">
                User: {order.user.username || "N/A"}
              </span>
              <span className="block text-gray-600">
                Email: {order.user.email || "N/A"}
              </span>
              <span className="block text-gray-600">
                Phone: {order.user.phone || "N/A"}
              </span>
              <span className="block text-gray-600">
                Address: {order.user.address || "N/A"}
              </span>
            </>
          ) : (
            <span className="block text-gray-600">User details not available</span>
          )}
          {order.paymentDetails && (
            <>
              <span className="block text-gray-600">
                Payment ID: {order.paymentDetails.razorpay_payment_id || "N/A"}
              </span>
              <span className="block text-gray-600">
                Order ID: {order.paymentDetails.razorpay_order_id || "N/A"}
              </span>
            </>
          )}
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Products</h4>
          <ul>
            {order.products?.map((item) => (
              <li
                key={`${order._id}-${item.product?._id}-${item.quantity}`}
                className="mb-2"
              >
                <span>
                  {item.product?.name || "Unknown Product"} - Quantity: {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Status Management</h4>
          <select
            value={orderStatus}
            onChange={handleStatusChange}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={order.status === ORDER_STATUSES.CANCELED}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>
    );
  };

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) =>
        order._id.includes(orderSearch)
      )
    : [];

  const paginatedOrders = filteredOrders.slice(
    (orderPage - 1) * itemsPerPage,
    orderPage * itemsPerPage
  );

  return (
    <section className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Orders</h3>
      <input
        type="text"
        placeholder="Search orders..."
        value={orderSearch}
        onChange={(e) => setOrderSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-lg"
      />
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <ul>
          {paginatedOrders.map((order) => (
            <li
              key={order._id}
              className="mb-4 p-6 border rounded-lg shadow-md bg-white cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex justify-between mb-4">
                <div>
                  <span className="block font-semibold text-lg">
                    Order ID: {order._id}
                  </span>
                  <span className="block text-gray-600">
                    Placed on: {dayjs(order.createdAt).format("DD-MM-YYYY HH:mm")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-semibold text-lg">
                    Total Amount: ₹{order.totalAmount.toFixed(2)}
                  </span>
                  <span
                    className={`block ${
                      order.status === ORDER_STATUSES.DELIVERED
                        ? "text-green-600"
                        : order.status === ORDER_STATUSES.CANCELED
                        ? "text-red-600"
                        : order.status === ORDER_STATUSES.SHIPPED
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {order.status}
                  </span>
                </div>
                {selectedOrder && selectedOrder._id === order._id &&
                  renderOrderDetails(order)}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setOrderPage((prev) => Math.max(prev - 1, 1))}
          disabled={orderPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Previous
        </button>
        <span>Page {orderPage}</span>
        <button
          onClick={() =>
            setOrderPage((prev) =>
              filteredOrders.length > prev * itemsPerPage ? prev + 1 : prev
            )
          }
          disabled={filteredOrders.length <= orderPage * itemsPerPage}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminOrder;
