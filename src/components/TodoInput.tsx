import { useState } from "react";
import { convertCompilerOptionsFromJson } from "typescript";
import { ToDoStatus } from "../App";

interface TodoInputProps {
    onAddClick(title: string, description: string): void;
}

interface TodoInputState {
    title: string;
    description: string;
}

export default function TodoInput(todoInputProps: TodoInputProps) {

    function onAddClick(event: any): void {
        todoInputProps.onAddClick(todosInput.title, todosInput.description);
    }

    const [todosInput, setInputState] = useState<TodoInputState>({ title: '', description: '' });

    function onTitleChange(event: any): void {
        setInputState({
            title: event.target.value,
            description: todosInput.description
        })
    };

    function onDescriptionChange(event: any): void {
        setInputState({
            title: todosInput.title,
            description: event.target.value,
        })
    };


    return (
        <div id="todo-input" className="row">
            <p>Enter title</p>
            <input type="text"
                value={todosInput.title}
                onChange={onTitleChange}
            ></input>
            <p>Enter description</p>
            <input type="text"
                value={todosInput.description}
                onChange={onDescriptionChange}
            ></input>
            <button onClick={onAddClick}>Add task</button>
        </div>
    )
}