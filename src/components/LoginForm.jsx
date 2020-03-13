import React, { useState } from 'react';
import { login } from '../utils/auth'

const initialErrors = {
  email: null,
  password: null
}

function LoginForm() {
    //const [ loading, setLoading ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors ] = useState(initialErrors)

    const validateForm = () => {
        let isValid = true

        setErrors({ ...initialErrors })

        if (email.length <= 1) {
            setErrors({ ...errors, email: 'Email required'})
        }

        if (password.length <= 1) {
            setErrors({ ...errors, password: 'Password required'})
        }

        return isValid
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        const isValid = validateForm()

        if (!isValid) {
            return
        }

        login(email, password)
            .then((data) => {
                console.log('all good, move on to todo screen')
                console.log(data)
            })
            .catch((e) => {
                console.error(e)
            })

        //setLoading(true)
    }

    return (
        <form className="mt-2" onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={event => setEmail(event.target.value)}
                    />
                <div style={{ color: "red" }}>{errors.email}</div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={event => setPassword(event.target.value)}
                    />
                <div style={{ color: "red" }}>{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}

export default LoginForm;
