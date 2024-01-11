function Task(props) {
    const { task, setTasks, url } =  props;

    const updateTask = async (taskId, taskStatus) => {
        const response = await fetch(`${url}/${taskId}`, {
            method: "PUT",
            body: JSON.stringify({ "status": taskStatus }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();

        if (json.acknowledged) {
            setTasks(currentTasks => {
                return currentTasks.map((currentTask) => {
                    if (currentTask._id === taskId) {
                        return { ...currentTask, status: !currentTask.status };
                    }
                    return currentTask;
                });
            });
        }
    };

    const deleteTask = async (taskId) => {
        const response = await fetch(`${url}/${taskId}`, {
            method: "DELETE"
        });
        const json = await response.json();

        if (json.acknowledged) {
            setTasks(currentTask => {
                return currentTask.filter((currentTask) => currentTask._id !== taskId)
            })
        }
    };

    return(
        <div className="task">
            <p>{task.task}</p>
            <div className="mutations">
                <button
                    className="task_status"
                    onClick={() => updateTask(task._id, task.status)}
                >
                    {(task.status) ? "☑️" : "⏹️"}
                </button>
                <button
                    className="task_delete"
                    onClick={() => deleteTask(task._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default Task;