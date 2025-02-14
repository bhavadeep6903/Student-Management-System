import { useEffect, useState } from "react";
import "./UserDashboard.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const rollnumber = localStorage.getItem("rollnumber") // Example roll number

  useEffect(() => {
    axios
      .get(`http://localhost:3400/details/${rollnumber}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [rollnumber]);

  const click = (element) => {
    navigate(`/displaymarks`, { state: element });
  };

  return (
    <>
      {Array.isArray(user) &&
        user.map((element, index) => (
          <div key={index}>
            <div className="details">
                <div className="name">
                <p>Student Name:</p>
                <p><b>{element.name || "N/A"}</b></p>
                </div>
                <div className="name">
                <p>Class:</p>
                <p><b>{element.standard || "N/A"}</b></p>
                </div>
                <div className="name">
                <p>Roll Number:</p>
                <p><b>{element.rollnumber || "N/A"}</b></p>
                </div>
            </div>
            <button onClick={() => click(element)}>Display Marks</button>
          </div>
        ))}
    </>
  );
};

export default UserDashboard;
