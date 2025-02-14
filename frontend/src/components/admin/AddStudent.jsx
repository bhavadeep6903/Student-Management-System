import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const AddStudent = () => {
  const name = useRef();
  const rollnumber = useRef();
  const password = useRef();
  const standard = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  const back = () => {
    navigate(`/admindashboard`);
  };

  const uploadDetails = () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (!token) {
      console.error("No token found. Please log in.");
      alert("Authentication error. Please log in.");
      return;
    }

    const payload = {
        rollnumber: rollnumber.current.value,
        name: name.current.value,
        password: password.current.value,
        role: "ROLE_USER",
        standard: standard.current.value,
      };
      

    console.log("Payload:", payload); // Log the payload
    console.log("Headers:", {
      Authorization: `Bearer ${token}`,
    }); // Log headers

    setLoading(true); // Start loading

    axios
      .post("http://localhost:3400/addaccount", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        alert("Details uploaded successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error:", err.response || err.message || err); // Improved error logging
        setError("Error uploading details.");
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <>
      <input ref={rollnumber} type="text" placeholder="Enter Roll Number" />
      <input ref={name} type="text" placeholder="Enter Name" />
      <input ref={password} type="password" placeholder="Enter Password" />
      <select
            name="standard"
            id="standard"
            ref={standard}
          >
            <option value="">Select Standard</option>
            <option value="6">Class-6</option>
            <option value="7">Class-7</option>
            <option value="8">Class-8</option>
            <option value="9">Class-9</option>
            <option value="10">Class-10</option>
          </select>
      <button onClick={uploadDetails} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      <button onClick={back}>Back</button>
      {error && <p>{error}</p>} {/* Display error message */}
    </>
  );
};

export default AddStudent;
