import { NavLink } from "react-router";

function NavBar(){
    return(
        <div className="bg-cyan-200 h-12 px-8 flex justify-center items-center show-md">
            <div className="flex gap-6 font-semibold">
                <NavLink to="/">Login</NavLink>
                <NavLink to="register">Register</NavLink>
                <NavLink to="todo">Todo</NavLink>

            </div>

        </div>
    )
}

export default NavBar