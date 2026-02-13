function Todolist(props){
    return(
        <div>
        <div className="flex justify-between">
                <div className="flex gap-3">
                    <input type="checkbox" />
                    <p onClick={props.hdlClick}>{props.list.content}</p>
                </div>
                <div className="flex gap-5">
                    <button className="bg-amber-200 text-black">Edit</button>
                    <p className="text-red-500" >X</p>
                </div>
            
        </div>
        </div>
    )
}

export default Todolist