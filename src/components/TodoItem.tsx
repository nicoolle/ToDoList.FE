import { useState } from "react";
import { ToDoStatus } from "../App";

interface TodoItemProps {
    availableStatuses: ToDoStatus[];
    todoItemStatus: ToDoStatus;
    description: string;
    id: number;
    onDeleteClick(id: number): void;
    onChangeItemStatus(id: number, todoStatus: ToDoStatus): void;
}

interface TodoItemState {
    status: ToDoStatus;
}

export default function TodoItem(todoItemProps: TodoItemProps) {

    function onChangeStatus(event: any) {
        const selectedIndex: number = event.target.options.selectedIndex;
        const selectedStatusIndex: number = +event.target.options[selectedIndex].value;
        const selectedStatus = GetToDoStatus(selectedStatusIndex)
        setStatus({
            status: GetToDoStatus(selectedStatus)
        });
        console.log(status);
    }

    function GetToDoStatus(index: number): ToDoStatus {
        switch (index) {
            case 0:
                return ToDoStatus.ToDo
            case 1:
                return ToDoStatus.InProgress
            case 2:
                return ToDoStatus.Complete
            default:
                return ToDoStatus.ToDo
        }
    }

    function onDeleteClick(event: any) {
        todoItemProps.onDeleteClick(todoItemProps.id);
    }

    function onChangeItemStatus(event: any) {
        console.log(status);
        todoItemProps.onChangeItemStatus(todoItemProps.id, status.status);
    }

    const [status, setStatus] = useState<TodoItemState>({
        status: todoItemProps.availableStatuses[0]
    })

    return (
        <div id="todo-item" className="row">
            <p>{todoItemProps.description}</p>
            <select className="form-select" onChange={onChangeStatus}>
                {
                    todoItemProps.availableStatuses.map(status =>
                        <option value={status}>
                            {ToDoStatus[status]}
                        </option>)
                }
            </select>
            <button onClick={onChangeItemStatus}>Change status</button>
            <button onClick={onDeleteClick}>Delete</button>
        </div>
    )
}