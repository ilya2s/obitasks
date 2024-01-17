import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
    });

    const { username, password } = inputValue;


    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };


    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-right",
        });
    };


    const handleError = (err) => {
        toast.error(err, {
            position: "bottom-left",
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post(
                "login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );

            const { success, message } = data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                console.log(data);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div className="form_container">
            <h2>Login Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                  />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Don't have an account? 
                    <Link to={"/signup"}>Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    ); 
};

export default Login;
