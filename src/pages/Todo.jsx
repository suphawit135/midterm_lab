import axios from "axios"
import useUserStore from "../stores/useStore"
import React, { useEffect } from "react"
import Todolist from "../components/Todolist"




function Todo() {

    const [user, setUser] = React.useState([])
    const [listcontent, setListContent] = React.useState({
        content: ""
    })
    const token = useUserStore((state) => state.token)

    const hdlSubmit = async (evt) => {
        evt.preventDefault()
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

    // const hdlDeleteClick = (id) => {
    //     console.log(id.target.id)
    // }

    const hdlChange = (evt) => {
        setListContent({ content: evt.target.value })
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
                        <button>Add</button>
                    </form>
                    <div>
                        {user.map((item) => (<div>
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <input type="checkbox" />
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