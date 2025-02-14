import "./DisplayMarks.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const DisplayMarks = () => {
  const location = useLocation();
  const data = location.state;
  const [studentDetails, setStudentDetails] = useState([]);
  const [test, setTest] = useState("");

  useEffect(() => {
    if (test && data?.rollnumber) {
      axios
        .get(`http://localhost:3400/${data.rollnumber}/${test}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setStudentDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching marks data:", error);
          alert("Failed to fetch marks. Please try again.");
        });
    }
  }, [test, data?.rollnumber]);

  const handlePrint = () => {window.print()}

  return (
    <div>
      <div className="component">
        <div className="details">
        <div className="name">
          <p>Student Name:</p>
          <p><b>{data?.name || "N/A"}</b></p>
        </div>
        <div className="name">
          <p>Class:</p>
          <p><b>{data?.standard || "N/A"}</b></p>
        </div>
        <div className="name">
          <p>Roll Number:</p>
          <p><b>{data?.rollnumber || "N/A"}</b></p>
        </div>
        </div>
        <select
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
        {Array.isArray(studentDetails) &&
          studentDetails.map((element, index) => (
            <table cellPadding={5} cellSpacing={5} key={index}>
              <thead>
                <tr>
                  <th>Subjects</th>
                  <th>Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Telugu</td>
                  <td>{element.telugu}</td>
                </tr>
                <tr>
                  <td>Hindi</td>
                  <td>{element.hindi}</td>
                </tr>
                <tr>
                  <td>English</td>
                  <td>{element.english}</td>
                </tr>
                <tr>
                  <td>Maths</td>
                  <td>{element.maths}</td>
                </tr>
                <tr>
                  <td>Science</td>
                  <td>{element.science}</td>
                </tr>
                <tr>
                  <td>Social</td>
                  <td>{element.social}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{element.total}</td>
                </tr>
                <tr>
                  <td>Percentage</td>
                  <td>{element.percentage}%</td>
                </tr>
                <tr>
                  <td>Grade</td>
                  <td>{element.grade}</td>
                </tr>
              </tbody>
            </table>
          ))}
      </div>
      <button onClick={handlePrint}>Print Marks Report</button>
    </div>
  );
};

export default DisplayMarks;
