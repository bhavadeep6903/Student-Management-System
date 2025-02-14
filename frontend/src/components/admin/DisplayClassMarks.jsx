import axios from "axios";
import { useState, useEffect } from "react";

const DisplayClassMarks = () => {
  const [standard, setStandard] = useState("");
  const [test, setTest] = useState("");
  const [studentDetails, setStudentDetails] = useState([]);

  useEffect(() => {
    if (standard && test) {
      axios
        .get(`http://localhost:3400/admin/${standard}/${test}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setStudentDetails(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching marks data:", error);
          alert("Failed to fetch marks. Please try again.");
        });
    }
  }, [standard, test]);

  return (
    <>
      {/* Select Standard */}
      <select
        name="standard"
        className="name"
        id="standard"
        value={standard}
        onChange={(e) => setStandard(e.target.value)}
      >
        <option value="">Select Standard</option>
        <option value="6">Class-6</option>
        <option value="7">Class-7</option>
        <option value="8">Class-8</option>
        <option value="9">Class-9</option>
        <option value="10">Class-10</option>
      </select>

      {/* Select Test */}
      <select
        className="name"
        name="test"
        id="test"
        value={test}
        onChange={(e) => setTest(e.target.value)}
      >
        <option value="">Select Test</option>
        <option value="FA1">FA1</option>
        <option value="FA2">FA2</option>
        <option value="FA3">FA3</option>
        <option value="FA4">FA4</option>
        <option value="SA1">SA1</option>
        <option value="SA2">SA2</option>
        <option value="SA3">SA3</option>
      </select>

      <table border="1">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Telugu</th>
            <th>Hindi</th>
            <th>English</th>
            <th>Maths</th>
            <th>Science</th>
            <th>Social</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(studentDetails) && studentDetails.length > 0 ? (
            studentDetails.map((element, index) => (
              <tr key={index}>
                <td>{element.rollnumber}</td>
                <td>{element.telugu}</td>
                <td>{element.hindi}</td>
                <td>{element.english}</td>
                <td>{element.maths}</td>
                <td>{element.science}</td>
                <td>{element.social}</td>
                <td>{element.total}</td>
                <td>{element.percentage}</td>
                <td>{element.grade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DisplayClassMarks;
