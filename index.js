import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LOGO_URL } from "./mockdata";

const App = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState([]);
    const [completed, setCompleted] = useState([]);

    const addItem = () => {
        if (!inputData) return;
        setItems([...items, inputData]);
        setCompleted([...completed, false]); // Initialize completion status as false
        setInputData("");
    };

    const deleteItem = (id) => {
        const updatedItems = items.filter((elem, index) => index !== id);
        const updatedCompleted = completed.filter((elem, index) => index !== id);
        setItems(updatedItems);
        setCompleted(updatedCompleted);
    };

    const toggleComplete = (id) => {
        const updatedCompleted = completed.map((elem, index) =>
            index === id ? !elem : elem
        );
        setCompleted(updatedCompleted);
    };

    return (
        <div className="container">
            <div className="todo-app">
                <h2>
                    To-Do List <img src={LOGO_URL} alt="logo" />
                </h2>
                <div className="row">
                    <input
                        type="text"
                        id="input-box"
                        placeholder="✍️ Add your text"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />
                    <button className="btn-add" onClick={addItem}>
                        Add
                    </button>
                </div>

                <div className="showItems">
                    {items.map((elem, index) => (
                        <div className="eachItem" key={index}>
                            <h3
                                className="task"
                                style={{
                                    textDecoration: completed[index] ? "line-through" : "none",
                                    color: completed[index] ? "grey" : "orangered",
                                }}
                            >
                                {elem}
                            </h3>
                            <div>
                                <button className="complete" onClick={() => toggleComplete(index)}>
                                    {completed[index] ? "Undo" : "Complete"}
                                </button>
                                <button className="delete" onClick={() => deleteItem(index)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
