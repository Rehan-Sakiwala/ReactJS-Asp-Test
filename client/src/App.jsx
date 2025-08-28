import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit, Trash2, Users, Mail, Phone, DollarSign } from 'lucide-react';
import { API_CONFIG, APP_CONFIG } from './config';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salary: ''
  });

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_CONFIG.EMPLOYEES_URL);
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees. Please check if the API is running.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingEmployee) {
        // Update existing employee
        await axios.put(`${API_CONFIG.EMPLOYEES_URL}/${editingEmployee.id}`, formData);
        setEmployees(employees.map(emp => 
          emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
        ));
      } else {
        // Add new employee
        const response = await axios.post(API_CONFIG.EMPLOYEES_URL, formData);
        setEmployees([...employees, response.data]);
      }
      
      closeModal();
      showAlert('Employee saved successfully!', 'success');
    } catch (err) {
      setError('Failed to save employee. Please try again.');
      console.error('Error saving employee:', err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone || '',
      salary: employee.salary.toString()
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await axios.delete(`${API_CONFIG.EMPLOYEES_URL}/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
      showAlert('Employee deleted successfully!', 'success');
    } catch (err) {
      setError('Failed to delete employee. Please try again.');
      console.error('Error deleting employee:', err);
    }
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      salary: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      salary: ''
    });
  };

  const showAlert = (message, type) => {
    // Simple alert implementation - you could use a toast library for better UX
    alert(message);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          Loading employees...
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'white', 
          fontSize: '2.5rem', 
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}>
          {APP_CONFIG.APP_NAME}
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.1rem' 
        }}>
          {APP_CONFIG.APP_DESCRIPTION}
        </p>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="search-bar">
          <div className="search-input">
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }} />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          <button onClick={openAddModal} className="btn btn-primary">
            <Plus size={20} />
            Add Employee
          </button>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="empty-state">
            <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No employees found</h3>
            <p>
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first employee.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#3b82f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '0.875rem'
                        }}>
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                        {employee.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={16} style={{ color: '#6b7280' }} />
                        {employee.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={16} style={{ color: '#6b7280' }} />
                        {employee.phone || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={16} style={{ color: '#6b7280' }} />
                        ${employee.salary.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="btn btn-secondary"
                          style={{ padding: '0.375rem 0.75rem' }}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.375rem 0.75rem' }}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <button onClick={closeModal} className="close-btn">
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Salary *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;