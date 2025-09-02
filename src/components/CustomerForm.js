import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const CustomerForm = ({ customer, isEdit }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address_details: '',
    city: '',
    state: '',
    pin_code: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (customer) setForm(customer);
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/customers/${customer.id}`, form);
      } else {
        await api.post('/customers', form);
      }
      navigate('/customers');
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Customer' : 'New Customer'}</h2>
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
      <input name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required />
      <input name="address_details" placeholder="Address Details" value={form.address_details} onChange={handleChange} required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
      <input name="pin_code" placeholder="Pin Code" value={form.pin_code} onChange={handleChange} required />
      <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default CustomerForm;

