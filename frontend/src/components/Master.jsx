import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./Login.jsx";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./User/UserDashboard";
import MarksEntry from "./admin/MarksEntry.jsx";
import DisplayMarks from "./User/DisplayMarks.jsx";
import AddStudent from "./admin/AddStudent.jsx";
import AddTeacher from "./admin/AddTeacher.jsx";
import DisplayStudentMarks from "./admin/DisplayStudentMarks.jsx";
import DisplayClassMarks from "./admin/DisplayClassMarks.jsx";
const Master = ()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login></Login>}></Route>
                    <Route path="/admindashboard" element={<AdminDashboard></AdminDashboard>}></Route>
                    <Route path="/addteacher" element={<AddTeacher></AddTeacher>}></Route>
                    <Route path="/addstudent" element={<AddStudent></AddStudent>}></Route>
                    <Route path="/marksentry" element={<MarksEntry></MarksEntry>}></Route>
                    <Route path="/displaystudentmarks" element={<DisplayStudentMarks></DisplayStudentMarks>}></Route>
                    <Route path="/displayclassmarks" element={<DisplayClassMarks></DisplayClassMarks>}></Route>
                    <Route path="/userdashboard" element={<UserDashboard></UserDashboard>}></Route>
                    <Route path="/displaymarks" element={<DisplayMarks></DisplayMarks>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Master;