import { useEffect } from "react";
import { useTodos } from "../store/TodoList"

const TodoData = ({ type }: any) => {


    const { todos, toggleTodoAsCompleted, handleDeletebtn } = useTodos();
    let filterData = todos;
    console.log("todoo", todos)
    useEffect(() => {
        if (type == "active") {
            filterData = filterData.filter((filters) => !filters.completed)
            console.log("Act", filterData)
            alert("Tab Not Supported")

        } else if (type == "done") {
            filterData = filterData.filter((filters) => filters.completed == true)
            alert("Tab Not Supported")
        }

    }, [type])



    return (
        <div className="tabData">
            {filterData.map((item, index) => {
                return (
                    <div className="tabItem" key={index} style={{ background: (item.completed ? "#f50b5558" : "") }}>
                        <input type="checkbox" name="check" id={`check-${item.id}`} checked={item.completed} onChange={() => toggleTodoAsCompleted(item.id)} />
                        <div className="text_data">
                            {item.task}
                        </div>

                        <div className="deleteBtn">
                            <button className='delete' disabled={!item.completed} onClick={() => handleDeletebtn(item.id)}>Delete</button>
                        </div>


                    </div>
                )
            })}

        </div>
    )
}

export default TodoData