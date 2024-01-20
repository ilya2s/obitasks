import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Task from "../Task";

const URL = "/api/tasks";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => { 
        const getTasks = async () => {
            const response = await fetch(`${URL}?user=${userId}`, {
                method: "GET" });
            const tasks = await response.json();

            setTasks(tasks);
        };

        getTasks();
    }, [userId]);

    const createNewTask = async (event) => {
        event.preventDefault();

        if (content.length > 3) {   // Only submit if task has more than 3 chars
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,  
                    task: content
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newTask = await response.json();

            setContent("");
            setTasks([...tasks, newTask]);
        }
    };

    useEffect(() => {
        const verifyCookie = async () => {

            if (cookies.token === 'undefined') {
                navigate("/login");
            }

            const { data } = await axios.post(
                "",
                {},
                { withCredentials: true }
            );

            const { status, username, id } = data;

            setUsername(username);
            setUserId(id);
            return status ? toast(`Hello ${username} 👋`, {
                position: "top-right",
            }): (removeCookie("token"), navigate("/login"));
        
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };


    return(
        <main className="container">
            <h4>
                {" "}
                Welcome <span>{username}</span>
            </h4>
            <button onClick={Logout}>LOGOUT</button>
            <h1 className="title">Obitasks</h1>
            <form className="form" onSubmit={createNewTask}>
                <input
                    type="text"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="Enter a new task..."
                    className="form_input"
                    required
                />
                <button type="submit">Create Task</button>
            </form>
            <div className="tasks">
                { (tasks.length > 0) &&
                    tasks.map((task) => (
                       <Task task={task} setTasks={setTasks} key={task._id} url={URL} /> 
                    ))
                }
            </div>
            <ToastContainer />
        </main>
    );
};

export default Home;
