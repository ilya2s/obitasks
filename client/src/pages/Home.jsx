import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Task from "../Task";

const URL = "/api/tasks";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");
    
    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }

            const { data } = await axios.post(
                "http://localhost:5000",
                {},
                { withCredentials: true }
            );

            console.log(`DATA IS HERE ====> ${data}`);

            const { status, user } = data;
            
            setUsername(user);

            return status ?
                toast(`Hello ${user}`, {
                    position: "top-right",
                }) : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    useEffect(() => { 
        const getTasks = async () => {
            const response = await fetch(URL);
            const tasks = await response.json();

            setTasks(tasks);
        };

        getTasks();
    }, []);

    const createNewTask = async (event) => {
        event.preventDefault();

        if (content.length > 3) {   // Only submit if task has more than 3 chars
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({ task: content }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newTask = await response.json();

            setContent("");
            setTasks([...tasks, newTask]);
        }
    };

    return(
        <main className="container">
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
        </main>
    );
};

export default Home;
