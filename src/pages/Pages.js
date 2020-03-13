import React, { useState, useEffect } from 'react';
import TodoPage from './Todo';
import Tabs from '../Tabs';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../App.css';

import { onAuthStateChanged } from '../utils/auth'

function useAuth() {
    return { auth: 'user', authAttempted: false }
}

function LoggedIn() {
    return <TodoPage />
}

function LoggedOut() {
    const tabData = [
        {
            label: "Login",
            content: <LoginForm />
        },
        {
            label: "Signup",
            content: <SignupForm />
        }
    ];
    return (
        <div className="container">
            <Tabs data={tabData} />
        </div>
        )
}

export default function Page() {
    const [ authAttempted, setAuthAttempted ] = useState(false)
    const [ auth, setAuth ] = useState(null)

    useEffect(() => {
        onAuthStateChanged((auth) => {
            setAuth(auth)
            setAuthAttempted(true)
        })
    }, [])

    const customHookData = useAuth()
    console.log(customHookData)

    if (!authAttempted) {
        return <div className="container mt-2"><p><i className="fa fa-spin fa-spinner fa-fw"></i>Loading..</p></div>
    }

    return (auth) ? <LoggedIn /> : <LoggedOut />
}
