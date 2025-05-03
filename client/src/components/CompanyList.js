import React, { useEffect, useState } from 'react';
import API from '../api';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/companies').then(res => setCompanies(res.data));
  }, []);

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input onChange={e => setSearch(e.target.value)} placeholder="Search by company or industry" />
      {filtered.map(company => (
        <div key={company._id}>
          <h3>{company.name}</h3>
          <p>{company.sector}</p>
          <img src={company.logo} width="50" alt="" />
        </div>
      ))}
    </div>
  );
}