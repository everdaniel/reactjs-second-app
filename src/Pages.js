import React from 'react';
import Tabs from './Tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './App.css';

export default function Page() {
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
  );
}
