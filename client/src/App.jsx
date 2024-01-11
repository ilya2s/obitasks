import { useEffect, useState } from "react";
import Task from "./Task";

const URL = "/api/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");

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
}

export default App;
