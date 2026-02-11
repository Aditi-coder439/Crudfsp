import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 

  // 1. Removed 'age' from initial state
  const [formData, setFormData] = useState({
    name: location.state?.name || "",
    email: location.state?.email || "",
    country: location.state?.country || "",
    gender: location.state?.gender || ""
  });

  useEffect(() => {
    // If data wasn't passed via navigation, fetch it
    if (!location.state) {
        fetchData();
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      // Make sure your Router.js uses "/singleuser/:id"
      const res = await fetch(`http://localhost:5000/api/singleuser/${id}`);
      const data = await res.json();
      
      // 2. Removed 'age' from the update logic
      setFormData({
        name: data.name,
        email: data.email,
        country: data.country,
        gender: data.gender
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => { 
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/updateuser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("User Updated Successfully!");
        navigate("/");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="form-container" style={{ padding: "20px" }}>
      <h2>Edit Student Data</h2>

      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px"
        }}
      >
        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* --- AGE FIELD REMOVED FROM HERE --- */}

        {/* Country */}
        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>
        </div>

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditData;