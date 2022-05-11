import { Outlet } from "react-router";

const LayoutContainerForm = () => {
    return (
        <div className="w-96 mx-auto mt-10">
            layout
            <Outlet />
        </div>
    )
}

export default LayoutContainerForm;