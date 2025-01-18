import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    axios.post(
      'http://localhost:3001/register',
      { name, email, password }
    ).then(res => {
      alert('Created successfully');
      navigate('/login');  // Redirect to login page after account creation
    }).catch(err => {
      console.error(err);
      alert('Failed to create account. Please try again.');
    });
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', backgroundColor: '#6c757d' }}>
      <div className='bg-white p-4 rounded shadow' style={{ width: '100%', minWidth: '400px' }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className="form-label">
              Name
            </label>
            <input
              type='text'
              autoComplete='off'
              name='name'
              id='name'
              className='form-control rounded-0'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className="form-label">
              Email
            </label>
            <input
              type='email'
              autoComplete='off'
              name='email'
              id='email'
              className='form-control rounded-0'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className="form-label">
              Password
            </label>
            <input
              type='password'
              autoComplete='off'
              name='password'
              id='password'
              className='form-control rounded-0'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
          <div className="text-center mt-3">
            <p>Already Have an Account?</p>
            <Link to="/login" className="btn btn-primary w-100">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
