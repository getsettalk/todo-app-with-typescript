import { ReactNode, createContext, useContext, useState } from 'react'



export type TodoProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;

}
export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleDeletebtn: (id: string) => void;
}
const todoContext = createContext<TodosContext | null>(null)



export const useTodos = () => {
    const todosConsumer = useContext(todoContext);
    if (!todosConsumer) {
        throw new Error("useTodos used outside of Provider");
    }
    return todosConsumer;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {

    const [todos, setTodos] = useState<Todo[]>([])
    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            console.log("prevData", prev)
            console.log(newTodos)
            return newTodos;
        })
    }
    // manage toggle
    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed }
                }
                return item;
            })
            return newTodos;
        })
    }
    // delete data
    const handleDeletebtn = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            return newTodos;
        })
    }
    return (
        <todoContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeletebtn }}>
            {children}
        </todoContext.Provider>
    )
}

