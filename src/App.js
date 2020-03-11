import React, {useState}  from 'react';
// import logo from './logo.svg';
import './App.css';

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
      onToggleDone(todo.id)
    }

    return (
        <li className={todo.isDone ? 'list-group-item list-group-item-secondary' : 'list-group-item'}>
            <div className="form-check" style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
                <input className="form-check-input" type="checkbox" onChange={onToggleHandler} />
                <label className="form-check-label">
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

function App() {
    const [todos, setTodos] = useState([])

    const createTodoItem = (todo) => {
        const newTodo = {
            id: Math.random() * 10000,
            task: todo,
            isDone: false
        }
        setTodos([...todos, newTodo])
    };

    const deleteTodoItem = (id) => {
        const updatedTodos = todos.filter((todo) => {
            return (todo.id !== id)
        })
        setTodos(updatedTodos)
    }

    const onToggleDoneHandler = (id) => {
      const newTodos = todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        todo.isDone = !todo.isDone;
        return todo
      });

      setTodos(newTodos);
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

export default App;
