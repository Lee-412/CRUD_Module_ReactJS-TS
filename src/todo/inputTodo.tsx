import { useState } from "react";


interface IProps {
    name: string,
    age: number,
    info: {
        gender: string,
        address: string
    }
    testFunction: (name: string) => void;
    ListTodo: string[];
    setListTodo: (v: string[]) => void;
    Todo: string;
    setTodo: (v: string) => void;
}


const InputTodoComponent = (props: IProps) => {
    const { ListTodo, setListTodo } = props;
    const [Todo, setTodo] = useState("");

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


            <button onClick={() => { props.testFunction(Todo) }}>test</button>
        </div>
    )

}
export default InputTodoComponent;