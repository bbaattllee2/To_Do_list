import { useState } from "react"

export default function Task({name, due_date, id, deleteTask}) {
    const [completed, setCompleted] = useState(false)
    return (
        <div>
            <h2>{name}</h2>
            <h4>Due date: {due_date}</h4>
            <label>
                Complete: <input type="checkbox" value={completed} onClick={() => setCompleted(!completed)}/>
            </label>
            <br/>
            <button type="button" onClick={() => deleteTask(id)}>Remove Task</button>
        </div>
    )
}