import "./MarksEntry.css";
import axios from "axios";
import { useState, useEffect } from "react";

const MarksEntry = () => {
  const [standard, setStandard] = useState();
  const [rollNumbers, setRollNumbers] = useState([]);
  const [selectedRollNumber, setSelectedRollNumber] = useState("");
  const [test, setTest] = useState("");
  const [marks, setMarks] = useState({
    telugu: "",
    hindi: "",
    english: "",
    maths: "",
    science: "",
    social: ""
  });

  // Fetch roll numbers based on the selected standard
  useEffect(() => {
    if (standard) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      axios
        .get(`http://localhost:3400/admin/login/${standard}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
        })
        .then((response) => {
          console.log("Roll Numbers Response:", response.data);
          setRollNumbers(response.data || []);
          setSelectedRollNumber(response.data[0] || ""); // Default roll number if available
        })
        .catch((error) => {
          console.error("Error fetching roll numbers:", error);
          setRollNumbers([]); // Reset roll numbers on error
        });
    }
  }, [standard]);

  // Handle marks entry change
  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload marks
  const uploadMarks = () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
  
    if (!token) {
      console.error("No token found. Please log in.");
      alert("Authentication error. Please log in.");
      return;
    }
  
    const total =
      Number(marks.telugu) +
      Number(marks.hindi) +
      Number(marks.english) +
      Number(marks.maths) +
      Number(marks.science) +
      Number(marks.social);
    const percentage = Math.round(total / 6);
    const grade = percentage >= 90 ? "A" : percentage >= 75 ? "B" : "C";
  
    const payload = {
      rollnumber: selectedRollNumber,
      standard: standard,
      test,
      grade,
      telugu: Number(marks.telugu),
      hindi: Number(marks.hindi),
      english: Number(marks.english),
      maths: Number(marks.maths),
      science: Number(marks.science),
      social: Number(marks.social),
      total,
      percentage,
    };
  
    console.log("Payload:", payload); // Log the payload
    console.log("Headers:", {
      Authorization: `Bearer ${token}`,
    }); // Log headers
  
    axios
      .post("http://localhost:3400/upload/marks", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
        },
      })
      .then((response) => {
        console.log("Response:", response.data); // Log response
        alert("Marks uploaded successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading marks:", error.response || error.message); // Log full error
        alert("Failed to upload marks.");
      });
  };
  
  return (
    <>
      <div className="first">
        <h3> Marks Entry </h3>
        <div className="heading">
          <select name="test" id="test" value={test} onChange={(e) => setTest(e.target.value)}>
            <option value="">Select Test</option>
            <option value="FA1">FA1</option>
            <option value="FA2">FA2</option>
            <option value="FA3">FA3</option>
            <option value="FA4">FA4</option>
            <option value="SA1">SA1</option>
            <option value="SA2">SA2</option>
            <option value="SA3">SA3</option>
          </select>

          <select
            name="standard"
            id="standard"
            value={standard}
            onChange={(e) => setStandard(Number(e.target.value))}
          >
            <option value="">Select Standard</option>
            <option value="6">Class-6</option>
            <option value="7">Class-7</option>
            <option value="8">Class-8</option>
            <option value="9">Class-9</option>
            <option value="10">Class-10</option>
          </select>

          <select
            name="rollnumber"
            id="rollnumber"
            value={selectedRollNumber}
            onChange={(e) => setSelectedRollNumber(e.target.value)}
          >
            {rollNumbers.map((roll) => (
              <option key={roll} value={roll}>
                {roll}
              </option>
            ))}
          </select>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Subject</th>
              <th>Enter Marks</th>
            </tr>
            {["Telugu", "Hindi", "English", "Maths", "Science", "Social"].map((subject) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>
                  <input
                    type="number"
                    name={subject.toLowerCase()}
                    value={marks[subject.toLowerCase()]}
                    onChange={handleMarksChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button onClick={uploadMarks}>Upload Marks</button>
        </div>
      </div>
    </>
  );
};

export default MarksEntry;
