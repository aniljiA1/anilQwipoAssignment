import React, { useState, useEffect } from 'react';
import api from '../api/api';

const AddressForm = ({ customerId, address, onSuccess }) => {
  const [form, setForm] = useState({
    address_details: '',
    city: '',
    state: '',
    pin_code: '',
  });

  useEffect(() => {
    if (address) setForm(address);
  }, [address]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (address) {
        await api.put(`/addresses/${address.id}`, form);
      } else {
        await api.post(`/customers/${customerId}/addresses`, form);
      }
      onSuccess();
      setForm({ address_details: '', city: '', state: '', pin_code: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting address');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="address_details" placeholder="Address Details" value={form.address_details} onChange={handleChange} required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
      <input name="pin_code" placeholder="Pin Code" value={form.pin_code} onChange={handleChange} required />
      <button type="submit">{address ? 'Update' : 'Add'} Address</button>
    </form>
  );
};

export default AddressForm;
