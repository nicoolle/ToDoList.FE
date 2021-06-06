import { type } from 'os';
import React, {useState} from 'react'
import internal from 'stream';

export interface TodoItem {
    id: number
    value: string
}

function TodoForm(props: React.ComponentProps<any>) {
    
    const [input, setInput] = useState('');

    const handleChange = (e: React.ChangeEvent<any>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        props.onSubmit({
            id:Math.floor(Math.random() * 10000),
            text: input
        });        

        setInput('')
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <fieldset className="form-input">
                <input 
                    type="text"                    
                    placeholder="Type.."
                    value={input}
                    name='text'
                    className="todo-input" 
                    onChange={handleChange}
                />
                <button className="todo-button">
                    Submit
                </button>
            </fieldset>
        </form>
    )
}

export default TodoForm