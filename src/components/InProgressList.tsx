import React from 'react'
import {v4 as uuid} from 'uuid'
import {ITodo} from '../App'
import '../App.css'

interface InProgressListProps{
    todos: ITodo[],
    setTodos: any
}


export default function InProgressList({todos, setTodos}: InProgressListProps) {

    const updateCheckedItem = (todo: ITodo) => {
        todos[todo.id] = todo;

        setTodos([...todos])
    }

    return (
        <div id="inprogress-list">
            <h2>In progress</h2>
            <ul>
                {todos.map((todo) => {
                    return(
                        <li key={todo.id}>
                            
                            <input type="checkbox" defaultChecked={false}
                            onChange={(e) => {
                                updateCheckedItem(todo);}                                
                            }/>

                            <label>{todo.description}</label>
                            
                        </li>
                    )
                })}               
            </ul>
        </div>
    )
}