import React, { useState } from 'react';
import { signup } from '../utils/auth'

function SignupForm() {
    //const [ loading, setLoading ] = useState(false)
    const [ nickname, setNickname ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        //setLoading(true)
        signup({email, password, displayName: nickname})
            .then(() => {
                console.log('all good, move on to todo screen')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    return (
        <form className="mt-2" onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="nickname">Nickname</label>
                <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    value={nickname}
                    placeholder="Enter your nickname"
                    onChange={event => setNickname(event.target.value)}
                    />
            </div>
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
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    );
}

export default SignupForm;
