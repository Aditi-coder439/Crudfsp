import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Add() { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    gender: "",
    price: "",
    image:"",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("country", formData.country);
    data.append("gender", formData.gender);
    data.append("price", formData.price);
    data.append("image", formData.image); 

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: data 
      });

      const result = await response.json();

      if (response.ok) {
        alert("User Registered Successfully!");
        setFormData({ name: "", email: "", password: "", country: "", gender: "",price:" " ,image: "" });
        navigate("/"); 
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label><input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} required /> Male</label>
              <label><input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange} /> Other</label>
            </div>
          </div>

             <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
             
              value={formData.price}
              onChange={handleChange}
              id="price"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Image</label>
            <input type='file' name='image' onChange={handleChange} required/> 
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Add;