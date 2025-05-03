import React, { useEffect, useState } from 'react';
import API from '../api';
import CompanyForm from './CompanyForm';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    const res = await API.get('/companies');
    setCompanies(res.data);
  };

  useEffect(() => { loadData(); }, []);

  const deleteCompany = async (id) => {
    await API.delete(`/companies/${id}`);
    loadData();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CompanyForm loadData={loadData} editData={editData} setEditData={setEditData} />
      {companies.map(c => (
        <div key={c._id}>
          {c.name} <button onClick={() => setEditData(c)}>Edit</button>
          <button onClick={() => deleteCompany(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}