import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`/api/customers?search=${search}`);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`/api/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <h2>Customer List</h2>
      <Link to="/customers/new">Add New Customer</Link>
      <input
        type="text"
        placeholder="Search by name, phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>
                <Link to={`/customers/${cust.id}`}>
                  {cust.first_name} {cust.last_name}
                </Link>
              </td>
              <td>{cust.phone_number}</td>
              <td>
                <Link to={`/customers/${cust.id}/edit`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(cust.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerListPage;
