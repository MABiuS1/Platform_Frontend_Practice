import { Order } from '@/types/types';
import { useState } from 'react';


const CreateOrder = () => {
  const [formData, setFormData] = useState<Partial<Order>>({
    status: '',
    amount: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="status"
        value={formData.status || ''}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        placeholder="Order Status"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount || 0}
        onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value, 10) })}
        placeholder="Order Amount"
      />
      <button type="submit">Create Order</button>
    </form>
  );
};

export default CreateOrder;
