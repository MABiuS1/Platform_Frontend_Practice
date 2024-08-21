import { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]); // Initialize as an array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data); // Ensure `data` is an array
        } else {
          throw new Error("Data is not an array");
        }
      } catch (err) {
        setError("Failed to load orders");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {error && <p>{error}</p>}
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order._id}>
              {order.status} - {order.amount}
            </li>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </ul>
    </div>
  );
};

export default OrdersPage;
