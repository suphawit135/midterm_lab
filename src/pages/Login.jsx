import axios from "axios"
import React from "react"
import useUserStore from "../stores/useStore"
import { useNavigate } from "react-router"
import { loginValidator } from "../validators/login.validators"



function Login(){
    
    const[formLogin,setFormLogin]=React.useState({
        username:"",
        password:""
    })

    const [error,setError] = React.useState({})

    const setToken = useUserStore((state)=>state.setToken)
    const navigate=useNavigate()
    
    
    const hdlSubmit = async (evt)=>{
        evt.preventDefault()
        const result = loginValidator.safeParse(formLogin)
        if(!result.success){
            const {fieldErrors} = result.error.flatten()
            console.log(fieldErrors)
            setError(fieldErrors)
            return
        }



        const res = await axios.post("https://drive-accessible-pictures-send.trycloudflare.com/auth/login",formLogin)
        console.log(res.data.user.token)
        setToken(res.data.user.token)
        navigate("/todo")

    }
    
    const hdlChange = (evt)=>{
        setFormLogin((prv)=>({...prv,[evt.target.name]:evt.target.value}))
    }

    console.log(formLogin)
    
    
    return(
        <div>
            <div className="min-h-screen flex justify-center items-center p-4">
                <form onSubmit={hdlSubmit} 
                className="bg-blue-950 text-white p-6 rounded-md w-120 maw-w-md flex flex-col gap-5">
                <h2 className="text-4xl p-3">Welcome</h2>
                    <label>Username</label>
                        <input
                        type="text" 
                        className="bg-gray-500"
                        name="username"
                        value={formLogin.username}
                        onChange={hdlChange}>
                        </input>
                        {error.username&&<p className="text-red-500">{error.username[0]}</p>}
                    <label>Password</label>
                        <input 
                        type="text"
                        className="bg-gray-500 "
                        name="password"
                        value={formLogin.password}
                        onChange={hdlChange}>
                        </input>
                        {error.password&&<p className="text-red-500">{error.password[0]}</p>}

                    <button className="bg-gray-500 ">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login