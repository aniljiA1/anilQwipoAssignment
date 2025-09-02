import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";

function CustomerFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  // Fetch customer if editing
  useEffect(() => {
    if (id) fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const res = await api.get(`/customers/${id}`);
      const cust = res.data;
      setCustomer({
        first_name: cust.first_name || "",
        last_name: cust.last_name || "",
        phone_number: cust.phone_number || "",
        address_details: cust.addresses?.[0]?.address_details || "",
        city: cust.addresses?.[0]?.city || "",
        state: cust.addresses?.[0]?.state || "",
        pin_code: cust.addresses?.[0]?.pin_code || "",
      });
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/customers/${id}`, customer);
      } else {
        await api.post("/customers", customer);
      }
      navigate("/"); // go back to customer list
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Customer" : "Add New Customer"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <input
          name="first_name"
          value={customer.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="last_name"
          value={customer.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="phone_number"
          value={customer.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          name="address_details"
          value={customer.address_details}
          onChange={handleChange}
          placeholder="Address Details"
          required
        />
        <input
          name="city"
          value={customer.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          name="state"
          value={customer.state}
          onChange={handleChange}
          placeholder="State"
          required
        />
        <input
          name="pin_code"
          value={customer.pin_code}
          onChange={handleChange}
          placeholder="Pin Code"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CustomerFormPage;
