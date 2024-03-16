import sayHi from "./say";
import { sayBye } from "./say";
const MyFirstComponent = () => {
    return (
        <>
            <div> My Component</div>
            <button onClick={() => { sayHi("oke") }}>ClickSayHi</button>
            <button onClick={() => { sayBye("oke") }}>ClickSayBye</button>
        </>
    )
}
export default MyFirstComponent;