import { forwardRef, useRef } from "react";


const InpuText = forwardRef((props, ref) => {
    return (
        <>
            <input type="text" ref={ref} />
        </>
    )
})

const ExampleRef = () => {
    const inputFocus = useRef(null);

    const handleButtonClick = () => {
        console.log("me diste click");
        /*  const inputFocus = document.getElementById('inputFocus'); */
        inputFocus.current.focus();
    }

    return (
        <>
            {/*  <input type="text" id="inputFocus" /> */}
            <InpuText ref={inputFocus} />
            <button onClick={handleButtonClick}>Click ref</button>
        </>
    )
}
export default ExampleRef;