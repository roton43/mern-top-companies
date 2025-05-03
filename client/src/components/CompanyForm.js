import React, { useState, useEffect } from 'react';
import API from '../api';

export default function CompanyForm({ loadData, editData, setEditData }) {
  const [form, setForm] = useState({ name: '', sector: '', logo: '', headquarter: '', founded: '' });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await API.put(`/companies/${editData._id}`, form);
      setEditData(null);
    } else {
      await API.post('/companies', form);
    }
    setForm({ name: '', sector: '', logo: '', headquarter: '', founded: '' });
    loadData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Sector" value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })} />
      <input placeholder="Logo URL" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} />
      <input placeholder="Headquarter" value={form.headquarter} onChange={e => setForm({ ...form, headquarter: e.target.value })} />
      <input placeholder="Founded" value={form.founded} onChange={e => setForm({ ...form, founded: e.target.value })} />
      <button type="submit">{editData ? 'Update' : 'Add'} Company</button>
    </form>
  );
}