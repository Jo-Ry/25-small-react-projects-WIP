import ComponentWrapper from "../components/ComponentWrapper"
import useWindowResize from "./useWindowResize"

const WindowResize = () => {
    const { width, height } = useWindowResize();

    return (
        <ComponentWrapper view="" title="Use window resize hook" className="resize">
            <p>width is: <span>{width}</span></p>
            <p>height is: <span>{height}</span></p>
        </ComponentWrapper>
    )
}

export default WindowResize