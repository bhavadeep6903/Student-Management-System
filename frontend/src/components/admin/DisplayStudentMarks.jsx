import "./DisplayStudentMarks.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const DisplayStudentMarks = () => {
  const [details, setDetails] = useState([]);
  const [studentDetails,setStudentDetails] = useState([]);
  const [test, setTest] = useState("");
  const rollnumber = useRef();
  const [standard, setStandard] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    if (standard) {
      axios
        .get(`http://localhost:3400/admin/getdetails/${standard}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
          alert("Failed to fetch Details. Please try again.");
        });
    }
  }, [standard]);

  const handleFetchMarks = () => {
    if (test && rollnumber.current.value) {
      const selectedRollnumber = rollnumber.current.value;
      const student = details.find(
        (detail) => detail.rollnumber === selectedRollnumber
      );
      if (student) setStudentName(student.name);

      axios
        .get(`http://localhost:3400/${selectedRollnumber}/${test}`, {
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
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="component">
        <div>
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
        </div>

        {details.length > 0 && (
          <div>
            <select ref={rollnumber} className="name">
              <option value="">Select Roll Number</option>
              {details.map((element, index) => (
                <option key={index} value={element.rollnumber}>
                  {element.rollnumber}
                </option>
              ))}
            </select>

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
            <button className="name" onClick={handleFetchMarks}>Fetch Marks</button>
          </div>
        )}

        {studentName && (
          <h2>
            Marks for Student: <b>{studentName}</b>
          </h2>
        )}

        {Array.isArray(studentDetails) &&
          studentDetails.length > 0 &&
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
    </>
  );
};

export default DisplayStudentMarks;
