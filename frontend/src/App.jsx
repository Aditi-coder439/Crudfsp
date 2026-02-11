import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ViewData from './pages/ViewData';
import './App.css';

import AddUser from './pages/Add'; 
import EditData from './pages/EditData';
// ADD THIS LINE BELOW:
import CartPage from './pages/CartPage'; 

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <BrowserRouter>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home (View Data)</Link>
          <Link to="/add" style={{ marginRight: "10px" }}>+ Add New User</Link>
          {/* Add a link to your Cart so you can get back to it! */}
          <Link to="/cart">🛒 View Cart</Link>
        </nav>

        <Routes>
          <Route path='/' element={<ViewData />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/edit/:id' element={<EditData />} />
          {/* ADD THIS ROUTE BELOW: */}
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;