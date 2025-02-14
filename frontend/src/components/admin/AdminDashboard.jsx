import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"
const AdminDashboard = ()=>{
    const navigate = useNavigate();
    const navMarks = ()=>{
        navigate(`/marksentry`);
    };
    const navTeacher =()=>{navigate(`/addteacher`)};
    const navStudent = ()=>{navigate(`/addstudent`)};
    const studentMarks = ()=>{navigate( `/displaystudentmarks` )}
    const classMarks = ()=>{navigate(`/displayclassmarks`)}
    return (
        <>
            <button onClick={ navMarks }>Upload Marks</button>
            <button onClick={ navStudent }>Add Student</button>
            <button onClick={ navTeacher }> Add Teacher</button>
            <button onClick={ studentMarks }>Display Student Marks</button>
            <button onClick={ classMarks }>Display Class Marks</button>

        </>
    )
};
export default AdminDashboard;