import React, {useState} from 'react'

interface HeaderProps{
    title?: string;
}

export interface TodoItem {
    id: number
    value: string
}

/*
export function TodoForm(props: React.ComponentProps<any>) {
    const [input, setInput] = useState('');

    const handleChange = (e: React.ChangeEvent<any>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        props.onSubmit({
           
            text: input
        });        

        setInput('')
    };
}*/

export default function Header({title = ""}: HeaderProps) {  

    return (
        <header>
             <h3>{title} Have some task to do? Add it to list:</h3>
                       
        </header>
    )
}
