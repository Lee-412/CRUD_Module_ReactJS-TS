
const LeeComponent = () => {

    const name = "Lee Duc";

    const infor = {
        name: "Lee",
        age: 19
    }



    //jsx = html + jsx => 1 block
    return (
        <div>
            <h1 style={
                {
                    color: "blue",
                    borderRadius: "5px",
                    border: "1px solid green"

                }

            }>
                Hello {name}, age = {infor.age}
            </h1>
            {/* <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                className="photo"
            /> */}
            <ul>
                <li>Invent new traffic lights </li>
                <li>Rehearse a movie scene </li>
                <li>Improve the spectrum technology</li>
            </ul>
        </div>
    )

}
export default LeeComponent;