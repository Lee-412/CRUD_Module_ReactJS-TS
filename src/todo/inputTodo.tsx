import { todo } from "node:test";
import { useState } from "react";


interface IProps {
    name: string,
    age: number,
    info: {
        gender: string,
        address: string
    }
    abc: string
}


const InputTodoComponent = (props: IProps) => {

    const [Todo, setTodo] = useState("");
    const [ListTodo, setListTodo] = useState<string[]>([]);
    const handleClick = () => {
        if (Todo !== "") {
            setListTodo([...ListTodo, Todo])
            setTodo("")
        }
        else {
            alert("Todo is empty");
            return;
        }

    }
    console.log(ListTodo)
    return (
        <div style={{ border: "1px solid red" }}>

            <p>Add input todo</p>
            <input type="text" name="" id="checks"
                value={Todo}
                onChange={(event) => {
                    setTodo(event.target.value)
                }} />
            &nbsp; &nbsp;

            <button onClick={() => {
                handleClick()
            }}>save</button>
            <br />
            <ul>
                {
                    ListTodo.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )

}
export default InputTodoComponent;