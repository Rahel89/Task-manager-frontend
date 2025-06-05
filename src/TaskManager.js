import React, { useState } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Learn React', completed: false },
        { id: 2, title: 'Build a To-Do App', completed: false },
        { id: 3, title: 'Finish online course', completed: false },
    ]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

    const addTask = () => {
        if (newTask.trim()) {
            const newTaskObj = {
                id: tasks.length + 1,
                title: newTask,
                completed: false,
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask('');
        } else {
            alert("Task title cannot be empty.");
        }
    };

    const toggleCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; 
    });

    return (
        <div className="container mt-5">
            <h2>Task Manager</h2>
            <div className="mb-3">
                <input 
                    type="text" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                    className="form-control" 
                    placeholder="Add a new task" 
                />
                <button className="btn btn-primary mt-2" onClick={addTask}>Add Task</button>
            </div>
            <div className="mb-3">
                <label className="me-2">Filter:</label>
                <select onChange={(e) => setFilter(e.target.value)} className="form-select">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <ul className="list-group">
                {filteredTasks.map(task => (
                    <li key={task.id} className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}>
                        <span style={{ cursor: 'pointer', textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button 
                            className="btn btn-success btn-sm float-end ms-2" 
                            onClick={() => toggleCompletion(task.id)}
                            disabled={task.completed} 
                        >
                            Complete
                        </button>
                        <button 
                            className="btn btn-danger btn-sm float-end" 
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;