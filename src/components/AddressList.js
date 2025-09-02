import React, { useEffect, useState } from 'react';
import api from '../api/api';
import AddressForm from './AddressForm';

const AddressList = ({ customerId }) => {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await api.get(`/customers/${customerId}/addresses`);
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [customerId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await api.delete(`/addresses/${id}`);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Addresses</h3>
      <AddressForm customerId={customerId} address={editing} onSuccess={fetchAddresses} />
      <ul>
        {addresses.map((a) => (
          <li key={a.id}>
            {a.address_details}, {a.city}, {a.state} - {a.pin_code}{' '}
            <button onClick={() => setEditing(a)}>Edit</button>
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;

