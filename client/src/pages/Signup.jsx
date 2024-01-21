import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Signup = () => {
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
                "signup",
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
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div className="signup">
        <div className="form_container">
            <h2 className="title">Signup Account</h2>
            <form className="form" onSubmit={handleSubmit}>
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
                    Alredy have an account?
                    <Link to={"/login"}>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
        </div>
    );
};

export default Signup;
