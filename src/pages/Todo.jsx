import axios from "axios"
import useUserStore from "../stores/useStore"
import React, { useEffect } from "react"
import Todolist from "../components/Todolist"
import { todoValidator } from "../validators/todo.validators"




function Todo() {

    const [user, setUser] = React.useState([])
    const [listcontent, setListContent] = React.useState({
        content: ""
    })
    const [checklist, setChecklist] = React.useState({
        isdone: ""
    })

    const [error,setError] = React.useState({})

    const token = useUserStore((state) => state.token)

    const hdlSubmit = async (evt) => {
        evt.preventDefault()

         const result = todoValidator.safeParse(listcontent)
                if(!result.success){
                    const {fieldErrors} = result.error.flatten()
                    console.log(fieldErrors)
                    setError(fieldErrors)
                    return
                }


        await axios.post("https://drive-accessible-pictures-send.trycloudflare.com/todosv2", listcontent, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        fetchUser()
    }

    const hdlDeleteClick = async (evt) => {

        await axios.delete(`https://drive-accessible-pictures-send.trycloudflare.com/todosv2/delete/${evt.target.id}`
            , {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        fetchUser()
    }


    const hdlChange = (evt) => {
        setListContent({ content: evt.target.value })
    }

    const hdlCheckChange = async (evt) =>{
        setChecklist({isdone: evt.target.checked})
        console.log(checklist)
        await axios.patch(`https://drive-accessible-pictures-send.trycloudflare.com/todosv2/update/${evt.target.id}`,checklist
            , {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        fetchUser()
    }


    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        try {
            const res = await axios.get("https://drive-accessible-pictures-send.trycloudflare.com/todosv2"
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
            console.log(res.data)
            setUser(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(listcontent)

    // const add

    return (
        <div>
            <div className="min-h-screen flex justify-center items-center p-4">
                <div className="bg-blue-950 text-white p-6 rounded-md w-120 maw-w-md flex flex-col gap-5">
                    <div className="text-4xl">My Todo</div>

                    <form className="flex justify-between" onSubmit={hdlSubmit}>
                        <input type="text" placeholder="new task" name="content" value={listcontent.content} onChange={hdlChange} />
                        {error.content&&<p className="text-red-500">{error.content[0]}</p>}
                        <button>Add</button>
                    </form>
                    <div>
                        {user.map((item) => (<div>
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <input type="checkbox" onChange={hdlCheckChange} id={item.id} />
                                    <p>{item.content}</p>
                                </div>
                                <div className="flex gap-5">
                                    <button className="bg-amber-200 text-black">Edit</button>
                                    <p className="text-red-500" id={item.id} onClick={hdlDeleteClick} >X</p>
                                </div>

                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo