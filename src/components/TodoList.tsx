import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ITodo, ToDoStatus } from '../App'
import '../App.css'
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: ITodo[],
    setTodo: any,
    status: ToDoStatus,
    onDeleteClick(id: number): void;
    onChangeItemStatus(todoItem: ITodo): void;
}

export default function TodoList(todoListProps: TodoListProps) {

    function getAvailableStatuses(): ToDoStatus[] {
        switch (todoListProps.status) {
            case ToDoStatus.ToDo:
                return [
                    ToDoStatus.Complete,
                    ToDoStatus.InProgress
                ]
            case ToDoStatus.InProgress:
                return [
                    ToDoStatus.Complete,
                    ToDoStatus.ToDo
                ]
            case ToDoStatus.Complete:
                return [
                    ToDoStatus.ToDo,
                    ToDoStatus.InProgress
                ]
        }
    }

    function onDeleteClick(id: number): void {
        todoListProps.onDeleteClick(id);
    }

    function onChangeItemStatus(id: number, todoStatus: ToDoStatus): void {
        const todoItem = todoListProps.todos.find(todo => todo.id === id);
        if (todoItem) {
            todoItem.status = todoStatus;
            console.log(todoItem);
            todoListProps.onChangeItemStatus(todoItem);
        }
    }

    return (
        <div id="todo-list">
            <h2>{ToDoStatus[todoListProps.status]}</h2>
            <ul>
                {todoListProps.todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <TodoItem
                                availableStatuses={getAvailableStatuses()}
                                description={todo.description}
                                id={todo.id}
                                todoItemStatus={todoListProps.status}
                                onDeleteClick={onDeleteClick}
                                onChangeItemStatus={onChangeItemStatus}
                            ></TodoItem>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}