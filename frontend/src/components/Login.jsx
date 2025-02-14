import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import axios from "axios";
import "./Login.css";


const Login = () => {
    const navigate = useNavigate();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [error, setError] = useState(null);

    const validateForm = () => {
        const rollnumber = ref1.current.value;
        const password = ref2.current.value;
        if (!rollnumber || !password) {
            setError("rollnumber and password are required");
            return false;
        }
        setError(null);
        return true;
    };

    const login = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const res = await axios.post("http://localhost:3400/login", {"rollnumber": ref1.current.value, "password": ref2.current.value});
            const { data } = res;
            const { login } = data;

            console.log("Response data:", data);

            if (login === "success") {
                const { role, token, rollnumber } = data;
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("rollnumber", rollnumber);

                if (rollnumber) {
                    role === "ROLE_USER" ? navigate(`/userdashboard`) : navigate("/admindashboard");
                } else {
                    throw new Error("Username is not defined in the response data");
                }
            } else {
                navigate("/error");
            }
        } catch (error) {
            console.error("Error during login:", error);
            navigate("/error");
        }
    };

    return (
        <>
        <div className="body">
            <h4>Sign in</h4>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="input-type">
                <i className="fa fa-user"></i>
                <input type="text" ref={ref1} placeholder="Enter RollNumber" className="input" />
            </div>
            <br />
            <div className="input-type">
                <i className="fa fa-key"></i>
                <input type="password" ref={ref2} placeholder="Enter User password" className="input" />
            </div>
            <br />
            <button onClick={login} className="button">LOGIN</button>
            <br />
        </div>
        </>
    );
};

export default Login;
