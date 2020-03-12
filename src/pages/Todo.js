import React, {useState, useEffect}  from 'react';
import {getAllTodos, createTodo, toggleIsDone, deleteTodo}  from '../utils/todos';

function TodoAddForm(props) {
    const {onNewInput} = props

    const [input, setInput] = useState('')

    const inputChangeHandler = event => {
        setInput(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault()
        if (input.length === 0) {
            return;
        }
        onNewInput(input)
        setInput('')
    }

    return (
        <form onSubmit={submitHandler} className="mb-2">
            <div className="form-row">
                <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add Todo"
                        value={input}
                        onChange={inputChangeHandler} />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    );
}

function TodoList(props) {
    const {todos, onDeleteItem, onToggleDone} = props

    if (todos.length === 0) {
        return <EmptyTodoList />
    }

    return (
        <ul className="list-group">
            { todos.map((item) => <TodoItem key={item.id} todo={item} onDelete={onDeleteItem} onToggleDone={onToggleDone} />)}
        </ul>
    )
}

function EmptyTodoList() {
    return (
        <div className="alert alert-primary">Your todo list is empty, start by adding a todo!</div>
        )
}

function TodoItem(props) {
    const {todo, onDelete, onToggleDone} = props;

    const deleteHandler = () => {
        onDelete(todo.id)
    }

    const onToggleHandler = () => {
        onToggleDone(todo)
    }

    return (
        <li className={todo.isDone ? 'list-group-item list-group-item-secondary' : 'list-group-item'}>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={onToggleHandler} />
                <label className="form-check-label" style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
                    {todo.task}
                </label>
                <div className="float-right">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={deleteHandler}
                        >Delete</button>
                </div>
            </div>
        </li>
    )
}

function TodoPage() {
    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getAllTodos().then(todos => {
            setTodos(todos)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (todos.length > 0) {
            document.title = `Todos (${todos.length})`;
        }
    }, [todos.length]);

    const createTodoItem = (todo) => {
        createTodo({ task: todo }).then(newTodo => {
            setTodos([...todos, newTodo])
        })
    };

    const deleteTodoItem = (id) => {
        deleteTodo(id).then(() => {
            const updatedTodos = todos.filter((todo) => {
                return (todo.id !== id)
            })
            setTodos(updatedTodos)
        })
    }

    const onToggleDoneHandler = todo=> {
        toggleIsDone(todo).then(() => {
            const newTodos = todos.map(item => {
                if (item.id !== todo.id) {
                    return item;
                }
                item.isDone = !item.isDone
                return item
            });

            setTodos(newTodos);
        })
    }

    if (loading) {
        return <div className="container mt-2"><p><i className="fa fa-spin fa-spinner fa-fw"></i>Loading..</p></div>
    }

    return (
        <div className="container mt-2">
            <TodoAddForm
                onNewInput={createTodoItem} />
            <TodoList todos={todos} onDeleteItem={deleteTodoItem} onToggleDone={onToggleDoneHandler} />
            <pre>{JSON.stringify(todos, null, 2)}</pre>
        </div>
    );
}

export default TodoPage;
