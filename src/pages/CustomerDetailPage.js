import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`/api/customers/${id}`);
      setCustomer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Customer Details</h2>
      <p>
        <strong>Name:</strong> {customer.first_name} {customer.last_name}
      </p>
      <p>
        <strong>Phone:</strong> {customer.phone_number}
      </p>

      <h3>Addresses</h3>
      {customer.addresses && customer.addresses.length > 0 ? (
        <ul>
          {customer.addresses.map((addr) => (
            <li key={addr.id}>
              {addr.address_details}, {addr.city}, {addr.state} - {addr.pin_code}
            </li>
          ))}
        </ul>
      ) : (
        <p>No addresses found.</p>
      )}

      <Link to={`/customers/${id}/edit`}>Edit Customer</Link>
    </div>
  );
}

export default CustomerDetailPage;
