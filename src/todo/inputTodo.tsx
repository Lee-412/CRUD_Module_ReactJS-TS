
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
    console.log("check Props: ", props)
    return (
        <>
            <div>name: = {JSON.stringify(props.name)}</div>
            <div>age: = {JSON.stringify(props.age)}</div>
            <div>Info: = {JSON.stringify(props.info)}</div>

            <p>Add input todo</p>
            <input type="text" name="" id="" />
            &nbsp; &nbsp;
            <button>save</button>

        </>
    )
}
export default InputTodoComponent;