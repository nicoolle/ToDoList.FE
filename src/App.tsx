import React, { FunctionComponent, useEffect, useState } from 'react';
import { Component } from 'react';
import { v4 as uuid } from 'uuid'
import './App.css';
//import TodoForm from './components/TodoForm';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: ToDoStatus;
}

export enum ToDoStatus {
  ToDo,
  InProgress,
  Complete
}

/*export class Todo implements ITodo{
  id: number;
  title: string;
  description: string;
  status: number;

  constructor(description: string, title: string){
    this.id = uuid();
    this.description = description;
    this.isDone = isDone;
  }
}*/


function App() {
  // const [addTask, setTask]= useState()


  const newTodos = [
    //new Todo('Watch movie')   
    /*
    <TodoInput addTodo={addTodo}/>
    <TodoList todos={todos} setTodos={setTodos}/>
      <InProgressList  todos={todos} setTodos={setTodos}/>
      <DoneList todos={todos.filter(todo => todo.status === 2)} />
      */
  ];

  useEffect(() => {
    fetch('https://localhost:44338/todo')
      .then(response => response.json())
      .then(response => setTodos(response))
      .catch(error => console.log(error));
  }, [])

  function onAddClick(title: string, description: string): void {

    const todoToAdd: ITodo = {
      id: 0,
      title: title,
      description: description,
      status: ToDoStatus.ToDo
    }

    const body = JSON.stringify(todoToAdd);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }

    fetch('https://localhost:44338/todo', requestOptions)
      .then(response => response.json())
      .then(todoItem => fetch('https://localhost:44338/todo')
        .then(response => response.json())
        .then(response => setTodos(response))
        .catch(error => console.log(error)))
      .catch(error => console.log(error));
  }

  function onDeleteClick(id: number) {

    const requestOptions: RequestInit = {
      method: 'DELETE',
    }

    fetch('https://localhost:44338/todo/' + id, requestOptions)
      .then(response => fetch('https://localhost:44338/todo')
        .then(response => response.json())
        .then(response => setTodos(response))
        .catch(error => console.log(error)))
      .catch(error => console.log(error));
  }

  function onChangeItemStatus(todoItem: ITodo) {

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoItem)
    }

    fetch('https://localhost:44338/todo/' + todoItem.id, requestOptions)
      .then(response => response.json())
      .then(todoItem => fetch('https://localhost:44338/todo')
        .then(response => response.json())
        .then(response => setTodos(response))
        .catch(error => console.log(error)))
      .catch(error => console.log(error));
  }

  const [todos, setTodos] = useState<ITodo[]>([]);

  /*const addTodo = (todo: ITodo) =>{
    setTodos([todo, ...todos]);
  }*/

  return (
    <div className="todo-app">
      <Header />
      <TodoInput onAddClick={onAddClick} />
      <TodoList
        status={ToDoStatus.ToDo}
        setTodo={setTodos}
        todos={todos.filter(todo => todo.status == ToDoStatus.ToDo)}
        onDeleteClick={onDeleteClick}
        onChangeItemStatus={onChangeItemStatus}></TodoList>
      <TodoList
        status={ToDoStatus.InProgress}
        setTodo={setTodos}
        todos={todos.filter(todo => todo.status == ToDoStatus.InProgress)}
        onDeleteClick={onDeleteClick}
        onChangeItemStatus={onChangeItemStatus}></TodoList>
      <TodoList
        status={ToDoStatus.Complete}
        setTodo={setTodos}
        todos={todos.filter(todo => todo.status == ToDoStatus.Complete)}
        onDeleteClick={onDeleteClick}
        onChangeItemStatus={onChangeItemStatus}></TodoList>

    </div>
  );
}

export default App;
