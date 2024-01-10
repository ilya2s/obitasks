import { useEffect, useState } from "react";

const URL = "/api/tasks";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => { 
        const getTasks = async () => {
            const response = await fetch(URL);
            const tasks = await response.json();

            setMessage(tasks.message);
        };

        getTasks();
    }, []);

    return(
        <main className="container">
            <h1>Obitasks</h1>
            {message && <p>{message}</p>}
        </main>
    );
}

export default App;
