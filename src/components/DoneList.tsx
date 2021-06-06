import {ITodo} from '../App'

interface DoneListProps{
    todos: ITodo[]
}

export default function DoneList({todos}: DoneListProps) {

    return (
        <div id="done-list">
            <h2>Done</h2>
            <ul>
                {todos.map((todo) => {
                    return(
                        <li key={todo.id}>
                            <input type="checkbox" defaultChecked={true}/>
                            <label>{todo.description}</label>
                        </li>
                    )
                })}               
            </ul>
        </div>
    )
}
